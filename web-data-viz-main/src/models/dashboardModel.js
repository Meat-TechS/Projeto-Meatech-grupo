var database = require("../database/config")

function contarPortasAbertasMais10Min() {
    const instrucaoSql = `
        SELECT COUNT(*) AS portas_abertas_10min
        FROM registro r
        JOIN sensor s ON s.idSensor = r.fkSensor
        WHERE s.tipoSensor = 'porta'
          AND r.registroPorta = 1
          AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) >= 10;
    `;
    return database.executar(instrucaoSql);
}

function contarCamarasCriticas(){

    const instrucaoSql = 
    `
    SELECT 
	COUNT(*) AS camaras_criticas
    FROM registro r
    JOIN sensor s
    ON s.idSensor = r.fkSensor
    WHERE tipoSensor = 'temperatura' AND (registroTemp > 4 OR registroTemp < 0);
    `;

    return database.executar(instrucaoSql);
}

function camarasIdeal(){
    const instrucaoSql = 
    `
    SELECT 
	COUNT(*) AS camaras_faixa_ideal
    FROM registro r
    JOIN sensor s
    ON s.idSensor = r.fkSensor
    WHERE tipoSensor = 'temperatura' AND registroTemp BETWEEN 0 AND 4;
    `

    return database.executar(instrucaoSql)
}

function totalCamaras(){
    const instrucaoSql = 
    `
    SELECT
    COUNT(*) AS total_camaras
    FROM camarafria;
    `

    return database.executar(instrucaoSql)
}

module.exports = {
     contarPortasAbertasMais10Min,
     contarCamarasCriticas,
     camarasIdeal,
     totalCamaras
};