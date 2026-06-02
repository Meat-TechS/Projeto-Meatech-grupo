function listarCamaras() {
    fetch('/camaras/listar')
        .then(function (resposta) {
            return resposta.json();
        }).then(function (camaras) {

            let container = document.getElementById('kpisContainer');

            container.innerHTML = ''

            let totalAlerta = 0;
            let totalSeguro = 0;
            for (let i = 0; i < camaras.length; i++) {
                let camara = camaras[i];

                if (camara.temperatura < 0 || camara.temperatura > 4) {
                    totalAlerta++
                    container.innerHTML += `
                <div class="kpi-camara">
                    <div class="kpi-header">
                 <h5>${camara.identificacao}</h5>
                <img src="./image/cameras.png">
                 </div>

                <div class="kpi-main">
                <h2>${camara.temperatura}º C</h2>

                <div class="status-div">
                <p class="status">Alerta</p>
                </div>

            <a href="./infocamaras.html?id=${camara.idCamara}">
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
            <h2>${camara.temperatura}º C</h2>
            <div>
                <p>Seguro</p>
            </div>

            <a href="./infocamaras.html?id=${camara.idCamara}">
                Informações da câmara
            </a>
        </div>
    </div>`;
                }
            }
            document.getElementById('totalCamaras').innerHTML = camaras.length
            document.getElementById('alerta').innerHTML = totalAlerta;
            document.getElementById('seguro').innerHTML = totalSeguro;
        })
        .catch(function (erro) {
            console.log('erro ao listar camaras');
        })
}

listarCamaras()