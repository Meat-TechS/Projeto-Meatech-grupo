var express = require("express");
var router = express.Router();

var camaraController = require("../controllers/camaraController");

router.get("/listar", function (req, res) {
    camaraController.listar(req, res);
});

module.exports = router;