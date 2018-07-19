var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {         
  res.render('index', {'usuario' : req.session.user})
})

router.post('/', function(req, res) {        
    res.render('index', )
})

module.exports = router;
