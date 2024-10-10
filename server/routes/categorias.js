var express = require('express');
var router = express.Router();
//importamos la coneccion a la base de datos
var conexion = require('../database');

/* GET listar codigos. */
router.get('/', function (req, res, next) {

    console.log('Peticion de codigos');

    //creamos la consulta  
    var query = 'SELECT DISTINCT nombre_producto FROM productos;';
    //ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            })
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'Listado de categorias'
            });
        }
    });
});



module.exports = router;
