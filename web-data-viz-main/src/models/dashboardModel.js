var database = require("../database/config")

function contarPortasAbertasMais10Min(idEmpresa) {
    const instrucaoSql = `
    SELECT COUNT(*) AS portas_abertas_10min
        FROM vw_portas_abertas_criticas
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function contarCamarasCriticas(idEmpresa) {

    const instrucaoSql = `
        SELECT 
            COUNT(DISTINCT s.fkCamara) AS camaras_criticas
        FROM registro r
        JOIN sensor s ON s.idSensor = r.fkSensor
        JOIN camarafria c ON c.idCamara = s.fkCamara
        WHERE s.tipoSensor = 'temperatura'
          AND c.fkEmpresa = ${idEmpresa}
          AND r.idRegistro IN (
              SELECT MAX(r2.idRegistro)
              FROM registro r2
              JOIN sensor s2 ON s2.idSensor = r2.fkSensor
              WHERE s2.tipoSensor = 'temperatura'
              GROUP BY s2.fkCamara
          )
          AND (r.registroTemp < 0 OR r.registroTemp > 4);
    `;

    return database.executar(instrucaoSql);
}

function camarasIdeal(idEmpresa) {

    const instrucaoSql = `
        SELECT 
            COUNT(DISTINCT s.fkCamara) AS camaras_faixa_ideal
        FROM registro r
        JOIN sensor s ON s.idSensor = r.fkSensor
        JOIN camarafria c ON c.idCamara = s.fkCamara
        WHERE s.tipoSensor = 'temperatura'
          AND c.fkEmpresa = ${idEmpresa}
          AND r.idRegistro IN (
              SELECT MAX(r2.idRegistro)
              FROM registro r2
              JOIN sensor s2 ON s2.idSensor = r2.fkSensor
              WHERE s2.tipoSensor = 'temperatura'
              GROUP BY s2.fkCamara
          )
          AND r.registroTemp BETWEEN 0 AND 4;
    `;

    return database.executar(instrucaoSql);
}

function totalCamaras(idEmpresa) {

    const instrucaoSql = `
        SELECT COUNT(*) AS total_camaras
        FROM vw_lista_camaras
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function portaIdeal(idEmpresa) {

    const instrucaoSql = `
    SELECT COUNT(DISTINCT idCamara) AS portasIdeais
        FROM vw_portas_ideais
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function buscarTemperaturasCamaras(idEmpresa) {

    const instrucaoSql = `
    SELECT idRegistro, idCamara, identificacao, registroTemp
        FROM vw_temperatura_atual_grafico
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    contarPortasAbertasMais10Min,
    contarCamarasCriticas,
    camarasIdeal,
    totalCamaras,
    portaIdeal,
    buscarTemperaturasCamaras
};