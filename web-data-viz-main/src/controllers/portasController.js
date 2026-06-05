var portasModel = require("../models/portasModel")

function infoCamarasAbertas10(req, res){

    var idEmpresa = req.params.idEmpresa;
    
     console.log("Entrou na rota");
    portasModel.infoCamarasAbertas10(idEmpresa)
    .then(resultado => {
        console.log(resultado)
        res.json(resultado)
    })
    .catch(erro => {
        console.log(erro)
        res.status(500).send("Erro ao buscar dados")
    })
}

module.exports = {
    infoCamarasAbertas10
}