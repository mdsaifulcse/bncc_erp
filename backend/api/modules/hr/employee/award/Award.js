const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    photo:{type:String},
    details:{
        type:String,
        trim: true
    },
    title:{
        type:String,
        required:true,
        trim: true
    },
    session_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetSession'
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Regiment'
    },
    employee_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Employee'
    },
    submit_date:{
        type: Date, required: true
    },

    month:{
        type:Number,
        required:true
    },

    status:{
        type:Number,
        required:true,
        default: 1
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('Award',newSchema)
module.exports = Model;
