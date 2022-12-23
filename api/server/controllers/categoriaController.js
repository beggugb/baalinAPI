
const bcrypt = require('bcrypt')
import formatear from "../utils/formatear"
import { verifiDBNull, verOpen } from '../../functions/env'
import categoriaService from "../services/categoriaService";


    const  data =(req, res)=>{        
        categoriaService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista categorias", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  search =(req,res)=>{
        const {prop, value } = req.body                
        let newValue = verifiDBNull(value)
        categoriaService.search(prop,newValue)
        .then((rows)=>{
            console.log(rows)
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }

    const  create=(req, res)=>{       
         categoriaService.create(req.body)
         .then((row)=>{                        
            categoriaService.data(1,12,'id','desc')
                .then((rows)=>{            
                    res.status(200).send({message: "lista categorias", result: rows})
                })
           })  
          .catch((reason) => {
                 console.log(reason)
                res.status(400).send({ message: reason });
           });                       
    }

    const  update=(req, res)=>{             
            categoriaService.update(req.body,req.params.id)
            .then((row)=>{            
                categoriaService.data(1,12,'id','desc')
                .then((rows)=>{            
                    res.status(200).send({message: "lista categorias", result: rows})
                })
                .catch((reason) => {                
                res.status(400).send({ message: reason });
              });                        
            })
            .catch((reason)=>{     
                console.log(reason)       
                res.status(400).send({message: reason})
            })               
    }

    const  item=(req, res)=>{            
        categoriaService.item(req.params.id)
        .then((xrow) => {         
            res.status(200).send({message: "categoria item",result: xrow})                           
        })
        .catch((reason) => {  
            console.log(reason)          
            res.status(400).send({ message: reason });
        });                                
    }
    const  getItems =(req,res)=>{
        console.log('ooooo')
        categoriaService.list()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }

 

module.exports={    
    data,
    search,
    create,
    update,
    item,   
    getItems, 
}