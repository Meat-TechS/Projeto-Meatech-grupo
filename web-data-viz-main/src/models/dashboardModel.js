var database = require("../database/config")

function contarPortasAbertasMais10Min(idEmpresa) {
    const instrucaoSql = `
        SELECT COUNT(*) AS portas_abertas_10min
        FROM sensor s
        JOIN registro r ON r.fkSensor = s.idSensor
        JOIN camarafria c ON c.idCamara = s.fkCamara
        WHERE s.tipoSensor = 'porta'
          AND c.fkEmpresa = ${idEmpresa}
          AND r.idRegistro IN (
              SELECT MAX(idRegistro)
              FROM registro
              GROUP BY fkSensor
          )
          AND r.registroPorta = 1
          AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) > 10;
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
        FROM camarafria 
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function portaIdeal(idEmpresa) {

    const instrucaoSql = `
        SELECT COUNT(DISTINCT c.idCamara) AS portasIdeais
        FROM camarafria c
        JOIN sensor s ON s.fkCamara = c.idCamara
        JOIN registro r ON r.fkSensor = s.idSensor
        WHERE c.fkEmpresa = ${idEmpresa}
          AND s.tipoSensor = 'porta'
          AND r.idRegistro IN (
              SELECT MAX(idRegistro)
              FROM registro
              GROUP BY fkSensor
          )
          AND (
              r.registroPorta = 0
              OR (
                  r.registroPorta = 1
                  AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) <= 10
              )
          );
    `;

    return database.executar(instrucaoSql);
}

function buscarTemperaturasCamaras(idEmpresa) {

    const instrucaoSql = `
        SELECT 
            c.idCamara,
            c.identificacao,
            r.registroTemp
        FROM camarafria c
        LEFT JOIN sensor s
            ON s.fkCamara = c.idCamara
            AND s.tipoSensor = 'temperatura'
        LEFT JOIN registro r
            ON r.fkSensor = s.idSensor
            AND r.idRegistro = (
                SELECT MAX(r2.idRegistro)
                FROM registro r2
                WHERE r2.fkSensor = s.idSensor
            )
        WHERE c.fkEmpresa = ${idEmpresa};
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