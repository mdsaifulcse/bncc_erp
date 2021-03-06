const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid = require('validator')

const userSchema = new Schema({
    photo:{
      type:String,
    },
    name:{
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      trim: true,
      minLength:5,
      unique:true,
      index:true,
      validate:{
        validator: (v)=>{
          return valid.isEmail(v)
        },
        message:`{VALUE} is not valid`
      }
    },
    password:{
      type:String,
      required:true,
    },
    mobile:{
      type:String,
      required:true,
      trim: true,
      minLength:5,
      unique:true,
      index:true,
    },
    _token:{
      type:String,
      required:false,
      minLength:5,
      unique:true,
    },
    address:String,
    hr_category:String,
    status:{
        type:Number,
        required:true,
        default: 1
    },
    role:{
        type:String,
        required:true
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Regiment'
    },
    designation_id:{
        type:Schema.Types.ObjectId,
        required:false,
        ref: 'Designation'
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;
