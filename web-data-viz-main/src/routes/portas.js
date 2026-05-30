var express = require("express");
var router = express.Router();


router.get("/infoCamarasAbertas10", function(req, res) {
    portasController.infoCamarasAbertas10(req, res)
})

module.exports = router;