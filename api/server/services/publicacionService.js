import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Publicacion, Cliente, Categoria } = db;

const create = (value) =>{
    return new Promise((resolve, reject)=>{
        Publicacion.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Publicacion.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const data = (pag,num,value,nombres) =>{  
    return new Promise((resolve,reject)=>{        
        
        let page = parseInt(pag)
        let der = num * page - num

        Publicacion.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','desc']],            
            attributes:["id","label","direccion","tipo","precio","createdAt","moneda","categoria"],    
                  
            where: {[Op.and]: [
                { label :{ [Op.iLike]: nombres }},             
                { clienteId:{[value === 0 ?Op.gt:Op.eq]: value }}
              ]}
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
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Publicacion.findByPk(pky,{
            raw:true,
            nest:true, 
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","filename","telefono","celular","verificado","agente","estado","publicaciones"]}
              ]
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Publicacion.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return new Promise((resolve, reject)=>{
        Publicacion.findAll({
            raw:true,
            nest:true,
            order:[['label','ASC']],
            attributes: [['label','label'],['id','value']]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject(reason))
    })
}


const lista = () =>{
    return new Promise((resolve, reject)=>{
        Publicacion.findAll({
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
        Publicacion.findAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],
            /*attributes:['id','labelre','estado','icon'],            */
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
        Publicacion.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const consulta = (pag,num,tipo,contrato,ciudad,moneda,irango,frango) =>{        
    return new Promise((resolve,reject)=>{ 
        let page = parseInt(pag)
        let der = num * page - num
        let desde = Number(irango)                    
        let hasta = Number(frango) === 0 ? 200000 : Number(frango)       
        Publicacion.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['destacado','desc'],['id','desc']],              
            attributes:['id','label','direccion','precio','moneda','destacado','filename1','latitude','longitude','estado','tipo','provincia','views'],
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","filename"]}
              ],
            where: {[Op.and]: [ 
                { tipo:{ [Op.eq]: tipo }},
                { contrato:{ [Op.eq]: contrato }},
                { ciudad:{ [Op.eq]: ciudad }},
                { moneda:{ [Op.eq]: moneda }},
                { precio: { [Op.between]: [desde, hasta]}},
            ]},          
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
const consultaAll = (pag,num) =>{    
    return new Promise((resolve,reject)=>{    
        let page = parseInt(pag)
        let der = num * page - num
        Publicacion.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','desc']],              
            attributes:['id','label','direccion','precio','moneda','filename1','latitude','longitude','estado','tipo'],            
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
const last = (ciudad) =>{      
    return new Promise((resolve,reject)=>{            
        Publicacion.findAndCountAll({
            raw:true,
            nest: true,
            offset: 0,
            limit: 100,
            where : { ciudad: ciudad},
            order:[['id','desc']],              
            attributes:['id','label','direccion','precio','moneda','provincia','ciudad','filename1','latitude','longitude','estado','tipo'],            
        })
        .then((rows)=>resolve({
            paginas: isNUllArray(Math.ceil(rows.count/100)),
            pagina: 1,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
        }))
        .catch((reason)=>reject({message: reason.message}))
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
    _delete,
    consulta,
    consultaAll,
    last
}

