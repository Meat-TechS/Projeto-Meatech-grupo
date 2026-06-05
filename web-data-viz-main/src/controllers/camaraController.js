var camaraModel = require("../models/camaraModel");

function listar(req, res) {

    var idEmpresa = req.params.idEmpresa;

    camaraModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);

        })
        .catch(function (erro) {
            console.log("erro ao buscar as câmaras");
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDetalhesCamara(req, res) {

    const idCamara = req.params.idCamara;

    camaraModel.buscarDetalhesCamara(idCamara)
        .then(resultado => {
            res.json(resultado[0]);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function historicoTemperatura(req, res) {

    const idCamara = req.params.idCamara;

    camaraModel.historicoTemperatura(idCamara)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarDetalhesCamara,
    historicoTemperatura
};