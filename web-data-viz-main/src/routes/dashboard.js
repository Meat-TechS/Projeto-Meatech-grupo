var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// PORTAS ABERTAS
router.get("/contarPortasAbertasMais10Min/:idEmpresa", function(req, res){
    dashboardController.contarPortasAbertasMais10Min(req, res);
});

// CÂMARAS CRÍTICAS
router.get("/contarCamarasCriticas/:idEmpresa", function(req, res){
    dashboardController.contarCamarasCriticas(req, res);
});

// CÂMARAS IDEAL
router.get("/camarasIdeal/:idEmpresa", function(req, res){
    dashboardController.camarasIdeal(req, res);
});

// TOTAL CÂMARAS
router.get("/totalCamaras/:idEmpresa", function(req, res) {
    dashboardController.totalCamaras(req, res);
});

// PORTA IDEAL
router.get("/portaIdeal/:idEmpresa", function(req, res){
    dashboardController.portaIdeal(req, res);
});

// TEMPERATURAS
router.get("/temperaturas/:idEmpresa", function (req, res) {
    dashboardController.buscarTemperaturasCamaras(req, res);
});

module.exports = router;