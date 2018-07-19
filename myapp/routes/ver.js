var express = require('express');
var router = express.Router();

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

module.exports = router;
