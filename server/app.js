var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var pedidosRouter = require('./routes/pedidos');
var productosRouter = require('./routes/productos');
var categoriasRouter = require('./routes/categorias');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/pedidos', pedidosRouter);
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);


app.get('/protegido', verificarToken, (req, res) => {

    res.status(200).send({
        message: 'Acceso permitido',
        usuario: req.user.usuario
    });
});

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secretkey', (err, user) => {
            if(err) {
                return res.status(403).send({
                    message: 'Token invalido'
                });
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: 'No hay token'
        });
    }
}
module.exports = app;
