const Rank = require('./RankModel')
const path=require('path')
const unit=require('util')
const mongoose = require('mongoose')

class RankController{
    // all ranks -------------------list
    index(req,res,next){
        Rank.find()
            .then(ranks=>{
                res.status(200).json(ranks)
            })
            .catch(err=>{
                res.status(500).json(err)
            })

    }

    // save ranks info to database---------------------
    store(req,res,next){
        let input = req.body;
        const rank = new Rank(input)
        rank.save()
            .then(data=>{
                res.status(201).json(data)
            }).catch(err=>{
                res.status(500).json(err)
        })
    }

    //single user show
    show(req,res,next){
        Rank.findById(req.params.id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;

        Rank.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Rank.findById(data.id).then(newData=>{
                    res.json(newData)
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
        Rank.findByIdAndRemove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    // active rank list -------------------------------
    activeRanks (req, res,next) {
        Rank.find({status:1})
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    // bulk entry --------------------------
    bulkRanksSave(req,res,next){
        let ranks = req.body;
        let i=0
        let successMsg=[]
        for (i=0; i<ranks.length; i++){
            let rankData=new Rank(ranks[i])
            rankData.save()
                .then(ok=>{
                    successMsg=ok
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
        }
        res.status(201).json({message:'All Ranks Successfully Saved !'})
    }
}

module.exports = new RankController
