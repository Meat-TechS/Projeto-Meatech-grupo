var express = require("express");
var router = express.Router();

var portasController = require("../controllers/portasController");


router.get("/infoCamarasAbertas10", function(req, res) {
    portasController.infoCamarasAbertas10(req, res)
})

module.exports = router;