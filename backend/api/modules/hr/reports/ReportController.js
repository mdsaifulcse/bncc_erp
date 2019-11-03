
const Regiment = require('../../regiment/Regiment')
const Session = require('../../acc/budget/session/Session')
const Employee = require('../employee/Employee')
const Performance = require('../employee/performance/Performance')
const Punishment = require('../employee/punishment/Punishment')
const Transfer = require('../employee/transfer/Transfer')
const Termination = require('../employee/termination/Termination')
const Attendance = require('../attendance/Attendance')
const Award = require('../employee/award/Award')
const mongoose = require('mongoose')
class ReportController {
    performance(req,res,next){
        let regiment_id = req.body.regiment_id
        let session_id = req.body.session_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"session_id" : mongoose.Types.ObjectId(session_id)}

        Performance.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match  }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }

    employee(req,res,next){
        let regiment_id = req.params.id
        let match = {regiment_id:regiment_id}

        Employee.find(match)
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
    award(req,res,next){
        let regiment_id = req.body.regiment_id
        let session_id = req.body.session_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"session_id" : mongoose.Types.ObjectId(session_id)}
        Award.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match}
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
    punishment(req,res,next){
        let regiment_id = req.body.regiment_id
        let session_id = req.body.session_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"session_id" : mongoose.Types.ObjectId(session_id)}
        Punishment.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
    transfer(req,res,next){
        let regiment_id = req.body.regiment_id
        let session_id = req.body.session_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"session_id" : mongoose.Types.ObjectId(session_id)}
        Transfer.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "regiment_id",
                    foreignField: "_id",
                    as: "regiment"
                }
            },
            { "$unwind": "$regiment" },
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "transferred_regiment_id",
                    foreignField: "_id",
                    as: "transferred"
                }
            },
            { "$unwind": "$transferred" },
            { $sort : { _id : -1 } },
            { "$match" : match },
            {
                "$project": {
                    "_id": 1,
                    "transferred_regiment_id": 1,
                    "employee_id": 1,
                    "submit_date": 1,
                    "month": 1,
                    "status": 1,
                    "session_id": 1,
                    "session._id": 1,
                    "session.name": 1,
                    "employee.name_english": 1,
                    "employee._id": 1,
                    "regiment.name": 1,
                    "transferred.name": 1
                }
            }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
    termination(req,res,next){
        let regiment_id = req.body.regiment_id
        let session_id = req.body.session_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"session_id" : mongoose.Types.ObjectId(session_id)}
        Termination.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
    async attendance(req,res,next){
        let regiment_id = req.body.regiment_id
        let month = parseInt(req.body.month)
        let year = parseInt(req.body.year)
        let attendance = await Attendance.aggregate([
            {
                $group: {
                    _id: {attendance_date: "$attendance_date", regiment_id: "$regiment_id"},
                    attendance_date:{$first: '$attendance_date'},
                    regiment_id:{$first: '$regiment_id'},
                    count: { $sum: 1 }
                }
            },
            {
                $lookup:{
                    from:'regiments',
                    localField:'regiment_id',
                    foreignField:  '_id',
                    as:'regiment'
                }
            },
            {$unwind:'$regiment'},
            {$sort:{_id: -1}},
            {"$project":{
                "regiment.name":1,
                "regiment.code":1,
                "attendance_date":1,
                "regiment_id":1,
                month:{$month: '$attendance_date'},
                year:{$year: '$attendance_date'}
            }},
            { "$match" : { "regiment_id" : mongoose.Types.ObjectId(regiment_id),"month":month,"year":year} },
        ])
        console.log(attendance)
        res.json(attendance)
    }
    session(req,res,next){
        Session.find({status:1})
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
    regiment(req,res,next){
        Regiment.aggregate([
            { $sort : { serial_num : 1 } },
            { $match : { status : 1 } },
        ]).exec(function(err, allData) {
            if(err){
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            }else{
                res.status(200).json(allData)
            }
        });
    }
}
module.exports = new ReportController;