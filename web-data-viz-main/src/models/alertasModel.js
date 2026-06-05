var database = require("../database/config");

function salvarAlerta(tipoAlerta, descricao, fkRegistro) {
    // Usando exatamente os nomes das suas colunas do print
    const fkValidado = (fkRegistro === undefined || fkRegistro === null || fkRegistro == 0 || fkRegistro == 'undefined') ? "NULL" : fkRegistro;
    const instrucaoSql = `
        INSERT INTO Alerta (tipoAlerta, descricao, dataHora, fkRegistro) 
        VALUES ('${tipoAlerta}', '${descricao}', NOW(), ${fkValidado});
    `;
    console.log("Executando SQL Salvar Alerta: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistorico(idEmpresa) {
    // Fazendo a ponte de relacionamentos do seu banco para filtrar por empresa
    const instrucaoSql = `
            SELECT 
            a.tipoAlerta, 
            a.descricao, 
            DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') AS data 
        FROM alerta a
        JOIN registro r ON a.fkRegistro = r.idRegistro
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN camarafria c ON s.fkCamara = c.idCamara
        WHERE c.fkEmpresa = ${idEmpresa}
        ORDER BY a.idAlerta DESC;
    `;
    console.log("Executando SQL Buscar Histórico: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarAlerta,
    buscarHistorico
};