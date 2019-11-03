const express=require('express')
const route=express.Router()
const Controller=require('./ProfileController')

route.get('/', Controller.profile)
route.post('/', Controller.update)
route.put('/', Controller.password)

module.exports = route