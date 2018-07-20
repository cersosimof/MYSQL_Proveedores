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
        res.render('feedback', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
})

module.exports = router;


