import db from "../../src/models"
import jwt from "jsonwebtoken"
import nodeMailer from "nodemailer";
const hosti = 'http://localhost:3000/confirmacion/'

const prueba = (email,nombre,token) =>{
    return new Promise((resolve, reject)=>{
        let transporter = nodeMailer.createTransport({
            service: 'gmail',            
            auth: {
              user: "beggugb@gmail.com",
              pass: "tyibqwsuowuakcbh",
            },
          });
         
          let mailOptions = {
            from: 'beggubg@gmail.com',
            to: email,
            subject: 'Confirmación de registro',
            html: templateMensaje(nombre,token)
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              resolve({ mail: error });
            }
            resolve({ mail: "ok" });
          });
    })
}

function templateMensaje(nombre,token){
    let d      = new Date() 
    let fecha  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    let hora   = d.getHours() +':'+ d.getMinutes()
  
      let template =`<body>
              <h1>Bienvenido a Baalin</h1>              
              <h2>${nombre} </h2>                            
              <p></p>
              <p></p>
              <p><a href="${hosti}${token}">Confirma tu cuenta</a></p>                            
              <p>En esta dirección de correo recibirás solo lo importante. </p>                                    
              <p>Baalin 2.1</p>
              </body>`
      return template                  
  }

module.exports = {
    prueba,        
}



/*

static getCotizacion(compraId,empresa,nombres,email) {                
    return new Promise((resolve, reject) => {
        let transporter = nodeMailer.createTransport({
          host: empresa.smtpHost,
          port: empresa.smtpPort,
          secure: true,
          auth: {
            user: empresa.smtpUser,
            pass: empresa.smtpPassword,
          },
        });
        
        let template    = getcotizacion(compraId,nombres,email);
        let templateMsg = "Solicitud de cotización";
        let emailUser   = email;
     
       
        let mailOptions = {
          to: emailUser,
          subject: templateMsg,
          html: template,
          attachments: [
            {   
                filename: `cotizacionCompra${compraId}.pdf`,
                path: `${process.cwd()}/api/public/documents/cotizacionCompra${compraId}.pdf`
            }] 
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            resolve({ mail: error });
          }
          resolve({ mail: "ok" });
        });
      });
  } */