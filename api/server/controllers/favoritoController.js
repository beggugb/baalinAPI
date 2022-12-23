
const bcrypt = require('bcrypt')
import formatear from "../utils/formatear"
import { verifiDBNull, verOpen } from '../../functions/env'
import favoritoService from "../services/favoritoService";


    const  data =(req, res)=>{        
        favoritoService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista favoritos", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  search =(req,res)=>{
        const {prop, value } = req.body                
        let newValue = verifiDBNull(value)
        favoritoService.search(prop,newValue)
        .then((rows)=>{
            console.log(rows)
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }

    const  create=(req, res)=>{       
        const { userId, publicacionId } = req.body 
        favoritoService.single(userId, publicacionId)
        .then((row)=>{                        
                if(row){
                    res.status(200).send({ message: "existe" });
                }else{
                    favoritoService.create(req.body)
                    .then((rows)=>{            
                        res.status(200).send({message: "registrado"})
                    })
                }
            })       
            .catch((reason) => {
                    console.log(reason)
                    res.status(400).send({ message: reason });
            }); 

    }

    const  update=(req, res)=>{             
            favoritoService.update(req.body,req.params.id)
            .then((row)=>{            
                favoritoService.data(1,12,'id','desc')
                .then((rows)=>{            
                    res.status(200).send({message: "lista favoritos", result: rows})
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
        favoritoService.item(req.params.id)
        .then((xrow) => {         
            res.status(200).send({message: "favorito item",result: xrow})                           
        })
        .catch((reason) => {  
            console.log(reason)          
            res.status(400).send({ message: reason });
        });                                
    }
    const  getItems =(req,res)=>{
        console.log('ooooo')
        favoritoService.list()
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