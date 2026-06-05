var express = require("express");
var router = express.Router();

var camaraController = require("../controllers/camaraController");

router.get("/listar/:idEmpresa", function (req, res) {
    camaraController.listar(req, res);
});

router.get('/detalhes/:idCamara', function(req, res){
    camaraController.buscarDetalhesCamara(req, res);
});

router.get('/historico/:idCamara', function(req, res){
    camaraController.historicoTemperatura(req, res);
});

module.exports = router;