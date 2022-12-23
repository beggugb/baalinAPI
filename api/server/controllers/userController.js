import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull } from '../../functions/env'
import userService from "../services/userService";


    const  loginuser =(req,res) =>{         
        console.log('prototipos')    
        userService.login(req.body)
        .then((user)=>{
            res.status(200).send({result: {user:user}})            
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
        
    }

    const  datausers =(req, res)=>{        
        userService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista users", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  searchuser =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        userService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }

    const  saveuser=(req, res)=>{
        const {username} = req.body        
	console.log(req.body)    
        userService.single(username)
        .then((user)=>{
            if(!user){
                userService.create(req.body)
                .then((row)=>{
                    res.status(200).send({message: "user registrado",result:row})
                })  
                .catch((reason) => {
                    console.log(reason)
                    res.status(400).send({ message: reason });
                });               
            }else{
                    res.status(400).send({message: "usuario existente"})
            }
        })
        .catch((reason) => {
            console.log(reason)
            res.status(400).send({ message: reason });
        });
    }

    const  setUpdate=(req, res)=>{     
        if(req.params.tipo === 'unit')
        {
            userService.update(req.body,req.params.id)
            .then((row)=>{            
               userService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "user actualizado",result:xrow})               
              })
                .catch((reason) => {
                res.status(400).send({ message: reason });
              });                        
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            })    
        }else{
            const { password } = req.body            
            let user={
                password : bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
            }
            userService.update(user,req.params.id)
            .then((row)=>{            
               userService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "user actualizado",result:xrow})               
              })
                .catch((reason) => {
                res.status(400).send({ message: reason });
              });                        
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            })
        }      
    }

    const  getItem=(req, res)=>{                        
        userService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "user actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{
        userService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
module.exports={
    loginuser,
    datausers,
    searchuser,
    saveuser,
    setUpdate,
    getItem,
    getItems
}
