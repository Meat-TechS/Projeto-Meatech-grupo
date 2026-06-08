var database = require("../database/config")

function infoCamarasAbertas10(idEmpresa) {

    const instrucaoSql = `
        SELECT 
            c.idCamara,
            TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) AS minutos_aberta
        FROM registro r
        JOIN sensor s 
            ON s.idSensor = r.fkSensor
        JOIN camarafria c 
            ON c.idCamara = s.fkCamara
        WHERE c.fkEmpresa = ${idEmpresa}
          AND s.tipoSensor = 'porta'
          AND r.idRegistro = (
              SELECT MAX(r2.idRegistro)
              FROM registro r2
              WHERE r2.fkSensor = s.idSensor
          )
          AND r.registroPorta = 1
          AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) > 10;
    `;

    return database.executar(instrucaoSql);
}
module.exports = {
    infoCamarasAbertas10
}