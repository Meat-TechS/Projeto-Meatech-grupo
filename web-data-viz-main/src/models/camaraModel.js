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
            SELECT MAX(re.dtHora)
            FROM registro re
            WHERE re.fkSensor = s.idSensor
        );
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};