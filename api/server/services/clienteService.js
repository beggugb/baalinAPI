import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Cliente, Categoria, Horario } = db;


const login = (dato) =>{
    const { email, password } = dato
    return new Promise((resolve,reject)=>{
        Cliente.findOne({
            /*where: { email : { [Op.eq]: email}},*/
            where: {
                [Op.and]: [            
                  { email : { [Op.eq]: email}},
                  { verificado: { [Op.eq]: true } },                  
                ]
              },
            attributes:['id','nombres','email','password',"filename","tipo"],                  
        })
        .then((user)=>{            
            if(!user){                
                resolve({
                    auth: false,
                    message: "Usuario no habilitado",
                    usuario: null
              })
            }else{                
                user.comparePassword(password,(err, isMatch)=>{
                    if(isMatch && !err){
                        let payload = { user_id: user.id, email:user.email }
                        let token   = jwt.sign(payload,"clienteBaalin2022",{
                            expiresIn: "2629746000"
                        });
                        resolve({
                            auth: true,                            
                            message: "Acceso correcto",
                            usuario: user,
                            token: token
                        }) 
                    }else{
                        resolve({
                            auth: false,
                            message: "Contraseña incorrecta",
                            usuario: null
                        })
                    }
                })
            }
        })
        .catch((reason)=>({message: reason}))        
    })
}



const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Cliente.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const verificar = (email) =>{
    return new Promise((resolve,reject)=>{
        Cliente.findOne({
            raw:true,
            nest:true,
            where: {email: email}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const single = (pky) =>{
    return new Promise((resolve,reject)=>{
        Cliente.findByPk(pky,{
            raw:true,
            nest:true,
            attributes:['id','nombres']
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


const getToken = (token) =>{
    return new Promise((resolve,reject)=>{
        Cliente.findOne({
            raw:true,
            nest:true,
            /*where: {token: token}*/
            where: {
                [Op.and]: [            
                  { token: { [Op.eq]: token } },            
                  { verificado: { [Op.eq]: false } },                  
                ]
              },
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Cliente.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{        
        Cliente.update(dato,{
            where: { id: Number(datoId) }
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve, reject)=>{
        Cliente.destroy({
            where: { id: Number(datoId) }
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const data =(pag,num,nombres,nit) =>{      	
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { nombres: { [Op.iLike]: nombres } },            
            { nit: { [Op.iLike]: nit } },            
            { id: { [Op.gt]: 1 } },
          ]
        },            
        attributes:['id','nombres','ci','nit','telefono','celular','tipo','email','publicaciones']      
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

const search = (prop,value) =>{
    return new Promise((resolve, reject)=>{
        Cliente.findAll({
            raw: true,
            nest: true,            
            limit: 12,
            order: [['nombres','asc']],
            attributes:[['id','value'],['nombres','label']],
            where:{[prop]:{[Op.iLike]: value}}
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=> reject({message: reason.message}))

    })
}

const items = () =>{
    return new Promise((resolve,reject)=>{
       Cliente.findAll({
        raw:true,
        nest:true,
        order: [['apellidos','asc']],
        attributes:[['apellidos','label'],['id','value']],        
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


module.exports = {
    item,
    create,
    items,
    single,
    data,
    update,
    search,
    _delete,
    login,
    verificar,
    getToken
}   




