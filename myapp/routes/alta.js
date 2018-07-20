var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proveedores'
});

router.get('/', function(req, res) {
    if(req.session.user){         
    res.render('alta', {'usuario' : req.session.user})
    } else {
      res.redirect('/')
    }
})

router.post('/', function(req, res, next) {
    var nombre = req.body.nombre;
    var correo = req.body.correo;
    var telefono = req.body.telefono;    
    var contacto = req.body.contacto;
    var ramo = req.body.ramo;
    var cuit = req.body.cuit;

    //ALTA EN LA BASE DE DATOS
    pool.query('INSERT INTO proveeores (nombre, correo, telefono, contacto, ramo, cuit) VALUES ( ?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, contacto, ramo, cuit], function (error, results, fields) {
      if (error) throw error;
      res.render('alta', {'altaOk' : 'Proveedor ingresado en la base de datos', 'usuario' : req.session.user })
    });
})

module.exports = router;
