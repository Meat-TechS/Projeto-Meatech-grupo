var database = require("../database/config");

function salvarAlerta(tipoAlerta, descricao, fkRegistro) {

    const fkValidado = (
        fkRegistro === undefined || 
        fkRegistro === null || 
        fkRegistro == 0 || 
        fkRegistro == 'undefined') 
        ? "NULL" 
        : fkRegistro;
    
    if (fkValidado === "NULL") {
        const instrucaoSql = `
            INSERT INTO Alerta (tipoAlerta, descricao, dataHora, fkRegistro) 
            VALUES ('${tipoAlerta}', '${descricao}', NOW(), NULL);
        `;
        console.log("Executando SQL Salvar Alerta (Sem FK): \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    const instrucaoSql = `
        INSERT INTO Alerta (tipoAlerta, descricao, dataHora, fkRegistro)
        SELECT '${tipoAlerta}', '${descricao}', NOW(), ${fkValidado}
        WHERE NOT EXISTS (
            SELECT 1 FROM Alerta WHERE fkRegistro = ${fkValidado}
        );
    `;
    
    console.log("Executando SQL Salvar Alerta Preventivo: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistorico(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            a.tipoAlerta, 
            a.descricao, 
            DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') AS data 
        FROM Alerta a
        LEFT JOIN registro r ON a.fkRegistro = r.idRegistro
        LEFT JOIN sensor s ON r.fkSensor = s.idSensor
        LEFT JOIN camarafria c ON s.fkCamara = c.idCamara
        
        WHERE (c.fkEmpresa = ${idEmpresa} OR a.fkRegistro IS NULL)
          AND DATE(a.dataHora) = CURDATE()
        
        ORDER BY a.idAlerta DESC;
    `;
    console.log("Executando SQL Buscar Histórico (Apenas Hoje): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarAlerta,
    buscarHistorico
};