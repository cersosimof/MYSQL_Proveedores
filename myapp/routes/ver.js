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
        res.render('ver', {'usuario' : req.session.user})
    }
})

router.post('/', function(req, res) {
    var ramo = req.body.ramo;
    if (req.session.user) {
        res.redirect('/ver/'+ramo)
    } else {
        res.render('index');  
    }
})

router.get('/:ramo', function(req, res) {
    var ramo = req.params.ramo;
    pool.query('SELECT * FROM proveeores where ramo = ? ', [ramo], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0){
            res.render('ver', {'usuario' : req.session.user , 'mensaje' : 'NO HAY PROVEEDORES PARA ESTA BUSQUEDA'})
        } else {
            res.render('ver', {'usuario' : req.session.user, 'productos' : results})       
        }
    })
})

module.exports = router;
