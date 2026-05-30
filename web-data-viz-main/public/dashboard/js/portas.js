
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



carregarKpiPortas10()