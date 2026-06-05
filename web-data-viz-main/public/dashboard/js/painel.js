let graficoTemperatura;

const idEmpresa = sessionStorage.FK_EMPRESA;

function carregarKpiPortas10() {
    fetch(`/dashboard/contarPortasAbertasMais10Min/${idEmpresa}`)
        .then(res => res.json())
        .then(data => {
            console.log("KPI portas:", data);

            document.getElementById("kpiPortas").innerHTML = data[0].portas_abertas_10min;

            if (data[0].portas_abertas_10min > 0) {
                mostrarAlertaUnico(
                    "porta_aberta",
                    "Portas abertas há mais de 10 minutos",
                    `${data[0].portas_abertas_10min} porta(s) em situação crítica`,
                    "alerta"
                );
            }
        })
        .catch(erro => {
            console.log("Erro ao carregar KPI", erro)
        })
}


function carregarCamarasCriticas() {
    fetch(`/dashboard/contarCamarasCriticas/${idEmpresa}`)
        .then(res => res.json())
        .then(data => {
            console.log("KPI camaras", data);

            document.getElementById("kpiCamaras").innerHTML = data[0].camaras_criticas;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)
        })
}

function camarasFaixaIdeal() {
    fetch(`/dashboard/camarasIdeal/${idEmpresa}`)
        .then(res => res.json())
        .then(data => {
            console.log("KPI Faixa Ideal", data);

            document.getElementById("faixaIdeal").innerHTML = data[0].camaras_faixa_ideal;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)
        })
}

function totalCamarasFrias() {

    fetch(`totalCamaras/${idEmpresa}`) // chama a rota no backend
        .then(res => res.json()) // converte resposta para JSON
        .then(data => { // recebe o resultado do backend

            console.log("Total camaras", data) // debug da resposta

            // backend retorna array, então acessamos o primeiro objeto
            document.getElementById("totalCamarasIdeal").innerHTML =
                `/${data[0].total_camaras}`;

            document.getElementById("totalPortasFaixa").innerHTML =
                `/${data[0].total_camaras}`;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro) // erro da API
        })
}

function portaIdeal() {
    fetch(`/dashboard/portaIdeal/${idEmpresa}`)
        .then(res => res.json())
        .then(data => {

            console.log("Total de portas", data)

            document.getElementById("portaIdeal").innerHTML =
                `${data[0].portasIdeais}`;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)

        })
}

function buscarGraficoTemperaturas() {
    fetch(`/dashboard/temperaturas/${idEmpresa}`)
        .then(res => res.json())
        .then(dados => {
            atualizarGraficoTemperaturas(dados);
        })
        .catch(erro => console.log(erro));
}

function atualizarGraficoTemperaturas(dados) {

    const labels = [];
    const temperaturas = [];
    const cores = [];

    dados.forEach(item => {
        labels.push(item.identificacao);
        temperaturas.push(item.registroTemp);

        cores.push(
            item.registroTemp >= 0 && item.registroTemp <= 4
                ? "#006400"
                : item.registroTemp > 4 && item.registroTemp <= 7
                    ? "#FFA500"
                    : "#8B0000"
        );

        if (item.registroTemp < 0) {
            mostrarAlertaUnico(
                `${item.identificacao}_frio`,
                "Câmara em temperatura crítica",
                `${item.identificacao} está com ${item.registroTemp}°C`,
                "perigo"
            );
        } else if (item.registroTemp > 7) {
            mostrarAlertaUnico(
                `${item.identificacao}_quente`,
                "Câmara em temperatura crítica",
                `${item.identificacao} está com ${item.registroTemp}°C`,
                "perigo"
            );
        }

    });

    graficoTemperatura.data.labels = labels;
    graficoTemperatura.data.datasets[0].data = temperaturas;
    graficoTemperatura.data.datasets[0].backgroundColor = cores;

    graficoTemperatura.update();
}

function criarAlerta(idAlerta, titulo, mensagem) {

    const container = document.getElementById("containerAlertas");

    const alerta = document.createElement("div");
    alerta.classList.add("alerta");

    // guarda o ID no próprio elemento (importante pra remover depois)
    alerta.dataset.id = idAlerta;

    alerta.innerHTML = `
        <div class="alerta-info">
            <div class="alerta-texto">
                <h3>${titulo}</h3>
                <p>${mensagem}</p>
            </div>
        </div>
        <div class="alerta-icone">🔔</div>
    `;

    container.appendChild(alerta);
}

function mostrarAlertaUnico(idAlerta, titulo, mensagem) {

    if (alertasAtivos.includes(idAlerta)) {
        return;
    }

    alertasAtivos.push(idAlerta);

    criarAlerta(idAlerta, titulo, mensagem);
}

function removerAlerta(idAlerta) {

    // remove da lista de ativos
    alertasAtivos = alertasAtivos.filter(item => item !== idAlerta);

    // remove da tela
    const alerta = document.querySelector(`[data-id='${idAlerta}']`);

    if (alerta) {
        alerta.remove();
    }
}

function iniciarGrafico() {

    const ctx = document.getElementById("tempAtual").getContext("2d");

    graficoTemperatura = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Temperatura",
                data: [],
                backgroundColor: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

iniciarGrafico();
buscarGraficoTemperaturas();
carregarKpiPortas10();
carregarCamarasCriticas();
camarasFaixaIdeal();
totalCamarasFrias();
portaIdeal();


setInterval(() => {

    carregarKpiPortas10();
    carregarCamarasCriticas();
    camarasFaixaIdeal();
    totalCamarasFrias();
    portaIdeal();
    buscarGraficoTemperaturas();

}, 5000);