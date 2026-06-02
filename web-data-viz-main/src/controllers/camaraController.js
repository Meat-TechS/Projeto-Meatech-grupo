var camaraModel = require("../models/camaraModel");

function listar(req, res) {

    camaraModel.listar()
        .then(function (resultado) {

            res.status(200).json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);
            console.log(
                "Houve um erro ao buscar as câmaras! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar
};