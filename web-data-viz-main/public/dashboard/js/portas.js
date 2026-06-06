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

function infoCamarasAbertas10() {
    console.log("Função executada");
    fetch(`/portas/infoCamarasAbertas10/${idEmpresa}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let conteudo = "";

            for (let i = 0; i < data.length; i++) {

                conteudo += `
                <div class="linha">
                    <span>Câmara: ${data[i].idCamara}</span>
                    <span class="tempo-vermelho">
                        Tempo: ${data[i].minutos_aberta}min
                    </span>
                </div>
            `;
            }

            document.getElementById("listaCamaras").innerHTML = conteudo;
        })
        .catch(erro => {
            console.log(erro);
        });
}


carregarKpiPortas10()
infoCamarasAbertas10()

setInterval(() => {

    carregarKpiPortas10()
    infoCamarasAbertas10()

}, 5000);
