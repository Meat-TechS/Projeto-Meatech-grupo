var dashboardModel = require("../models/dashboardModel");

function contarPortasAbertasMais10Min(req, res){
  dashboardModel.contarPortasAbertasMais10Min()
  .then(resultado => {
    res.json(resultado);
  })
  .catch(erro => {
    console.log(erro);
    res.status(500).send('Erro ao buscar KPI portas');
  })
}

function contarCamarasCriticas(req, res){
  dashboardModel.contarCamarasCriticas()
  .then(resultado => {
    res.json(resultado);
  })
  .catch(erro => {
    console.log(erro);
    res.status(500).send('Erro ao buscar KPI Câmara criticas');
  })
}

function camarasIdeal(req, res){
  dashboardModel.camarasIdeal()
  .then(resultado => {
    res.json(resultado)
  })
  .catch(erro => {
    console.log(erro);
    res.status(500).send("Erro ao buscar KPI Câmara faixa ideal")
  })
}

function totalCamaras(req, res){
  dashboardModel.totalCamaras()
  .then(resultado => {
    res.json(resultado)
  }) 
  .catch(erro => {
    console.log(erro)
    res.status(500).send("Erro ao buscar o total de Câmaras")
  })
}


module.exports = {
  contarPortasAbertasMais10Min,
  contarCamarasCriticas,
  camarasIdeal,
  totalCamaras
}
