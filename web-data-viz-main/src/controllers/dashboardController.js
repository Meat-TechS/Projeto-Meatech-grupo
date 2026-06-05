var dashboardModel = require("../models/dashboardModel");

// PORTAS ABERTAS
function contarPortasAbertasMais10Min(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.contarPortasAbertasMais10Min(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).send('Erro ao buscar KPI portas');
    });
}

// CÂMARAS CRÍTICAS
function contarCamarasCriticas(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.contarCamarasCriticas(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).send('Erro ao buscar KPI Câmara críticas');
    });
}

// CÂMARAS IDEAL
function camarasIdeal(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.camarasIdeal(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).send("Erro ao buscar KPI Câmara faixa ideal");
    });
}

// TOTAL CÂMARAS
function totalCamaras(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.totalCamaras(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).send("Erro ao buscar o total de Câmaras");
    });
}

// PORTA IDEAL
function portaIdeal(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.portaIdeal(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.log(erro);
      res.status(500).send("Erro ao buscar o total de portas");
    });
}

// TEMPERATURAS
function buscarTemperaturasCamaras(req, res) {

  var idEmpresa = req.params.idEmpresa;

  dashboardModel.buscarTemperaturasCamaras(idEmpresa)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
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
  buscarTemperaturasCamaras
}