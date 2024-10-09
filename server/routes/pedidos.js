var express = require('express');
var router = express.Router();
//importamos la conexión a la base de datos
var conexion = require('../database');
router.get('/', function (req, res) {

    var query = 'SELECT * FROM pedidos;';

    conexion.query(query, function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            })
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'Listando usuarios'
            });
        }

    });

});

router.post('/store', async function (req, res, next) {

    const { producto_id, cliente_id, vendedor_id, comentario, estado, fecha_pedido, fecha_entrega, coordenadas, direccion } = req.body;



    const query = `INSERT INTO pedidos (producto_id, cliente_id, vendedor_id, comentario, estado, fecha_pedido, fecha_entrega, coordenadas, direccion)
                VALUES ("${producto_id}", "${cliente_id}", "${vendedor_id}", "${comentario}", "${estado}", CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "${coordenadas}", "${direccion}");`;

    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error en la consulta',
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'Pedido registrado',
            });
        }
    });
});

router.put('/update/:id', function (req, res, next) {
    const { producto_id, cliente_id, vendedor_id, comentario, estado, fecha_pedido, fecha_entrega, coordenadas, direccion } = req.body;
    const id = req.params.id;

    var query = `UPDATE pedidos SET producto_id = "${producto_id}", cliente_id = "${cliente_id}", vendedor_id = "${vendedor_id}",
                                      comentario = "${comentario}", estado = "${estado}", 
                                      coordenadas = "${coordenadas}", direccion = "${direccion}"
                                       WHERE id = ${id};`;

    conexion.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send({
          error: error,
          message: 'Error al realizar la petición'
        })
      } else {
        console.log(results);
        res.status(200).send({
          data: results.insertId,
          message: 'Pedido modificado correctamente'
        });
      }
    });

  });

  router.delete('/delete/:id', function (req, res, next) {


    var query = `DELETE FROM pedidos WHERE id = ${req.params.id};`;

    conexion.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send({
          error: error,
          message: 'Error al realizar la petición'
        });
      } else {
        console.log(req.params.id);
        res.status(200).send({
          data: req.params.id,
          message: 'Pedido eliminado correctamente'
        });
      }
    });

  });

  router.get('/estado/:id', function (req, res, next) {
    const id = req.params.id;
    const nuevoEstado = req.body.estado;

    var query = `UPDATE pedidos SET estado = ${nuevoEstado} WHERE id = ${req.params.id};`;
    conexion.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send({
          error: error,
          message: 'Error al realizar la petición'
        });
      } else {
        res.status(200).send({
          data: results,
          message: 'Estado actualizado correctamente'
        });
      }
    });
  });

//   router.get('/activos', function (req, res, next) {

//     var query = 'SELECT * FROM pedidos WHERE estado = 1 AND stock > 0;';
//     conexion.query(query, function (error, results, fields) {
//       if (error) {
//         console.log(error);
//         res.status(500).send({
//           error: error,
//           message: 'Error al realizar la petición'
//         });
//       } else {
//         console.log(results);
//         res.status(200).send({
//           data: results,
//           message: 'Estado actualizado correctamente'
//         });
//       }
//     });
//   });


module.exports = router;