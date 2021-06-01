// BACKEND DE JUEGO

const express = require("express");

const router = express.Router();
//Solo lo utilizamos para utilizar el metodo Rutas

const mysqlConnection = require("../database");

router.post("/api/soluciones", (req, res) => {

   console.log(req.body.tipoJuego);

  if (req.body.tipoJuego == 0) {
    mysqlConnection.query(
        "SELECT * FROM pasatiempo.soluciones WHERE pasatiempo.soluciones.id_juego = 0",
        (err, rows, fields) => {
          if (!err) {
            console.log("SIN ERROR");
            res.json(rows);
          } else {
            console.log(err);
          }
        }
      );
  }
});

// Recogida de un valor
router.get("/:id", (req, res) => {
  const { id } = req.params; // ID de recogida
  mysqlConnection.query(
    "SELECT * FROM pasatiempo.soluciones WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        //res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
