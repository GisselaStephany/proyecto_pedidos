var express = require('express');
var router = express.Router();
//importamos la coneccion a la base de datos
var conexion = require('../database');

/* GET listar codigos. */
router.get('/', function (req, res, next) {

    console.log('Peticion de codigos');

    //creamos la consulta  
    var query = 'SELECT * FROM productos;';
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
                message: 'Listado de productos'
            });
        }
    });
});


//postear
router.post('/', function (req, res, next) {

    const { codigo, nombre_producto, descripcion, imagen, estado, vendedor_id } = req.body;

    var query = `INSERT INTO productos (codigo, nombre_producto, descripcion, imagen, estado, vendedor_id) 
                  VALUES ("${codigo}", "${nombre_producto}", "${descripcion}", "${imagen}", "${estado}", "${vendedor_id}");`;

    //ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            })
        } else {
            console.log(results.insertId);
            res.status(200).send({
                data: results.insertId,
                message: 'Producto registrado exitosamente'
            })
        }
    });
});


//PUT actualizar productos (updated_at = CURRENT_TIMESTAMP())

router.put('/:id', function (req, res, next) {
    const { codigo, nombre_producto, descripcion, imagen, estado, vendedor_id } = req.body;

    var query = `UPDATE productos SET 
                    codigo = "${codigo}", 
                    nombre_producto = "${nombre_producto}", 
                    descripcion = "${descripcion}", 
                    imagen = "${imagen}", 
                    estado = "${estado}", 
                    vendedor_id = "${vendedor_id}" 
                WHERE id = ${req.params.id};`;

    // Ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'Producto actualizado exitosamente'
            });
        }
    });
});

//DELETE eliminar producto 
router.delete('/delete/:id', function (req, res, next) {

    //creamos la consulta
    var query = `DELETE FROM productos WHERE id = ${req.params.id};`;

    //ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            });
        } else {
            console.log(req.params.id);
            res.status(200).send({
                data: req.params.id,
                message: 'Producto eliminado exitosamente'
            });
        }
    });

});

// GET Cambia el estado
router.put('/estado/:id', function (req, res, next) {
    const id = req.params.id;
    const nuevoEstado = req.body.estado;

    var query = 'UPDATE productos SET estado = ? WHERE id = ?;';

    // ejecutamos la consulta con parámetros
    conexion.query(query, [nuevoEstado, id], function (error, results, fields) {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send({
                error: 'Error al realizar la petición',
                details: error
            });
        }
        res.status(200).send({
            data: results,
            message: 'Estado actualizado correctamente'
        });
    });
});

    
// Obtener estado de un producto específico
router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    // Creamos la consulta para obtener el producto por ID
    var query = 'SELECT * FROM productos WHERE id = ?;';
    
    // Ejecutamos la consulta
    conexion.query(query, [id], function (error, results, fields) {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send({
                error: 'Error al realizar la petición',
                details: error
            });
        } 

        if (results.length === 0) {
            return res.status(404).send({
                message: 'Producto no encontrado'
            });
        }
        
        // Si el producto existe, lo enviamos como respuesta
        res.status(200).send({
            data: results[0],  // Solo enviamos el primer resultado
            message: 'Producto encontrado'
        });
    });
});


module.exports = router;
