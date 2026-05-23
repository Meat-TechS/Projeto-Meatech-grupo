function carregarKpiPortas10() {
    fetch("contarPortasAbertasMais10Min")
        .then(res => res.json())
        .then(data => {
            console.log("KPI portas:", data);

            document.getElementById("kpiPortas").innerHTML = data[0].portas_abertas_10min;
        })
        .catch(erro => {
            console.log("Erro ao carregar KPI", erro)
        })
}

function carregarCamarasCriticas() {
    fetch("contarCamarasCriticas")
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
    fetch("camarasIdeal")
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

    fetch("totalCamaras") // chama a rota no backend
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
    fetch("portaIdeal")
        .then(res => res.json())
        .then(data => {

            console.log("Total de portas", data)

            document.getElementById("portaIdeal").innerHTML =
                `${data[0].portas_ideais}`;
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI", erro)

        })
}

// function carregarGraficoTemperaturas() {

//     fetch("/dashboard/temperaturas")
//         .then(res => res.json())
//         .then(dados => {

//             const labels = [];
//             const temperaturas = [];
//             const cores = [];

//             dados.forEach(item => {

//                 labels.push(item.identificacao);
//                 temperaturas.push(item.registroTemp);

//                 if (item.registroTemp >= 0 && item.registroTemp <= 4) {
//                     cores.push('#006400'); // verde (ok)
//                 } else {
//                     cores.push('#8B0000'); // vermelho (crítico)
//                 }
//             });

//             const data2 = {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Temperatura',
//                     data: temperaturas,
//                     backgroundColor: cores,
//                     borderColor: '#000000',
//                     tension: 0.3,
//                     fill: false,
//                     pointRadius: 4,
//                     pointHoverRadius: 5
//                 }]
//             };

//             const config2 = {
//                 type: 'bar',
//                 data: data2,
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                         legend: {
//                             display: false
//                         }
//                     },
//                     scales: {
//                         y: {
//                             min: -4,
//                             max: 8,
//                             ticks: {
//                                 callback: function (value) {
//                                     return value + '°C';
//                                 },
//                                 stepSize: 2
//                             }
//                         }
//                     }
//                 }
//             };

//             const ctx = document.getElementById('tempAtual').getContext('2d');

//             new Chart(ctx, config2);
//         })
//         .catch(erro => {
//             console.log("Erro no gráfico", erro);
//         });
// }

function buscarGraficoTemperaturas() {
    fetch("/dashboard/temperaturas")
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
                : "#8B0000"
        );
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

