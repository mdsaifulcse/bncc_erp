const express = require('express')
const route = express.Router();
const Controller = require('./ReportController')

route.get('/regiment',Controller.regiment);
route.get('/session',Controller.session);
route.get('/employee/:id',Controller.employee);
route.post('/performance',Controller.performance);
route.post('/award',Controller.award);
route.post('/punishment',Controller.punishment);
route.post('/transfer',Controller.transfer);
route.post('/termination',Controller.termination);
route.post('/attendance',Controller.attendance);

module.exports = route