const express = require('express')
const route = express.Router();
const PermissionController = require('../controllers/acl/PermissionController')

route.get('/',PermissionController.index);
route.get('/customize',PermissionController.modulePermissions);
route.post('/',PermissionController.store);
route.get('/:id',PermissionController.show);
route.put('/:id',PermissionController.update);
route.delete('/:id',PermissionController.delete);
module.exports = route
