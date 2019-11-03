const express = require('express')
const route = express.Router();
const FrontendController = require('../controllers/FrontendController')

route.get('/',FrontendController.menu);
route.get('/load-menu/:id',FrontendController.loadMenu);
route.get('/modules',FrontendController.modules);
route.get('/module/:id',FrontendController.singleModule);
route.get('/info',FrontendController.primaryInfo);
route.get('/regiment',FrontendController.regiment);
route.get('/budget',FrontendController.newBudget);
module.exports = route
