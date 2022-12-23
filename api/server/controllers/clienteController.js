
const bcrypt = require('bcrypt')
import formatear from "../utils/formatear"
import { verifiDBNull, verOpen } from '../../functions/env'
import clienteService from "../services/clienteService";

    const  loginCliente =(req,res) =>{       
        console.log(req.body)       
        clienteService.login(req.body)
                .then((user)=>{
                    res.status(200).send({result: {user:user}})            
                })
                .catch((reason)=>{
                    console.log(reason)
                    res.status(400).send({message: reason})
                })
                                    
    }
    const  getItem = (req,res)=>{         
        clienteService.item(req.params.id)
            .then((row)=>{
                res.status(200).send({result:row})                
            })    
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })     
    }
    
    const  getData = (req,res)=>{ 
        const { nombres, nit, pagina, num } = req.body           
        let inombres = verifiDBNull(nombres)              
        let init     = verifiDBNull(nit)                                   
        clienteService.data(pagina, num, inombres, init)
            .then((rows)=>{                                          
                res.status(200).send({result: rows})                
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })     
    }
    
    const  setUpdate = (req,res)=>{               
            clienteService.update(req.body,req.params.id)
            .then((xrow)=>{
                clienteService.item(req.params.id)
                .then((row)=>{
                   res.status(200).send({result:row})
                })
            })
            .catch((reason)=>{     
                console.log(reason)           
                res.status(400).send({message: reason})
            })        
    }
    
    const  setCreate = (req,res)=>{                
            clienteService.create(req.body)
            .then((row)=>{
                res.status(200).send({result:row})
            })
            .catch((reason)=>{   
                console.log(reason)                                  
                res.status(400).send({message: reason.message.original.detail})
            })
    }
    
    const  setDelete = (req,res)=>{            
        const { nombres, nit, direccion, pagina, num, clienteId } = req.body           
        let inombres = verifiDBNull(nombres)              
        let init     = verifiDBNull(nit)              
        let idireccion      = verifiDBNull(direccion)  
            clienteService._delete(clienteId)
            .then((xrow)=>{
                clienteService.data(pagina, num, inombres, init, idireccion)
                .then((rows)=>{
                    res.status(200).send({result: rows}) 
                })
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })    
    }
    
    const  getItems = (req,res)=>{
        clienteService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    
    const  getSearch = (req, res)=>{
      const { prop, value  } = req.body
      let ivalue = verifiDBNull(value)
        clienteService.search(prop, ivalue)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  setCopiar = (req,res)=>{        
        clienteService.item(req.params.id)
        .then((cliente)=>{
            let newItem = cliente
            newItem.id = null
            newItem.createdAt = null
            newItem.updatedAt = null
            newItem.nit = 0+req.params.id 
            newItem.codigo = cliente.codigo+'(copia)'
            newItem.nombres = cliente.nombres+'(copia)'
            clienteService.create(newItem)
            .then((it)=>{
                clienteService.data(1,12,'nombres','DESC')
                .then((items)=>{
                    res.status(200).send({message:"cliente copiado",result:items})
                })
            })
            .catch((reason) => {              
                res.status(400).send({ message: reason });
            });

        })
        .catch((reason) => {                                                              
            res.status(400).send({ message: reason });
        });
    }

module.exports={
    getItem,
    getData,
    setUpdate,
    setCreate,
    setDelete,
    getItems,
    getSearch,
    setCopiar,
    loginCliente
}
