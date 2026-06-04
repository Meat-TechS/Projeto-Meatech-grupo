var database = require("../database/config");

function listar() {

    var instrucaoSql = `
        SELECT
    c.idCamara,
    c.identificacao,
    r.registroTemp AS temperatura
    FROM camarafria c
    JOIN sensor s
        ON s.fkCamara = c.idCamara
    JOIN registro r
        ON r.fkSensor = s.idSensor
    WHERE s.tipoSensor = 'temperatura'
    AND r.dtHora = (
        SELECT MAX(re.dtHora)
        FROM registro re
        WHERE re.fkSensor = s.idSensor
);
    `;

    return database.executar(instrucaoSql);
}

function buscarDetalhesCamara(idCamara) {

    const instrucaoSql = `
        SELECT
            (
                SELECT r.registroTemp
                FROM registro r
                JOIN sensor s
                    ON s.idSensor = r.fkSensor
                WHERE s.fkCamara = ${idCamara}
                AND s.tipoSensor = 'temperatura'
                ORDER BY r.dtHora DESC
                LIMIT 1
            ) AS temperaturaAtual,

            (
                SELECT MIN(r.registroTemp)
                FROM registro r
                JOIN sensor s
                    ON s.idSensor = r.fkSensor
                WHERE s.fkCamara = ${idCamara}
                AND s.tipoSensor = 'temperatura'
            ) AS temperaturaMinima,

            (
                SELECT MAX(r.registroTemp)
                FROM registro r
                JOIN sensor s
                    ON s.idSensor = r.fkSensor
                WHERE s.fkCamara = ${idCamara}
                AND s.tipoSensor = 'temperatura'
            ) AS temperaturaMaxima,

            (
                SELECT COUNT(*)
                FROM registro r
                JOIN sensor s
                    ON s.idSensor = r.fkSensor
                WHERE s.fkCamara = ${idCamara}
                AND s.tipoSensor = 'porta'
                AND r.registroPorta = 1
            ) AS quantidadeAberturas;
    `;

    return database.executar(instrucaoSql);
}

function historicoTemperatura(idCamara) {

    const instrucaoSql = `
        SELECT 
            DATE_FORMAT(r.dtHora, '%H:%i') AS hora,
            r.registroTemp AS temperatura
        FROM registro r
        JOIN sensor s 
            ON s.idSensor = r.fkSensor
        WHERE s.fkCamara = ${idCamara}
        AND s.tipoSensor = 'temperatura'
        ORDER BY r.dtHora DESC
        LIMIT 24;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarDetalhesCamara,
    historicoTemperatura
};