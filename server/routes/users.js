var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var conexion = require('../database');
 
router.get('/', function (req, res) {

  var query = 'SELECT * FROM usuarios;';
 
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
 
  const { nombre, correo, telefono, usuario, password, rol, estado } = req.body;
 
  const hashedPassword = await bcrypt.hash(password, 10);
 
  const query = `INSERT INTO usuarios (nombre, correo, telefono, usuario, password, rol, estado)
              VALUES ("${nombre}", "${correo}", "${telefono}", "${usuario}", "${hashedPassword}", "${rol}", "${estado}");`;
 
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
        message: 'Usuario registrado',
      });
    }
  });
});

router.put('/update/:id', async function (req, res, next) {
 
  const { nombre, correo, telefono, usuario, password, rol, estado } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = req.params.id;
  var query = `UPDATE usuarios SET nombre = "${nombre}", correo = "${correo}", telefono= "${telefono}", 
                                    usuario = "${usuario}", password = "${hashedPassword}", rol = "${rol}", 
                                    estado = "${estado}"
                                    WHERE id = ${id};`;

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
        message: 'Usuario registrado',
      });
    }
  });
});
router.delete('/delete/:id', function (req, res, next) {


  var query = `DELETE FROM usuarios WHERE id = ${req.params.id};`;

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
        message: 'Usuario eliminado correctamente'
      });
    }
  });

});

 
module.exports = router;