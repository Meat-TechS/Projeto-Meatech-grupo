let alertasAtivos = JSON.parse(sessionStorage.getItem("alertasAtivos")) || [];

function atualizarMemoriaAlertas() {
    sessionStorage.setItem("alertasAtivos", JSON.stringify(alertasAtivos));
}

function mostrarAlertaUnico(idAlerta, titulo, mensagem, fkRegistro) {
    
    if (alertasAtivos.includes(idAlerta)) {
        return; 
    }

    alertasAtivos.push(idAlerta);
    atualizarMemoriaAlertas(); 
    
    criarAlerta(idAlerta, titulo, mensagem, fkRegistro);
}

function criarAlerta(idAlerta, titulo, mensagem, fkRegistro) {
    const container = document.getElementById("containerAlertas");
    if (!container) return; 

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

    setTimeout(() => {
        const elementoAlerta = document.querySelector(`[data-id='${idAlerta}']`);
        if (elementoAlerta) {
            elementoAlerta.remove(); 
        }
    }, 10000);
}

function limparEstadoAlerta(idAlerta) {
    alertasAtivos = alertasAtivos.filter(item => item !== idAlerta);
    atualizarMemoriaAlertas();
}