var idCamara = localStorage.ID_CAMARA;

function infoCamaras() {
  let numeroCamara = document.getElementById("numCamara");

  let situacao = document.getElementById("situacao");

  numeroCamara.innerHTML = idCamara;

  fetch("/camaras/listar")
    .then((resposta) => {
      return resposta.json();
    })
    .then((camaras) => {

      for (let i = 0; i < camaras.length; i++) {

        if (camaras[i].idCamara == idCamara) {

          let seguro = camaras[i].temperatura >= 0 && camaras[i].temperatura <= 4

          let alerta = camaras[i].temperatura > 4 && camaras[i].temperatura <= 7

          if (seguro) {
            situacao.innerHTML = 'SEGURO';
             situacao.style.color = 'green';
          } else if (alerta) {
            situacao.innerHTML = "ALERTA";
             situacao.style.color = 'orange';
          } else {
            situacao.innerHTML = "CRÍTICO";
             situacao.style.color = 'red';
          }

          break;
        }
      }
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function criarGrafico() {
  const data2 = {
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    datasets: [
      {
        label: "Câmara 1 - Temperatura",
        data: [
          0, 3, 1, 0, 2, 1, 3, 4, 2, 3.4, 6, 2.9, 3.7, 2.5, 2, 1.5, 2.2, 3, 3,
          2, 2.8, 1, 0, -2,
        ],
        borderColor: "#000000",
        backgroundColor: "#000000",
        tension: 0.3,
        fill: false,
        pointRadius: 4,
      },
    ],
  };

  const config2 = {
    type: "line",
    data: data2,
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            faixaIdeal: {
              type: "box",
              yMin: 0,
              yMax: 4,
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              borderWidth: 0,
              label: {
                enabled: true,
              },
            },
          },
        },
      },

      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          min: -4,
          max: 8,
          ticks: {
            callback: function (value) {
              return value + "°C";
            },
            stepSize: 2,
          },
        },
      },
    },
  };

  let graficoBarras = new Chart(document.getElementById("tempAtual"), config2);
}

criarGrafico();
infoCamaras();
