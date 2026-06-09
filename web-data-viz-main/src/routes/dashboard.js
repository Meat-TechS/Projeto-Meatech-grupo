var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/contarPortasAbertasMais10Min/:idEmpresa", function(req, res){
    dashboardController.contarPortasAbertasMais10Min(req, res);
});

router.get("/contarCamarasCriticas/:idEmpresa", function(req, res){
    dashboardController.contarCamarasCriticas(req, res);
});

router.get("/camarasIdeal/:idEmpresa", function(req, res){
    dashboardController.camarasIdeal(req, res);
});

router.get("/totalCamaras/:idEmpresa", function(req, res) {
    dashboardController.totalCamaras(req, res);
});

router.get("/portaIdeal/:idEmpresa", function(req, res){
    dashboardController.portaIdeal(req, res);
});

router.get("/temperaturas/:idEmpresa", function (req, res) {
    dashboardController.buscarTemperaturasCamaras(req, res);
});

module.exports = router;