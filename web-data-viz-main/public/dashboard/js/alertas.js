let alertasAtivos = [];

// Adicionamos o fkRegistro para ele passear pelo código até salvar no banco
function mostrarAlertaUnico(idAlerta, titulo, mensagem, fkRegistro) {
    
    if (alertasAtivos.includes(idAlerta)) {
        return;
    }

    alertasAtivos.push(idAlerta);
    criarAlerta(idAlerta, titulo, mensagem, fkRegistro);
}

function criarAlerta(idAlerta, titulo, mensagem, fkRegistro) {
    const container = document.getElementById("containerAlertas");
    if (!container) return; // Evita erros se a página atual não tiver o container

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

    salvarHistorico({ titulo, mensagem, fkRegistro });

    // Espera 10 segundos para sumir com o pop-up da tela e salvar no banco
    setTimeout(() => {
        removerAlerta(idAlerta);
    }, 10000);
}

function removerAlerta(idAlerta) {
    alertasAtivos = alertasAtivos.filter(item => item !== idAlerta);
    const alerta = document.querySelector(`[data-id='${idAlerta}']`);
    
    if (alerta) {
        alerta.remove();
    }
}