const express = require('express')
const route = express.Router();
const Controller = require('./FindController')

route.get('/regiments',Controller.regiment);
route.get('/sessions',Controller.sessions);
route.post('/',Controller.show);
module.exports = route
