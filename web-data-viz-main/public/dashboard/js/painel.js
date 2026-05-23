 function carregarKpiPortas10(){
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

    function carregarCamarasCriticas(){
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

    function camarasFaixaIdeal(){
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

    function totalCamarasFrias(){
    fetch("totalCamaras") // busca o total de câmaras cadastradas
    .then(res => res.json()) // converte resposta para JSON
    .then(data => { // recebe o resultado do backend

        console.log("Total camaras", data) // debug da resposta

        // backend retorna array, então acessamos o primeiro objeto
        document.getElementById("totalCamarasIdeal").innerHTML =
        `/${data[0].total_camaras}`;
    })
    .catch(erro => {
        console.log("Erro ao buscar KPI", erro) // erro da API
    })
}

    carregarKpiPortas10();
    carregarCamarasCriticas();
    camarasFaixaIdeal();
    totalCamarasFrias();