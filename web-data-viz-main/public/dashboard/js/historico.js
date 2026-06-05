// 1. FUNÇÃO QUE COLOGA O ALERTA NO BANCO (Chamada automaticamente pelo alertas.js)
function salvarHistorico(dadosAlerta) {

    const novoAlerta = {
        tipoAlerta: dadosAlerta.titulo,    // Ajustado para bater com a coluna tipoAlerta do seu banco
        descricao: dadosAlerta.mensagem,   // Ajustado para bater com a coluna descricao do seu banco
        fkRegistro: dadosAlerta.fkRegistro // Recebe o id do registro que veio lá do painel.js
    };

    console.log(novoAlerta);

    // Mudamos a rota de '/dashboard/salvarAlerta' para '/alertas/salvarAlerta' para bater com a rota nova que criamos
    fetch("/alertas/salvarAlerta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoAlerta)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar alerta no servidor");
        console.log("Alerta salvo com sucesso no banco de dados!");
    })
    .catch(erro => console.error("Erro na requisição do histórico:", erro));
}

// 2. FUNÇÃO QUE BUSCA DO BANCO E MOSTRA NA TELA (Roda ao abrir a página historico.html)
function carregarHistoricoDoServidor() {
    const container = document.getElementById("listaAlertas");
    
    // Se o HTML atual não tiver o container 'listaAlertas', significa que o usuário
    // está na dashboard e não na tela de histórico, então a função para aqui sem dar erro.
    if (!container) return; 

    const idEmpresa = sessionStorage.FK_EMPRESA;

    if (!idEmpresa) {
        container.innerHTML = `<p class="vazio">Erro: Sessão expirada. Faça login novamente.</p>`;
        return;
    }

    // Faz o GET trazendo o ID da empresa logada
    fetch(`/alertas/buscarHistorico/${idEmpresa}`)
        .then(res => res.json())
        .then(historico => {
            container.innerHTML = "";

            if (historico.length === 0) {
                container.innerHTML = `<p class="vazio">Nenhum alerta registrado até o momento.</p>`;
                return;
            }

            // O seu select no model já traz ordenado por data, agora é só desenhar na tela
            historico.forEach(alerta => {
                container.innerHTML += `
                    <div class="alerta">
                        <h3>⚠️ ${alerta.tipoAlerta}</h3>
                        <p>${alerta.descricao}</p>
                        <div class="data">🕒 ${alerta.data}</div>
                    </div>
                `;
            });
        })
        .catch(erro => {
            console.error("Erro ao carregar histórico:", erro);
            container.innerHTML = `<p class="vazio" style="color: red;">Não foi possível carregar os dados do histórico.</p>`;
        });
}

// 3. DISPARADOR AUTOMÁTICO
// Garante que o histórico seja carregado assim que a estrutura da página HTML estiver pronta
window.addEventListener("DOMContentLoaded", carregarHistoricoDoServidor);