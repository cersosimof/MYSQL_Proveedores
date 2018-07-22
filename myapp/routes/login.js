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

router.get('/', function(req, res) {
  if(req.session.user){
    res.render('index', { usuario : req.session.user });
  } else {
    res.render('errorlog')
  }
});

router.post('/', function(req, res) {
  var user = md5(req.body.user);
  var pass = md5(req.body.pass);

  pool.query('SELECT * FROM usuarios WHERE user = ? AND pass = ?',[user, pass], (err, results) => {
    if(err) throw err;                      
    if (results.length == 0){
    res.render('errorlog', { 'mensaje' : 'Usuario o contraseña incorrectos'});
    } else {
    req.session.user=req.body.user;
    req.session.pass=req.body.pass;
    res.redirect("/")
    } 
  });
});

module.exports = router;