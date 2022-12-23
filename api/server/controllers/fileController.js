import fileService from '../services/fileService'
import publicacionService from '../services/publicacionService'
import userService from '../services/userService'
import clienteService from '../services/clienteService'

    const  usuario=(req,res)=>{
        fileService.usuario(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            userService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

    const  cliente=(req,res)=>{
        fileService.cliente(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            clienteService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

    const  portada=(req,res)=>{
        fileService.portada(req,res)
        .then((file)=>{
            const art = {
                portada: file.filename
            }
            publicacionService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    
    const  f1=(req,res)=>{
        fileService.f1(req,res)
        .then((file)=>{
            const art = {
                filename1: file.filename
            }
            publicacionService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  f2=(req,res)=>{
        fileService.f2(req,res)
        .then((file)=>{
            const art = {
                filename2: file.filename
            }
            publicacionService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  f3=(req,res)=>{
        fileService.f3(req,res)
        .then((file)=>{
            const art = {
                filename3: file.filename
            }
            publicacionService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  f4=(req,res)=>{
        fileService.f4(req,res)
        .then((file)=>{
            const art = {
                filename4: file.filename
            }
            publicacionService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
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