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
    if (req.session.user) {
        res.render('modificar', {'usuario' : req.session.user})
    } else {
        res.render('index', {});  
    }
})

router.post('/', function(req, res) {
    var empresa = req.body.empresa;
    if (req.session.user) {
        res.redirect('/modificar/'+ empresa)
    } else {
        res.render('index', {});  
    }
})

router.get('/:empresa', function(req, res) {
    var empresaAModif = req.params.empresa;
    if (req.session.user) {
        pool.query('SELECT * FROM proveeores WHERE nombre = ?',[empresaAModif], (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.redirect('errorlog');
            } else {
            res.render('modificar', {'empresa' : empresaAModif, 'resultado' : results, 'usuario' : req.session.user})
            } 
        });
    } else {
        res.render('index');  
    }
})

router.post('/:empresa/update', function(req, res) {
    var empresa = req.params.empresa;
    var correo = req.body.correo;
    var telefono = req.body.telefono;
    var contacto = req.body.contacto;
    var ramo = req.body.ramo;
    var cuit = req.body.cuit;

    if (req.session.user) {
        pool.query('UPDATE proveeores SET correo = ?,telefono = ?,contacto = ?, ramo = ? WHERE nombre = ?',[correo, telefono, contacto, ramo, empresa], (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.render('errorlog');
            } else {
            res.render('modificar', {'usuario' : req.session.user, 'mensaje' : 'El proveedor se modifico correctamente'})
            } 
        });
    } else {
        res.redirect('index');  
    }
})

module.exports = router;
