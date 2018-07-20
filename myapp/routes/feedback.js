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

        pool.query('SELECT nroExpediente FROM listadoexpediente GROUP BY nroExpediente', (err, results) => {
            if(err) throw err;
            console.log(results) 
            res.render('feedback', { expedientes : results, 'usuario' : req.session.user})
        })      
    } else {
        res.redirect('/');  
    }
})

router.get('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        pool.query('SELECT listadoexpediente.idListado, listadoexpediente.nroExpediente, proveeores.idEmpresa, proveeores.nombre, proveeores.correo, proveeores.telefono, proveeores.contacto, proveeores.cuit FROM listadoexpediente LEFT JOIN proveeores ON listadoexpediente.idEmpresa = proveeores.idEmpresa WHERE listadoexpediente.nroExpediente = ?', [nroExp], (err, results) => {
            if(err) throw err;
            console.log(results)
            res.render('feedbackEmpresa', { expedientes : results, 'usuario' : req.session.user, 'nroExp' : nroExp})
        })      
    } else {
        res.redirect('/');  
    }
})

router.post('/:nroExp', function(req, res) {          
    if (req.session.user) {
        console.log(req.body)
 
    } else {
        res.redirect('/');  
    }
})
module.exports = router;


