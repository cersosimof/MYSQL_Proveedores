var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proveedores'
});


//######### MULTER ################################################
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/');
    },
    filename: function(req, file, cb) {
      cb(null, file.filename + '-' + Date.now() + '.png');
    }
  });
  
  var upload = multer({ storage: storage });
//###################################################################

router.get('/', function(req, res) {
    if(req.session.user){         
    res.render('alta', {'usuario' : req.session.user})
    } else {
      res.redirect('/')
    }
})

router.post('/', upload.single('imagen'), function(req, res, next) {
    var nombre = req.body.nombre;
    var correo = req.body.correo;
    var telefono = req.body.telefono;    
    var contacto = req.body.contacto;
    var ramo = req.body.ramo;
    var cuit = req.body.cuit;

    //ATRAPA IMAGEN
    var imagen = 'noimagen.png'
    if(req.file) {
    imagen = req.file.filename
    };

    //ENVIO DE CORREO AL PROVEEDOR QUE SE DA DE ALTA.
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'cersosimof88@gmail.com',
                pass: 'huevodepascua'
          },
          tls: {
            rejectUnauthorized: false
        }
      });

      let mailOptions = {
          from: 'noReply',
          to: correo,
          subject: 'Bienvenido ' + nombre, 
          text: 'Hello world?', 
          html: '<b>Bienvenido al maestro de proveedores</b>'
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      });
    });

    //ALTA EN LA BASE DE DATOS
    pool.query('INSERT INTO proveeores (nombre, correo, telefono, contacto, ramo, cuit, imagen) VALUES ( ?, ?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, contacto, ramo, cuit, imagen], function (error, results, fields) {
      if (error) throw error;
      res.render('alta', {'altaOk' : 'Proveedor ingresado en la base de datos', 'usuario' : req.session.user })
    });
})

module.exports = router;
