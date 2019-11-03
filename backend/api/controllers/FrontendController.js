const Module=require('../models/Module')
const mongoose = require('mongoose')
const Menu=require('../models/Menu')
const SubMenu=require('../models/SubMenu')
const PrimaryInfo =require('../models/PrimaryInfo')
const PermissionRole = require('../models/PermissionRole')
const Regiment = require('../modules/regiment/Regiment')
const Budget = require('../modules/acc/budget/Budget')
class FrontendController {
   async primaryInfo(req,res,next){
        PrimaryInfo.findOne().then(info=>{
            res.status(200).json(info)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }

    /* Roll Wise module,Menu, Submenu */
    async menu(req,res,next){
        let role = req.decoded.role
        let permission = await PermissionRole.findOne({group:role})
        let perms = []
        let a = 0;
        for (a = 0; a < permission.permissions.length; a++){
            perms.push(permission.permissions[a].resource)
        }
        let Mainmenus = []
        let i = 0;
        let modules = await Module.find({status:1,type:{$ne:1}});
        for (i = 0; i < modules.length; i++){
            let modCom = compareArr(perms,modules[i].slug)
            if(modCom.length>0){
                let j=0;
                let myMenu = await Menu.find({module_id:modules[i]._id,status:1});
                let allData = {module:modules[i], menus:[],}
                for (j = 0; j < myMenu.length; j++){
                    let subCom = compareArr(perms,myMenu[j].slug)
                    if(subCom.length>0){
                        let subMenu = await SubMenu.find({menu_id:myMenu[j]._id,status:1});
                        let k = 0;
                        let subMenus = []
                        for(k=0;k<subMenu.length;k++){
                            let subSubCom = compareArr(perms,subMenu[k].slug)
                            if(subSubCom.length>0){
                                subMenus.push(subMenu[k])
                            }
                        }
                        allData.menus.push({menu:myMenu[j], subMenu:subMenus})
                    }
                }
                Mainmenus.push(allData)
            }
        }
        res.json(Mainmenus)
    }

    /* Only Active Modules  */
    async modules(req,res,next){
        let modules = await Module.find({status:1,type:1})
        let role = req.decoded.role
        let permission = await PermissionRole.findOne({group:role})
        let perms = []
        let a = 0;
        for (a = 0; a < permission.permissions.length; a++){
            perms.push(permission.permissions[a].resource)
        }
        let allData = []
        for (let i = 0; i < modules.length; i++) {
            if(modules[i].slug.length>1){
                let modCom = compareArr(perms, modules[i].slug)
                if (modCom.length > 0) {
                    allData.push(modules[i])
                }
            }
        }
        return res.json(allData)
        try{

        }catch(e){
            res.json(e)
        }
    }
    async loadMenu(req,res,next){
        let role = req.decoded.role
        let permission = await PermissionRole.findOne({group:role})
        let perms = []
        let a = 0;
        for (a = 0; a < permission.permissions.length; a++){
            perms.push(permission.permissions[a].resource)
        }
        let moduleId = req.params.id
        let j=0;
        let myMenu = await Menu.find({module_id:moduleId,status:1});
        let allData = []
        for (j = 0; j < myMenu.length; j++){
            let subCom = compareArr(perms,myMenu[j].slug)
            if(subCom.length>0){
                let subMenu = await SubMenu.find({menu_id:myMenu[j]._id,status:1});
                let k = 0;
                let subMenus = []
                for(k=0;k<subMenu.length;k++){
                    let subSubCom = compareArr(perms,subMenu[k].slug)
                    if(subSubCom.length>0){
                        subMenus.push(subMenu[k])
                    }
                }
                allData.push({module:myMenu[j], menus:subMenus})
            }
        }
        res.json(allData)
    }
    async singleModule(req,res,next){
        let module = await Module.findById(req.params.id)
        res.json(module)
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
    newBudget(req,res,next){
        Budget.aggregate([
            { "$match" : { "session_id" : mongoose.Types.ObjectId(req.decoded.session) } },
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            {$replaceRoot:{newRoot: {$mergeObjects:[{$arrayElemAt:["$session",0]}, "$$ROOT"]}}},
            {
                $project:{
                    "name":1,
                    "amount":1,
                    "budget_date":1,
                    "distribution_status":1,
                }
            }
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
}
function compareArr(arr1,arr2){
    const finalArr = []
    arr1.forEach((e1)=>arr2.forEach((e2)=>{
        if(e1==e2){
            finalArr.push(e1)
        }
    }))
    return finalArr;
}
module.exports = new FrontendController