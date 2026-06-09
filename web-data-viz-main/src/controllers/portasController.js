var portasModel = require("../models/portasModel");

function infoCamarasAbertas10(req, res) {
  var idEmpresa = req.params.idEmpresa;
  console.log("Entrou na rota");

  portasModel
    .infoCamarasAbertas10(idEmpresa)
    .then((resultado) => {
      let camarasAbertas = [];

      for (let i = 0; i < resultado.length; i++) {
        const agora = new Date();
        const dataRegistro = new Date(resultado[i].dtHora);

        const diferencaMinutos = Math.floor((agora - dataRegistro) / 1000 / 60);

        if (diferencaMinutos > 10) {
          resultado[i].minutos_aberta = diferencaMinutos;

          camarasAbertas.push(resultado[i]);
        }
      }

      res.json(camarasAbertas);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar dados");
    });
}

module.exports = {
  infoCamarasAbertas10,
};
