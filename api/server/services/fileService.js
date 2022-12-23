const db = require('../../src/models');
const sequelize = require('sequelize');

const sharp = require('sharp')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'api/public/images/trash')
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')


const usuario = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/usuarios/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/usuarios/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/usuarios/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}
const portada = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/portada/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/portada/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/portada/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const f1 = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/f1/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/f1/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/f1/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const f2 = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/f2/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/f2/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/f2/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const f3 = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/f3/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/f3/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/f3/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const f4 = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/f4/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/f4/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/f4/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const cliente = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/cliente/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 200}).toFile('./api/public/images/cliente/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 100}).toFile('./api/public/images/cliente/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}




module.exports={    
    portada,
    cliente,
    f1,
    f2,
    f3,
    f4,
    usuario
}
