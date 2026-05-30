
function carregarKpiPortas10() {
    fetch("contarPortasAbertasMais10Min")
        .then(res => res.json())
        .then(data => {
            console.log("KPI portas:", data);

            document.getElementById("totalPortas").innerHTML = data[0].portas_abertas_10min;
        })
        .catch(erro => {
            console.log("Erro ao carregar KPI", erro)
        })
}

function infoCamarasAbertas10() {
    console.log("Função executada");
    fetch("/portas/infoCamarasAbertas10")
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
