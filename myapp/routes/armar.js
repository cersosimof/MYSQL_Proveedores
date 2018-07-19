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
        res.render('armar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
})

router.post('/', function(req, res) {
    //CAPTURA DE VARIABLES DE NROEXP - RAMO
    var nroExp = req.body.nroExp;
    var ramo = req.body.ramo;

    if (req.session.user) {
    pool.query('SELECT nroExpediente FROM listadoexpediente WHERE nroExpediente = ?', [nroExp], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0){
            pool.query('SELECT idEmpresa FROM proveeores WHERE ramo LIKE ?',["%"+ramo+"%"], (err, results) => {

                if(err) throw err;                  
            
                if (results.length == 0){
                res.render("armar", { 'mensaje' : 'No hay empresas en ese ramo', 'usuario' : req.session.user})
            
                } else {
                    //GUARDA LAS EMPRESAS EN EL EXPEDIENTE
                    for (var i = 0; i < results.length; i++){
                        var empresa = results[i].idEmpresa;
                        pool.query('INSERT INTO listadoexpediente(nroExpediente, idEmpresa) VALUES (?, ?)', [nroExp, empresa], (err, results) => {
                        if(err) throw err;
                        })
                    }
                    res.redirect("/armar/"+nroExp)
                }
            
            });
        } else {
        //si existe el expediente
        res.render("armar", { 'mensaje' : 'Ya existe el expediente', 'usuario' : req.session.user} )
        }
        });

    } else {
        //SI NO ESTAS LOGUEADO
        res.redirect('/');  
    }
})

router.get('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        pool.query('SELECT listadoexpediente.idListado, listadoexpediente.nroExpediente, proveeores.idEmpresa, proveeores.nombre, proveeores.correo, proveeores.telefono, proveeores.contacto, proveeores.cuit FROM listadoexpediente LEFT JOIN proveeores ON listadoexpediente.idEmpresa = proveeores.idEmpresa WHERE listadoexpediente.nroExpediente = ?',[nroExp], (err, results) => {
            if(err) throw err; 
            res.render('armado', { empresas : results, 'usuario' : req.session.user, 'nroExp' : nroExp})
        })         
    } else {
        res.redirect('/');  
    }
})
module.exports = router;


