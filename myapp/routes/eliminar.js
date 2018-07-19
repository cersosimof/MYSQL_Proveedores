var express = require('express');
var router = express.Router();
var mysql = require('mysql');



module.exports = (req, res, next) => {
    var codigo = req.params.codigo;

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'proveedores'
    });

    connection.connect(); 
    connection.query('DELETE FROM articulos WHERE codigo = ?', [codigo], function (error, results, fields) {
      if (error) throw error;
      console.log('deleted ' + results.affectedRows + ' rows');
    })
    connection.end();
         console.log(codigo)
         res.redirect('/inicio');

}