var idCamara = localStorage.ID_CAMARA;

function infoCamaras(){

const pSituacao = document.getElementById("situacao");
const pTempAtual = document.getElementById("tempeAtual");
const pTempMinima = document.getElementById("tempMinima");
const pTempMaxima = document.getElementById("tempMaxima");
const pQtdAberturas = document.getElementById("qtdAberturas");


fetch(`/camaras/detalhes/${idCamara}`)
.then(resposta => resposta.json())
.then(dados => {
  console.log(dados)

    let textoSituacao = '';

    if (dados.temperaturaAtual >= 0 && dados.temperaturaAtual <= 4) {
        textoSituacao = 'SEGURO';
        pSituacao.style.color = 'green';

    } else if (dados.temperaturaAtual > 4 && dados.temperaturaAtual <= 7) {
        textoSituacao = 'ALERTA';
        pSituacao.style.color = 'orange';

    } else {
        textoSituacao = 'CRÍTICO';
        pSituacao.style.color = 'red';
    }

    pSituacao.innerHTML = textoSituacao;

    pTempAtual.innerHTML =
        `${Number(dados.temperaturaAtual).toFixed(1)}°C`;

    pTempMinima.innerHTML =
        `${Number(dados.temperaturaMinima).toFixed(1)}°C`;

    pTempMaxima.innerHTML =
        `${Number(dados.temperaturaMaxima).toFixed(1)}°C`;

    pQtdAberturas.innerHTML =
        `${dados.quantidadeAberturas} vezes`;
});
}

let graficoTemperatura;

function criarGrafico() {

  const idCamara = localStorage.ID_CAMARA;

  fetch(`/camaras/historico/${idCamara}`)
    .then(res => res.json())
    .then(dados => {

      dados.reverse();

      let labels = [];
      let temperaturas = [];

      for (let i = 0; i < dados.length; i++) {
        labels.push(dados[i].hora);
        temperaturas.push(dados[i].temperatura);
      }

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Temperatura da Câmara",
            data: temperaturas,
            borderColor: "#000000",
            backgroundColor: "#000000",
            tension: 0.3,
            fill: false,
            pointRadius: 3
          }
        ]
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false
            },

            annotation: {
              annotations: {
                faixaIdeal: {
                  type: "box",
                  yMin: 0,
                  yMax: 4,
                  backgroundColor: "rgba(0, 255, 0, 0.1)",
                  borderWidth: 0
                }
              }
            }
          },

          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10
              }
            },

            y: {
              min: -4,
              max: 8,
              ticks: {
                callback: function (value) {
                  return value + "°C";
                },
                stepSize: 2
              }
            }
          }
        }
      };

      if (graficoTemperatura) {
        graficoTemperatura.destroy();
      }

      graficoTemperatura = new Chart(
        document.getElementById("temperaturaAtual"),
        config
      );

    })
    .catch(erro => console.log(erro));
}


criarGrafico();
infoCamaras();

setInterval(() => {
  criarGrafico();
  infoCamaras();
}, 10000)

