var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/contarPortasAbertasMais10Min", function(req, res){
    dashboardController.contarPortasAbertasMais10Min(req, res)
})

router.get("/contarCamarasCriticas", function(req, res){
    dashboardController.contarCamarasCriticas(req, res)
})

router.get("/camarasIdeal", function(req, res){
    dashboardController.camarasIdeal(req, res)
})

router.get("/totalCamaras", function(req, res){
    dashboardController.totalCamaras(req, res)
})

router.get("/portaIdeal", function(req, res){
    dashboardController.portaIdeal(req, res)
})

router.get("/temperaturas", function (req, res) {
    dashboardController.buscarTemperaturasCamaras(req, res);
});

module.exports = router;