const Permission = require('../../models/Permission')
const Module = require('../../models/Module')

class PermissionController{

//View all Data
    async index(req,res,next){
        let permissions = await Permission.find()
        return res.json(permissions)
    }
    async modulePermissions(req,res,next){
        let module = await Module.find({type:1,status:1})
        let permissions = []
        let slug = []
        for (let i = 0;i < module.length;i++){
            slug = slug.concat(module[i].slug);
            let perm = await Permission.find({slug:{"$in":module[i].slug}})
            permissions.push({module:module[i],perm:perm})
        }
        let perm = await Permission.find({slug:{"$nin":slug}})
        permissions.push({module:{name:'Others',_id:'others_id'},perm:perm})
        return res.json(permissions)
    }
//single user show
    show(req,res,next){
        Permission.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//Store Data into DB
    store(req,res,next){
        let input = req.body;
        input.slug = input.slug.replace('/*', '')
        input.slug = input.slug + ''
        if(input.type===1){
            input.methods = ["POST", "GET", "PUT","DELETE"]
        }else{
            input.methods = "*"
        }
        const role = new Permission(input)
        role.save().then(data=>{
            res.status(201).json({
                message:'Data successfully inserted.',
                result:data
            }).catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
        })
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;
        inputData.slug = inputData.slug.replace('/*', '')
        inputData.slug = inputData.slug + ''
        if(inputData.type===1){
            inputData.methods = ["POST", "GET", "PUT","DELETE"]
        }else{
            inputData.methods = "*"
        }
        Permission.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Permission.findById(data.id).then(newData=>{
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
    delete(req, res,next) {
        Permission.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
}
module.exports = new PermissionController;