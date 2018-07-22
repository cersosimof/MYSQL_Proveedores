var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'proveedores'
});
var md5 = require('md5');

module.exports = (req, res, next) => {
    var newUser = md5(req.body.newUser);
    var newPass = md5(req.body.newPass);

    pool.query('SELECT user FROM usuarios WHERE user = ?', [newUser], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0) {
            pool.query('INSERT INTO usuarios (user, pass) VALUES ( ?, ?)', [newUser, newPass], function (error, results, fields) {
                console.log('--------------------------------')
                console.log('USUARIO CARGADO EN BASE DE DATOS')
                console.log('--------------------------------')
            res.redirect('/')
            })
        } else {
            res.render('errorlog', {'mensaje' : 'El usuario ya existe, intente nuevamente.'})
            console.log('----------------')
            console.log('el suario existe')
            console.log('----------------')
        }
      });
}