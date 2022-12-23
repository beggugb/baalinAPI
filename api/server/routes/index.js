import usuarios from './usuarioRoute'
import clientes from './clienteRoute'
import categorias from './categoriaRoute'
import files from './fileRouter'
import publicaciones from './publicacionRoute'
import consultas from './consultaRoute'
import users from './userRoute'
import favoritos from './favoritoRoute'
import mail from './mailRouter'

export default(app) =>{
  app.use('/api/usuarios',usuarios)  
  app.use('/api/clientes',clientes)
  app.use('/api/categorias',categorias)
  app.use('/api/files',files)
  app.use('/api/publicaciones',publicaciones)  
  app.use('/api/consultas',consultas)
  app.use('/api/users',users)
  app.use('/api/favoritos',favoritos)
  app.use('/api/mails',mail)

}