var portasModel = require("../models/portasModel")

function infoCamarasAbertas10(req, res){
    portasModel.infoCamarasAbertas10()
    .then(resultado => {
        res.json(resultado)
    })
    .catch(erro => {
        console.log(erro)
        res.status(500).send("Erro ao buscar dados")
    })
}