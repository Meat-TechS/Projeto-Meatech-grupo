let alertasAtivos = JSON.parse(sessionStorage.getItem("alertasAtivos")) || [];

function atualizarMemoriaAlertas() {
    sessionStorage.setItem("alertasAtivos", JSON.stringify(alertasAtivos));
}

function mostrarAlertaUnico(idAlerta, titulo, mensagem, fkRegistro) {
    
    if (alertasAtivos.includes(idAlerta)) {
        return; // Se já foi disparado antes (mesmo em outra sessão de página), não faz nada
    }

    alertasAtivos.push(idAlerta);
    atualizarMemoriaAlertas(); // Grava na memória do navegador que este ID já foi alertado
    
    criarAlerta(idAlerta, titulo, mensagem, fkRegistro);
}

function criarAlerta(idAlerta, titulo, mensagem, fkRegistro) {
    const container = document.getElementById("containerAlertas");
    if (!container) return; // Evita erros se a página atual não tiver o container

    if (document.querySelector(`[data-id='${idAlerta}']`)) return

    salvarHistorico({ titulo, mensagem, fkRegistro });

    const alerta = document.createElement("div");
    alerta.classList.add("alerta");
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

    // Espera 10 segundos para sumir com o pop-up da tela e salvar no banco
    setTimeout(() => {
        const elementoAlerta = document.querySelector(`[data-id='${idAlerta}']`);
        if (elementoAlerta) {
            elementoAlerta.remove(); // Remove apenas o HTML da tela
        }
    }, 10000);
}

function limparEstadoAlerta(idAlerta) {
    alertasAtivos = alertasAtivos.filter(item => item !== idAlerta);
    atualizarMemoriaAlertas(); // Atualiza a memória do navegador sem o ID removido
}