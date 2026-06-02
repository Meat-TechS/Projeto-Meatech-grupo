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

        WHERE r.dtHora = (
            SELECT MAX(r2.dtHora)
            FROM registro r2
            WHERE r2.fkSensor = s.idSensor
        );
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};