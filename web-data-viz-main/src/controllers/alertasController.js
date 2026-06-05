var alertasModel = require("../models/alertasModel");

function salvarAlerta(req, res) {
    var tipoAlerta = req.body.tipoAlerta;
    var descricao = req.body.descricao;
    var fkRegistro = req.body.fkRegistro; // Agora precisamos do ID do registro

    if (tipoAlerta == undefined || descricao == undefined || fkRegistro == undefined) {
        res.status(400).send("Dados incompletos para a tabela Alerta.");
    } else {
        alertasModel.salvarAlerta(tipoAlerta, descricao, fkRegistro)
        .then(resultado => {
            res.status(201).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).send("Erro ao salvar o alerta.");
        });
    }
}

function buscarHistorico(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido.");
    } else {
        alertasModel.buscarHistorico(idEmpresa)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).send("Erro ao buscar histórico.");
        });
    }
}

module.exports = {
    salvarAlerta,
    buscarHistorico
};