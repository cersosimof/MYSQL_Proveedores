var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proveedores'
});

module.exports = (req, res, next) => {
    var ramo = req.params.ramo;
    pool.query('SELECT * FROM proveeores where ramo = ? ', [ramo], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0){
            res.render('ver', {'usuario' : req.session.user , 'mensaje' : 'NO HAY PROVEEDORES PARA ESTA BUSQUEDA'})
        } else {
            res.render('ver', {'usuario' : req.session.user, 'productos' : results})       
        }
    })
}
