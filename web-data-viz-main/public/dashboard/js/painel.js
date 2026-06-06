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
                    `${data[0].idRegistro}`
                );
            } else {
                // Se não há mais portas críticas, libera o estado para futuros alertas
                limparEstadoAlerta("porta_aberta");
            }
        })
        .catch(erro => {
            console.log("Erro ao carregar KPI", erro);
        });
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

        const idAlertaFrio = `${item.identificacao}_frio`;
        const idAlertaQuente = `${item.identificacao}_quente`;

        if (item.registroTemp < 0) {
            // Se está crítico (frio), emite o alerta e limpa o estado oposto
            limparEstadoAlerta(idAlertaQuente);
            mostrarAlertaUnico(
                idAlertaFrio,
                "Câmara em temperatura crítica",
                `${item.identificacao} está com ${item.registroTemp}°C`,
                `${item.idRegistro}`
            );
        } else if (item.registroTemp > 7) {
            // Se está crítico (quente), emite o alerta e limpa o estado oposto
            limparEstadoAlerta(idAlertaFrio);
            mostrarAlertaUnico(
                idAlertaQuente,
                "Câmara em temperatura crítica",
                `${item.identificacao} está com ${item.registroTemp}°C`,
                `${item.idRegistro}`
            );
        } else {
            // Se a temperatura está IDEAL, limpa os estados de alerta dessa câmara
            limparEstadoAlerta(idAlertaFrio);
            limparEstadoAlerta(idAlertaQuente);
        }
    });

    graficoTemperatura.data.labels = labels;
    graficoTemperatura.data.datasets[0].data = temperaturas;
    graficoTemperatura.data.datasets[0].backgroundColor = cores;

    graficoTemperatura.update();
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