var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.post("/salvarAlerta", function(req, res) {
    alertasController.salvarAlerta(req, res);
});

router.get("/buscarHistorico/:idEmpresa", function(req, res) {
    alertasController.buscarHistorico(req, res);
});

module.exports = router;