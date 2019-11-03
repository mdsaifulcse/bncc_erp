
const User = require('../models/User')
const Role = require('../models/Role')
const Designation = require('../models/Designation')
const Regiment = require('../modules/regiment/Regiment')
const bcrypt = require('bcryptjs');
const fs = require('fs')
const sharp=require('sharp')
const path = require('path')

class UserController{

//View all users
    index(req,res,next){
        User.find()
            .then(allData => {
                res.status(200).json({
                    allData
                })

            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//single user show
    show(req,res,next){
        User.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//register user into DB
    async store (req,res,next){
        try{
            let input=req.body
            if(input.designation_id===''){
                input.designation_id=null
            }
            /*if(input.regiment_id===''){
                input.regiment_id=null
            }*/
            req.checkBody('name', 'Name is required').notEmpty()
            req.checkBody('email', 'Email is required').isEmail()
            req.checkBody('mobile','Mobile number is required').notEmpty().isNumeric().isLength({min:11,max:11})
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }

            let email = await User.find({email:input.email})
            let mobile = await User.find({mobile:input.mobile})
            if(email.length>0){
                errors.push({msg:'Email must be unique',param:'email'})
            }
            if(mobile.length>0){
                errors.push({msg:'Mobile number must be unique',param:'mobile'})
            }

            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }
            input.password = await  bcrypt.hash(req.body.password, 10);
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
            let data = await User.create(input)
            return res.status(201).json(data)

        }catch(e){
            res.status(500).json(e)
        }
    }
    // Update single data
    async update (req,res,next) {
        try{
            let input=req.body
            if(input.designation_id==''){
                input.designation_id=null
            }
            /*if(input.regiment_id==''){
                input.regiment_id=null
            }*/
            req.checkBody('name', 'Name is required').notEmpty()
            req.checkBody('email', 'Email is required').isEmail()
            req.checkBody('mobile','Mobile number is required').notEmpty().isNumeric().isLength({min:11,max:11})
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let email = await User.find({$and:[{email:req.body.email},{_id:{$ne:req.params.id}}]})
            let mobile = await User.find({$and:[{mobile:req.body.mobile},{_id:{$ne:req.params.id}}]})
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
            let oldData = await User.findById(req.params.id)
            let user = await User.findByIdAndUpdate(req.params.id,{$set:input})
            if (req.files!==null){
                if (fs.existsSync('upload/'+oldData.photo)) {
                    fs.unlink('upload/'+oldData.photo,function (errs) {
                        if (errs) {console.log(errs)}
                    })
                }
            }
            return res.json(user)

        }catch(e){
            res.status(500).json(e)
        }
    }
    //Delete data
    delete(req, res,next) {
        User.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    /* All Active Role */
    roles(req,res,next){
        Role.find({status:1})
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
    /* All Active Regiment */
    regiments(req,res,next){
        Regiment.aggregate([
            {$sort: {serial_num: 1}},
            {$match: {status: 1}},
        ])
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
    async designations(req,res,next){
       let designation =  await Designation.find({status:1})
        return res.json(designation)
    }
}
module.exports = new UserController;