
function salvarHistorico(dadosAlerta) {
  const novoAlerta = {
    tipoAlerta: dadosAlerta.titulo, 
    descricao: dadosAlerta.mensagem, 
    fkRegistro: dadosAlerta.fkRegistro, 
  };

  console.log(novoAlerta);

  fetch("/alertas/salvarAlerta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoAlerta),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao salvar alerta no servidor");
      console.log("Alerta salvo com sucesso no banco de dados!");
    })
    .catch((erro) => console.error("Erro na requisição do histórico:", erro));
}


function carregarHistoricoDoServidor() {
  const container = document.getElementById("listaAlertas");
  
  if (!container) return;

  const idEmpresa = sessionStorage.FK_EMPRESA;

  if (!idEmpresa) {
    container.innerHTML = `<p class="vazio">Erro: Sessão expirada. Faça login novamente.</p>`;
    return;
  }

  fetch(`/alertas/buscarHistorico/${idEmpresa}`)
    .then((res) => res.json())
    .then((historico) => {
      container.innerHTML = "";

      if (historico.length === 0) {
        container.innerHTML = `<p class="vazio">Nenhum alerta registrado até o momento.</p>`;
        return;
      }

      historico.forEach((alerta) => {
        const horaFormatada = new Date(alerta.dataHora).toLocaleTimeString(
          "pt-BR",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        );
        container.innerHTML += `
                    <div class="alerta">
                        <h3>⚠️ ${alerta.tipoAlerta}</h3>
                        <p>${alerta.descricao}</p>
                        <div class="data">🕒 ${horaFormatada}</div>
                    </div>
                `;
      });
    })
    .catch((erro) => {
      console.error("Erro ao carregar histórico:", erro);
      container.innerHTML = `<p class="vazio" style="color: red;">Não foi possível carregar os dados do histórico.</p>`;
    });
}

window.addEventListener("DOMContentLoaded", carregarHistoricoDoServidor);
