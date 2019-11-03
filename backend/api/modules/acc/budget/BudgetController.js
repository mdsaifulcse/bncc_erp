const Budget = require('./Budget')
const HeadWiseBudget = require('./HeadWiseBudget')
const mongoose = require('mongoose')
const Transaction = require('mongoose-transactions')

class BudgetController{

//View all Data
    index(req,res,next){
        Budget.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            { $sort : { _id : -1 } },
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
//single user show
     show(req,res,next){
         Budget.aggregate([
             { "$match" : { "_id" : mongoose.Types.ObjectId(req.params.id) } },
             {
                 $lookup: {
                     from: "budgetsessions", // collection name in db
                     localField: "session_id",
                     foreignField: "_id",
                     as: "session"
                 }
             },
             { "$unwind": "$session" }
         ]).exec(function(err, allData) {
             if(err){
                 res.status(500).json({
                     message:'Some Error found!',
                     error:err
                 })
             }else{
                 if(allData.length>0){
                     res.status(200).json(allData[0])
                 }
             }
         });
    }
    heads(req,res,next){
        HeadWiseBudget.aggregate([
            {
                $lookup: {
                    from: "budgetheads", // collection name in db
                    localField: "head_id",
                    foreignField: "_id",
                    as: "head"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$head", 0 ] }, "$$ROOT" ] } }
            },
            { $project: { head: 0 } },
            { $sort : { head_id : 1 } },
            { "$match" : { "budget_id" : mongoose.Types.ObjectId(req.params.id) } }
        ]).exec(function(err, heads) {
            res.json(heads)
        });
    }
//Store Data into DB
    async store(req,res,next){
        const transaction = new Transaction()

        try{
            let input=req.body
            input.budget_date = new Date(req.body.budget_date);
            req.checkBody('session_id', 'Session is required').notEmpty()
            let errors = []
            if(req.validationErrors()){
                errors=req.validationErrors()
            }
            let session_id = await Budget.find({session_id:input.session_id})
            if(session_id.length>0){
                errors.push({msg:'Session is already used',param:'session_id'})
            }
            if (errors.length>0) {
                let newOne = {}
                errors.forEach(nerr=>{
                    newOne[nerr.param] = nerr.msg
                })
                return res.status(422).json(newOne);
            }

            let budget = transaction.insert('Budget', {session_id: input.session_id,budget_date: input.budget_date, amount: input.amount})
            for(let i=0;i<input.head_value.length;i++){
                transaction.insert('HeadWiseBudget',{
                    budget_id:budget._id,
                    head_id:input.head_value[i].head_id,
                    amount:input.head_value[i].amount
                })
            }
            const final = await transaction.run()

            transaction.clean()
            return res.status(201).json('Successfully Added')
        }catch(e){
            const rollbackObj = await transaction.rollback().catch(err=>{
                console.log('Error Found!')
            })
            res.status(500).json(e)
            transaction.clean()
        }
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let input = req.body;
        if (input.budget_date !== '') {
            input.budget_date = new Date(req.body.budget_date);
        }
        const inputData = {session_id: input.session_id,budget_date: input.budget_date, amount: input.amount}
        Budget.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                HeadWiseBudget.remove({
                    budget_id: req.params.id
                }, function (err, result) {
                    if (err){
                        res.send(err)
                    }else{
                        let i = 0
                        for(i=0;i<input.head_value.length;i++){
                            let headInput = new HeadWiseBudget({
                                budget_id:data._id,
                                head_id:input.head_value[i].head_id,
                                amount:input.head_value[i].amount
                            })
                            headInput.save().then(result=>{
                            }).catch(error=>{
                                res.status(500).json({
                                    message:'Some Error found!',
                                    error:err
                                })
                            })
                        }
                    }
                })

                Budget.findById(data.id).then(newData=>{
                    res.json({data:newData})
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something error found!',
                    error:err
                })
            })
    }
    //Delete data
    destroy(req, res,next) {
        HeadWiseBudget.remove({
            budget_id: req.params.id
        }, function (err, result) {
            if (err){
                res.send(err)
            }else{
                Budget.remove({
                    _id: req.params.id
                }, function (err, result) {
                    if (err)
                        res.send(err)
                    res.send({
                        success: true
                    })
                })
            }
        })

    }

}
module.exports = new BudgetController;