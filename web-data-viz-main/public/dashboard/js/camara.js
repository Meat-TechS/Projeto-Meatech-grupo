function totalCamarasFrias() {

    fetch("totalCamaras") // chama a rota no backend
        .then(res => res.json()) // converte resposta para JSON
        .then(data => { // recebe o resultado do backend

            console.log("Total camaras", data) // debug da resposta

            // backend retorna array, então acessamos o primeiro objeto
            document.getElementById("totalCamaras").innerHTML =
                data[0].total_camaras;

        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro) // erro da API
        })
}

function carregarCamarasCriticas() {
    fetch("contarCamarasCriticas")
        .then(res => res.json())
        .then(data => {

            document.getElementById("alerta").innerHTML = data[0].camaras_criticas;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)
        })
}

function camarasFaixaIdeal() {
    fetch("camarasIdeal")
        .then(res => res.json())
        .then(data => {
            console.log("KPI Faixa Ideal", data);

            document.getElementById("seguro").innerHTML = data[0].camaras_faixa_ideal;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)
        })
}

function listarCamaras() {
    fetch('/camara/listar')
        .then(function (resposta) {
            return resposta.json();
        }).then(function (camaras) {
            let container = document.getElementById('kpisContainer');
            container.innerHTML = ''

            let totalAlerta = 0;
            let totalSeguro = 0;

        for (let i = 0; i < camaras.length; i++) {

    let camara = camaras[i];

    let statusHtml = "";

    if (camara.status == "Alerta") {
        statusHtml = `
            <div class="status-div">
                <p class="status">Alerta</p>
            </div>
        `;
    } else {
        statusHtml = `
            <div>
                <p>Seguro</p>
            </div>
        `;
    }

    container.innerHTML += `
        <div class="kpi-camara">

            <div class="kpi-header">
                <h5>${camara.nome}</h5>
                <img src="./image/cameras.png">
            </div>

            <div class="kpi-main">
                <h2>${camara.temperatura}º C</h2>

                ${statusHtml}

                <a href="./infocamaras.html?id=${camara.idCamara}">
                    Informações da câmara
                </a>

            </div>

        </div>
    `;
}
            document.getElementById('totalCamaras').innerHTML = camaras.length
            document.getElementById('alerta').innerHTML = totalAlerta;
            document.getElementById('seguro').innerHTML = totalSeguro;
        })
        .catch(function (erro){
            console.log('erro ao listar camaras:', erro);
        })
}

totalCamarasFrias()
carregarCamarasCriticas()
camarasFaixaIdeal()