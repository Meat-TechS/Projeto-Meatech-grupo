var dashboardModel = require("../models/dashboardModel");

function contarPortasAbertasMais10Min(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .contarPortasAbertasMais10Min(idEmpresa)
    .then((resultado) => {
      let quantidade = 0;

      for (let i = 0; i < resultado.length; i++) {
        const dataRegistro = new Date(resultado[i].dtHora);
        const agora = new Date();

        const diferencaMinutos = (agora - dataRegistro) / 1000 / 60;

        if (diferencaMinutos > 10) {
          quantidade++;
        }
      }

      res.json([{ portas_abertas_10min: quantidade }]);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar KPI portas");
    });
}

function contarCamarasCriticas(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .contarCamarasCriticas(idEmpresa)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar KPI Câmara críticas");
    });
}

function camarasIdeal(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .camarasIdeal(idEmpresa)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar KPI Câmara faixa ideal");
    });
}

function totalCamaras(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .totalCamaras(idEmpresa)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar o total de Câmaras");
    });
}

function portaIdeal(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .portaIdeal(idEmpresa)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar o total de portas");
    });
}

function buscarTemperaturasCamaras(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel
    .buscarTemperaturasCamaras(idEmpresa)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send("Erro ao buscar temperaturas");
    });
}

module.exports = {
  contarPortasAbertasMais10Min,
  contarCamarasCriticas,
  camarasIdeal,
  totalCamaras,
  portaIdeal,
  buscarTemperaturasCamaras,
};
