const User = require('../../models/User')
const fs = require('fs')
const sharp=require('sharp')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Designation = require('../../models/Designation')
const Session = require('../acc/budget/session/Session')

class ProfileController{

//View all Data
    async profile(req,res,next){
        try{
            let id = req.decoded._id
            let data = await User.aggregate([
                {
                    $lookup:{
                        from:'designations',
                        localField:'designation_id',
                        foreignField:'_id',
                        as:'designation'
                    }
                },
                {$unwind:'$designation'},
                {
                    $lookup:{
                        from:'regiments',
                        localField:'regiment_id',
                        foreignField:'_id',
                        as:'division'
                    }
                },
                {$unwind:'$division'},
                {$match:{_id:mongoose.Types.ObjectId(req.decoded._id)}}
            ])
            let  user = data[0]

            return res.json(user)
        }catch(e){
            res.json(e)
        }

    }

    async update(req,res,next){

        try{
            let id = req.decoded._id
            let input=req.body
            req.checkBody('name', 'Name is required').notEmpty()
            req.checkBody('email', 'Email is required').isEmail()
            req.checkBody('mobile','Mobile number is required').notEmpty().isNumeric().isLength({min:11,max:11})
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let email = await User.find({$and:[{email:req.body.email},{_id:{$ne:id}}]})
            let mobile = await User.find({$and:[{mobile:req.body.mobile},{_id:{$ne:id}}]})
            if(email.length>0){
                errors.push({msg:'Email is unique',param:'email'})
            }
            if(mobile.length>0){
                errors.push({msg:'Mobile number is unique',param:'mobile'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }
            if (req.files!==null){
                let file=req.files.photo
                let dirName='upload/images/users/'
                if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
                }
                let randName=Math.random().toString(36).substring(2, 15)
                let ext = path.extname(file.name)
                sharp(req.files.photo.data).resize(
                    {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
                ).toFile(dirName+randName+ext)
                input.photo='images/users/'+randName+ext
            }
            let oldData = await User.findById(id)
            let user = await User.findByIdAndUpdate(id,{$set:input})
            if (req.files!==null){
                if (fs.existsSync('upload/'+oldData.photo)) {
                    fs.unlink('upload/'+oldData.photo,function (errs) {
                        if (errs) {console.log(errs)}
                    })
                }
            }
            let session = await Session.findOne({active:1})
            let designation = await Designation.findById(user.designation_id)

            let designationName = ''
            if(designation!==''){
                designationName =  designation.designation
            }
            let token = jwt.sign({name: user.name, email: user.email,mobile: user.mobile, _id: user._id,role:user.role,regiment_id:user.regiment_id,session:session._id,designation:designationName,photo:user.photo}, '1971@BNCCERPLEAMERP@1971', {expiresIn: "24h"})
            let us = await User.findByIdAndUpdate(user._id,{$set:{_token:token}})
            return res.json({token})

        }catch(e){
            res.status(500).json(e)
        }

    }
    async password(req,res,next){
        let id = req.decoded._id
        req.checkBody('oldpassword','Old Password is required').notEmpty().isLength({min:6})
        req.checkBody('password','Password is required').notEmpty().isLength({min:6})
        let errors = []
        if(req.validationErrors()){
            errors=req.validationErrors()
        }
        let oldpassword = req.body.oldpassword
        let password = req.body.password
        let cpass = req.body.password_confirmation
        let user = await User.findById(id);
        let pass = await bcrypt.compare(oldpassword, user.password);
        if(!pass){
            errors.push({msg:'Old Password is not matched',param:'oldpassword'})
        }
        if(password!==cpass){
            errors.push({msg:'Confirm Password is not matched',param:'password'})
        }
        if (errors.length>0) {
            let newOne = {}
            errors.forEach(nerr=>{
                newOne[nerr.param] = nerr.msg
            })
            return res.status(422).json(newOne);
        }
        if(user!==null) {
            let newpassword = await  bcrypt.hash(req.body.password, 10);
            let newUser = await User.findByIdAndUpdate(id,{$set:{password:newpassword}})
        }
        return res.status(200).json('Done')

    }
}
module.exports = new ProfileController;