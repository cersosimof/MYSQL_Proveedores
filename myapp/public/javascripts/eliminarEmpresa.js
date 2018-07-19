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
    var nroExp = req.params.nroExp;
    var id = req.params.id; 
    pool.query('DELETE FROM listadoexpediente WHERE nroExpediente = ? AND idEmpresa = ?',[nroExp, id], (err, results) => {
    if(err) throw err;        
    if (results.affectedRows == 0){
    console.log("no hay resultados")
    } else {
    console.log('deleted ' + results.affectedRows + ' rows');
    res.redirect("/armar/"+nroExp)
    }
})
}