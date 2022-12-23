import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Favorito, User,Publicacion, Cliente } = db;


const data = (pag,num,prop,value) =>{  
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Favorito.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','desc']],    
            where : { userId: Number(prop)},
            include:[
                {
                    model:Publicacion,as:"publicacion",
                    include:[
                        {model:Cliente,as:"cliente",attributes:["id","nombres","telefono","celular"]}
                      ], 
                }
              ]  

        })
        .then((rows)=>resolve({
            paginas: isNUllArray(Math.ceil(rows.count/num)),
            pagina: page,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
        }))
        .catch((reason)=>reject({message: reason.message}))
    })
} 

const create = (value) =>{
    return new Promise((resolve, reject)=>{
        Favorito.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Favorito.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Favorito.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (userId,publiId) =>{
    return new Promise((resolve, reject)=>{
        Favorito.findOne({
            where: {[Op.and]: [
                { userId:{ [Op.eq]: userId }},             
                { publicacionId: { [Op.eq]: publiId }},     
              ]},                    
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return new Promise((resolve, reject)=>{
        Favorito.findAll({
            raw:true,
            nest:true,
            order:[['nombre','ASC']],
            attributes: [['nombre','label'],['id','value']]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject(reason))
    })
}


const lista = () =>{
    return new Promise((resolve, reject)=>{
        Favorito.findAll({
            raw:true,
            nest:true,
            where: {estado : true}       
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject(reason))
    })
}




const search = (prop,value) =>{
    return new Promise((resolve,reject) =>{        
        Favorito.findAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],
            attributes:['id','nombre','estado','icon'],            
            where: {[Op.and]: [
                { [prop]:{ [Op.iLike]: value }},             
                { id: { [Op.gt]: 1 }},     
              ]},
        })
        .then((rows)=>resolve({
            paginas: isNUllArray(Math.ceil(rows.count/15)),
            pagina: 1,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
        }))
        .catch((reason)=>reject({message: reason.message})) 
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Favorito.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


module.exports = {
    item,    
    create,
    single,
    list,
    lista,
    update,    
    data,
    search,
    _delete

}

