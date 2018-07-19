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
    pool.query('SELECT ramo FROM proveeores GROUP BY ramo', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      });
}