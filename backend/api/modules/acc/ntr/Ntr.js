const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
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
    ntr_date:{
        type: Date, required: true
    },
    amount:{
        type:Number,
        required:true,
        default: 0
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

const Model = mongoose.model('Ntr',newSchema)
module.exports = Model;
