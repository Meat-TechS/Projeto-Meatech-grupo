var database = require("../database/config")

function contarPortasAbertasMais10Min() {
    const instrucaoSql = `
        SELECT COUNT(*) AS portas_abertas_10min
FROM registro r
JOIN sensor s 
    ON s.idSensor = r.fkSensor
WHERE s.tipoSensor = 'porta'
  AND r.registroPorta = 1
  AND r.dtHora + INTERVAL 10 MINUTE <= NOW();
    `;
    return database.executar(instrucaoSql);
}

function contarCamarasCriticas() {

    const instrucaoSql =
        `
  SELECT 
    COUNT(DISTINCT s.fkCamara) AS camaras_criticas
FROM registro r
JOIN sensor s ON s.idSensor = r.fkSensor
WHERE s.tipoSensor = 'temperatura'
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

function camarasIdeal() {
    const instrucaoSql =
        `
    SELECT 
    COUNT(DISTINCT s.fkCamara) AS camaras_faixa_ideal
FROM registro r
JOIN sensor s ON s.idSensor = r.fkSensor
WHERE s.tipoSensor = 'temperatura'
  AND r.idRegistro IN (
      SELECT MAX(r2.idRegistro)
      FROM registro r2
      JOIN sensor s2 ON s2.idSensor = r2.fkSensor
      WHERE s2.tipoSensor = 'temperatura'
      GROUP BY s2.fkCamara
  )
  AND r.registroTemp BETWEEN 0 AND 4;
    `

    return database.executar(instrucaoSql)
}

function totalCamaras() {
    const instrucaoSql =
        `
    SELECT
    COUNT(*) AS total_camaras
    FROM camarafria;
    `

    return database.executar(instrucaoSql)
}

function portaIdeal() {
    const instrucaoSql = `SELECT COUNT(*) AS portasIdeais
FROM registro r
JOIN sensor s 
    ON r.fkSensor = s.idSensor
WHERE s.tipoSensor = 'porta'
AND r.registroPorta = 0;`;

    return database.executar(instrucaoSql);
}

function buscarTemperaturasCamaras() {
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
    );
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