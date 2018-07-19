var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('contacto', {'usuario' : req.session.user})
    } else {
        res.render('index')
    }
})

//AL HACER SUBMIT EN EL FORMULARIO!
router.post('/enviar', function(req, res) {          
    if (req.session.user) {
        var nombreC = req.body.nombreContacto;
        var correoC = req.body.emailContacto;
        var consultaC = req.body.consultaContacto;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'cersosimof88@gmail.com',
                   pass: 'huevodepascua'
               },
            tls: {
                rejectUnauthorized: false
            }
           });
        
           const mailOptions = {
            from: 'sender@email.com', // sender address
            to: 'cersosimo.facundo@gmail.com', // list of receivers
            subject: 'Subject of your email', // Subject line
            html: '<p>Your html here</p>'// plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });


        res.redirect("/")
    } else {
        res.render('index')
    }
})
        
module.exports = router;


        