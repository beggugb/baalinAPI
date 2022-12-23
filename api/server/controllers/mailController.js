import mailService from '../services/mailService'
import clienteService from '../services/clienteService'
const bcrypt = require('bcrypt')


const  setCreate = (req,res)=>{        
  const { email, nombres, contrasena } = req.body
  let dato = req.body
  dato.password   =  bcrypt.hashSync(contrasena,bcrypt.genSaltSync(10),null)
  dato.tipo       = "cliente"
  dato.filename   = "default.jpg"
 

  clienteService.verificar(email)
  .then((row)=>{    
    if(!row){
      clienteService.create(dato)
      .then((dtm)=>{
        let token = bcrypt.hashSync(String(dtm.id),bcrypt.genSaltSync(10),null)
        let newData  = {
          id: dtm.id,  
          token: token
        }
   
        mailService.prueba(email,nombres,token)
            .then((user)=>{
              clienteService.update(newData,dtm.id )
              .then((xuser)=>{
                res.status(200).send({message:"usuario registrado"})
              })
              .catch((reason)=>{                                     
                res.status(400).send({message: reason.message.original.detail})
              })                            
            })              
            .catch((reason)=>{                                     
              res.status(400).send({message: reason.message.original.detail})
            })
      })
      .catch((reason)=>{                     
        console.log(reason)                
        res.status(400).send({message: reason})
      })      
    }else{
      res.status(400).send({message:"el mail se encuentra registrado"})  
    }
    
  })
  .catch((reason)=>{                                     
    res.status(400).send({message: reason.message.original.detail})
  })

  /*clienteService.create(req.body)
    .then((row)=>{
       res.status(200).send({result:row})
    })
    .catch((reason)=>{                                     
      res.status(400).send({message: reason.message.original.detail})
    })*/
}


  const  registro =(req,res) =>{     
    /** 1 */
    let idd    = 1
    let email  = 'gabgpa@gmail.com'
    let nombre = 'Gabriel Benavidez Guzman'
    let token  = `0125*/daS${idd}`

    mailService.prueba(email,nombre,token)
            .then((user)=>{
              console.log(user)
                res.status(200).send({result: {user:user}})            
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })
 }

 const  activate =(req,res) =>{     
  const {token } = req.body
  clienteService.getToken(token)
  .then((resu)=>{
    if(resu){
      let iok = resu
      iok.verificado = true
      clienteService.update(iok,iok.id )
              .then((xuser)=>{
                res.status(200).send({result: "yes"})            
              })
              .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })      
    }else{
      res.status(400).send({message: "nop"})
    }
  })
  .catch((reason)=>{
    console.log(reason)
    res.status(400).send({message: reason})
})

}

module.exports={
    registro,
    setCreate,
    activate
     
}