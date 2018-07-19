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
    var nroExp = req.body.nroExp;
    var empresa = req.body.empresa;

    console.log(nroExp)
    console.log(empresa)
    var buscar = "%"+empresa+"%";
    pool.query('SELECT idEmpresa FROM proveeores WHERE nombre LIKE ?',[buscar], (err, results) => {
    //ENVIO DE ERRORES
    if(err) throw err;                  
    //SI NO ENCUENTRA RESULTADOS
    if (results.length == 0){
    console.log("no hay resultados")
    //SI ENCUENTRA RESULTADOS
    } else {
        //GUARDA LAS EMPRESAS EN EL EXPEDIENTE
        for (var i = 0; i < results.length; i++){
            var empresa = results[i].idEmpresa;
            pool.query('INSERT INTO listadoexpediente(nroExpediente, idEmpresa) VALUES (?, ?)', [nroExp, empresa], (err, results) => {
            if(err) throw err;
            console.log('Empresa nueva Agregada')     
            })
        }
        res.redirect("armar/"+nroExp)
    }
})
}