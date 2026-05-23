// const serialport = require('serialport'); // só ativa se for usar Arduino
const express = require('express');
const mysql = require('mysql2');

// configs
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

const MODO_SIMULACAO = true;

// conexão banco
const poolBancoDados = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Emma150490@',
    database: 'meatech',
    port: 3306
}).promise();


// =========================
// 🔥 SIMULAÇÃO
// =========================
function iniciarSimulacao() {

    console.log("🔥 SIMULAÇÃO INICIADA");

    setInterval(async () => {

        try {

            console.log("⏱ rodando simulação...");

            // 🔵 TEMPERATURA (câmaras 1–13)
            for (let sensorId = 1; sensorId <= 13; sensorId++) {

                const temperatura = (Math.random() * 10 - 2).toFixed(1);

                await poolBancoDados.execute(
                    `INSERT INTO registro (fkSensor, registroPorta, registroTemp, dtHora)
                     VALUES (?, NULL, ?, NOW())`,
                    [sensorId, temperatura]
                );
            }

            // 🟢 PORTA (câmaras 14–26)
            for (let sensorId = 14; sensorId <= 26; sensorId++) {

                const porta = Math.random() > 0.5 ? 1 : 0;

                await poolBancoDados.execute(
                    `INSERT INTO registro (fkSensor, registroPorta, registroTemp, dtHora)
                     VALUES (?, ?, NULL, NOW())`,
                    [sensorId, porta]
                );
            }

            console.log("✔ dados inseridos no banco");

        } catch (erro) {
            console.log("❌ ERRO NO MYSQL:", erro);
        }

    }, 5000);
}


// =========================
// 🌐 SERVIDOR
// =========================
const servidor = () => {

    const app = express();

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API rodando na porta ${SERVIDOR_PORTA}`);
    });
};


// =========================
// 🚀 START
// =========================
(async () => {

    if (MODO_SIMULACAO) {
        iniciarSimulacao();
    }

    servidor();

})();