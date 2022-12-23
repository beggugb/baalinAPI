
const bcrypt = require('bcrypt')
import formatear from "../utils/formatear"
import { verifiDBNull, verifiDBEmpty, verOpen } from '../../functions/env'
import publicacionService from "../services/publicacionService";
import favoritoService from "../services/favoritoService"


const  getData =(req, res)=>{        
    const { clienteId, pagina, num, label } = req.body       
    let iclienteId = verifiDBEmpty(clienteId)  
    let inombres = verifiDBNull(label)     
    console.log(clienteId)            
    console.log(label)            
    publicacionService.data(pagina,num,iclienteId,inombres)
    .then((rows)=>{   
        let rawData = rows.data.map((item,index)=>{
            let iok = {}
            iok={
                id          : item.id,
                label       : item.label,
                direccion   : item.direccion,
                tipo        : item.tipo,
                precio      : item.precio +" "+item.moneda,
                fecha       : item.createdAt,
                categoria   : item.categoria,
                estado      : item.estado ? "contratado":"disponible"                
            }
            return iok
        })

        res.status(200).send({result: {data:rawData, total:rows.total, pagina:rows.pagina, paginas: rows.paginas}})                
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const  search =(req,res)=>{
    const {prop, value } = req.body                
    let newValue = verifiDBNull(value)
    publicacionService.search(prop,newValue)
    .then((rows)=>{
        console.log(rows)
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{            
        res.status(400).send({message: reason})
    })
}

const  create=(req, res)=>{       
    const { clienteId } = req.body
     publicacionService.create(req.body)
     .then((row)=>{                    
        publicacionService.data(1,12,clienteId,"%")
            .then((rows)=>{   
                let rawData = rows.data.map((item,index)=>{
                    let iok = {}
                    iok={
                        id          : item.id,
                        label       : item.label,
                        direccion   : item.direccion,
                        tipo        : item.tipo,
                        precio      : item.precio +" "+item.moneda,
                        fecha       : item.createdAt,
                        categoria   : item.categoria,
                        estado      : item.estado ? "contratado":"disponible"                
                    }
                    return iok
                })

                res.status(200).send({result: {data:rawData, total:rows.total, pagina:rows.pagina, paginas: rows.paginas}})                
            })
      })
      .catch((reason) => {   
           console.log(reason)             
        res.status(400).send({ message: reason });
      });        
}

const  update=(req, res)=>{        
    const { clienteId } = req.body     
        publicacionService.update(req.body,req.params.id)
        .then((row)=>{                       
            publicacionService.data(1,12,clienteId,"%")
            .then((rows)=>{   
                let rawData = rows.data.map((item,index)=>{
                    let iok = {}
                    iok={
                        id          : item.id,
                        label       : item.label,
                        direccion   : item.direccion,
                        tipo        : item.tipo,
                        precio      : item.precio +" "+item.moneda,
                        fecha       : item.createdAt,
                        categoria   : item.categoria,
                        estado      : item.estado ? "contratado":"disponible"                
                    }
                    return iok
                })

                res.status(200).send({result: {data:rawData, total:rows.total, pagina:rows.pagina, paginas: rows.paginas}})                
            })                       
        })
        .catch((reason)=>{     
            console.log(reason)       
            res.status(400).send({message: reason})
        })               
}

const  item=(req, res)=>{            
    publicacionService.item(req.params.id)
    .then((xrow) => {      
        let resdata = xrow   
        resdata.cliente  = xrow.cliente.nombres
        resdata.ecliente = xrow.cliente.estado ? "activo" :"desactivado"
        res.status(200).send({message: "publicacion item",result: resdata})                           
    })
    .catch((reason) => {  
        console.log(reason)          
        res.status(400).send({ message: reason });
    });                                
}

const  consulta=(req, res)=>{  
    const { page, num, tipo,contrato,ciudad,moneda,desde,hasta } = req.body    
    publicacionService.consulta(page, num, tipo,contrato,ciudad,moneda,desde,hasta)
    .then((xrow) => {                 
        res.status(200).send({message: "publicacion item",result: xrow})                           
    })
    .catch((reason) => {  
        console.log(reason)          
        res.status(400).send({ message: reason });
    });                                
}

const  last=(req, res)=>{               
    publicacionService.last(req.params.ciudad)
    .then((xrow) => {                 
        res.status(200).send({message: "publicacion item",result: xrow})                           
    })
    .catch((reason) => {  
        console.log(reason)          
        res.status(400).send({ message: reason });
    });                                
}

const  consultaItem=(req, res)=>{            
    publicacionService.item(req.params.id)
    .then((item) => {                 
        let npm ={
            views : parseInt(item.views) + 1
        }              
        publicacionService.update(npm,req.params.id)
        .then((xitems)=>{
            const imagenes = [
                {id:0,imgUrl:'/static/images/f1/md/'+item.filename1},
                {id:1,imgUrl:'/static/images/f2/md/'+item.filename2},
                {id:2,imgUrl:'/static/images/f3/md/'+item.filename3},
                {id:3,imgUrl:'/static/images/f4/md/'+item.filename4},
            ]       
            res.status(200).send({message: "publicacion item",result: { item,imagenes}})       
        })
        .catch((reason) => {  
            console.log(reason)          
            res.status(400).send({ message: reason });
        });
    })                                        
}

const consultaAll=(req, res)=>{               
    publicacionService.consultaAll(req.params.page,req.params.num)
    .then((xrow) => {                 
        res.status(200).send({message: "publicacion item",result: xrow})                           
    })
    .catch((reason) => {  
        console.log(reason)          
        res.status(400).send({ message: reason });
    });                                
}



module.exports={    
    getData,
    search,
    create,
    update,
    item,  
    consultaItem,
    consulta,
    consultaAll,
    last  
}