const User = require('../models/User')
const Designation = require('../models/Designation')
const Session = require('../modules/acc/budget/session/Session')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        let session = await Session.findOne({active:1})
        let user = await User.findOne({email});
        if(user!==null){
            let pass = await bcrypt.compare(password, user.password);
            if(pass){
                let designation = await Designation.findById(user.designation_id)

                let designationName = ''
                if(designation!==''){
                    designationName =  designation.designation
                }
                let token = jwt.sign({name: user.name, email: user.email,mobile: user.mobile, _id: user._id,role:user.role,regiment_id:user.regiment_id,session:session._id,designation:designationName,photo:user.photo}, '1971@BNCCERPLEAMERP@1971', {expiresIn: "24h"})
                await User.findByIdAndUpdate(user._id,{$set:{_token:token}})
                return res.json({
                    message: 'Login Successfully.',
                    token
                })
            }else{
                return res.status(401).json({
                    message: 'Login Faild. password doesn\'t matched!'
                })
            }
        }else{
            return res.status(400).json({
                message: 'User not found!'
            })
        }
        try{



        }catch(e){
            res.status(500).json(e)
        }
    }

    tokenCheck(req,res,next){
        try {
            var token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return next(new Error('No token Provided'));
            }

            jwt.verify(token, 'SECRET', function (err, decoded) {
                if (err) {
                    return res.status(401).json(err);
                }

                return res.status(200);
            });
        } catch (e) {
            res.status(401).json({
                message: 'Authentication Faild!'
            })
        }

    }
    async permissionCheck(req,res,next){
        let input = req.body
        let user = req.decoded
        let data = await PermissionRole.findOne({group:user.role})

    }
}
module.exports = new AuthController;