const idEmpresa = sessionStorage.FK_EMPRESA;

function listarCamaras() {
    fetch(`/camaras/listar/${idEmpresa}`)
        .then(function (resposta) {
            return resposta.json();
        }).then(function (camaras) {

            let container = document.getElementById('kpisContainer');

            container.innerHTML = ''

            let totalAlerta = 0;
            let totalSeguro = 0;
            let totalCritico = 0;

            for (let i = 0; i < camaras.length; i++) {
                let camara = camaras[i];

                if (camara.temperatura < 0 || camara.temperatura > 7) {
                    totalCritico++
                    container.innerHTML += `
                <div class="kpi-camara">
                    <div class="kpi-header">
                 <h5>${camara.identificacao}</h5>
                <img src="./image/cameras.png">
                 </div>

                <div class="kpi-main">
                <h2>${Number(camara.temperatura).toFixed(1)}º C</h2>

                <div class="status-div">
                <p class="status">Critico</p>
                </div>

            <a style="cursor: pointer;" onclick="abrirCamara(${camara.idCamara})">
                Informações da câmara
            </a>
                </div>
            </div>`;
        } else if (camara.temperatura > 4 && camara.temperatura <= 7){
                    totalAlerta++
                    container.innerHTML += `
                <div class="kpi-camara">
                    <div class="kpi-header">
                 <h5>${camara.identificacao}</h5>
                <img src="./image/cameras.png">
                 </div>

                <div class="kpi-main">
                <h2>${Number(camara.temperatura).toFixed(1)}º C</h2>

                <div class="status-divA">
                <p class="statusalert">Alerta</p>
                </div>

            <a style="cursor: pointer;" onclick="abrirCamara(${camara.idCamara})">
                Informações da câmara
            </a>
                </div>
            </div>`;

            } else {
                    totalSeguro++
                    container.innerHTML += `
                <div class="kpi-camara">
                    <div class="kpi-header">
                <h5>${camara.identificacao}</h5>
               <img src="./image/cameras.png">
                </div>

             <div class="kpi-main">
            <h2>${Number(camara.temperatura).toFixed(1)}º C</h2>
            <div>
                <p>Seguro</p>
            </div>

            <a style="cursor: pointer;" onclick="abrirCamara(${camara.idCamara})">
                Informações da câmara
            </a>
        </div>
    </div>`;
                }
            }
            document.getElementById('totalCamaras').innerHTML = camaras.length
            document.getElementById('alerta').innerHTML = totalAlerta;
            document.getElementById('seguro').innerHTML = totalSeguro;
            document.getElementById('critico').innerHTML = totalCritico;
        })
        .catch(function (erro) {
    console.error("ERRO COMPLETO:", erro);
});
}

function abrirCamara(idCamara) {
    localStorage.ID_CAMARA = idCamara;

    window.location = "./infocamaras.html";
}

listarCamaras()