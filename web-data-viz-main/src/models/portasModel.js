var database = require("../database/config")

function infoCamarasAbertas10() {

    const instrucaoSql =

        `
    SELECT DISTINCT
    c.idCamara,
    TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) AS minutos_aberta
FROM camarafria c
JOIN sensor s
    ON s.fkCamara = c.idCamara
JOIN registro r
    ON r.fkSensor = s.idSensor
WHERE s.tipoSensor = 'porta'
  AND r.idRegistro IN (
      SELECT MAX(idRegistro)
      FROM registro
      GROUP BY fkSensor
  )
  AND r.registroPorta = 1
  AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) > 10;
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    infoCamarasAbertas10
}
