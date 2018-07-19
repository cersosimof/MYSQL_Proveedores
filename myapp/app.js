var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// var cors = require('cors');

var app = express();

//JS QUE NECESITA LEVANTAR.
var indexRouter = require('./routes/index');
var verRuta = require('./routes/ver');
var logoutRuta = require('./routes/logout');
var eliminarRuta = require('./routes/eliminar.js')
var altaRuta = require('./routes/alta');
var loginRuta = require('./routes/login');
var verRamo = require('./routes/verRamo');
var contactoRuta = require('./routes/contacto');
var modifRuta = require('./routes/modificar')
var buscarRamo = require('./public/javascripts/buscarRamos.js')
var buscarEmpresa = require('./public/javascripts/buscarEmpresa.js')
var crearUsuario = require('./public/javascripts/crearUsuario.js')
var armarRuta = require('./routes/armar')
var agregarRuta = require('./public/javascripts/agregarEmpresa.js')
var eliminarRuta = require('./public/javascripts/eliminarEmpresa.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/ver', verRuta);
app.get('/ver/:ramo', verRamo);
app.use('/login', loginRuta);
app.use('/logout', logoutRuta)
app.use('/alta', altaRuta)
app.get('/eliminar/:codigo', eliminarRuta)
app.get('/errorlog', function (req, res) {res.render('errorlog')});
app.use('/contacto', contactoRuta)
app.use('/modificar', modifRuta)
app.post('/buscarRamo', buscarRamo )
app.post('/buscarEmpresas', buscarEmpresa )
app.use('/armar', armarRuta)
app.post('/agregar', agregarRuta)
app.get('/eliminar/:nroExp/:id', eliminarRuta)
app.post('/crearUsuario', crearUsuario)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
