var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');
var app = express();

//RUTAS
var indexRouter = require('./routes/index');
var altaRuta = require('./routes/alta');
var modifRuta = require('./routes/modificar')
var armarRuta = require('./routes/armar')
var verRuta = require('./routes/ver');
var eliminarRuta = require('./routes/eliminar')
var loginRuta = require('./routes/login');
var logoutRuta = require('./routes/logout');
var feedbackRuta = require('./routes/feedback')

//AJAX
var buscarRamo = require('./public/javascripts/buscarRamos')
var buscarEmpresa = require('./public/javascripts/buscarEmpresa')
var crearUsuario = require('./public/javascripts/crearUsuario')
var agregarRuta = require('./public/javascripts/agregarEmpresa')
var eliminarRuta = require('./public/javascripts/eliminarEmpresa')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

//RUTAS
app.use('/', indexRouter);
app.use('/alta', altaRuta)
app.use('/modificar', modifRuta)
app.use('/armar', armarRuta)
app.use('/ver', verRuta);
app.use('/feedback', feedbackRuta);
app.use('/login', loginRuta);
app.use('/logout', logoutRuta)

//AJAX
app.post('/buscarRamo', buscarRamo )
app.post('/buscarEmpresas', buscarEmpresa)
app.post('/crearUsuario', crearUsuario)
app.post('/agregar', agregarRuta)
app.get('/eliminar/:nroExp/:id', eliminarRuta)

app.get('/errorlog', function (req, res) {res.render('errorlog')});

// ERRORES
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
