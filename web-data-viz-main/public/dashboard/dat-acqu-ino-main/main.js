// importa bibliotecas
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// configs
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// 🔥 LIGA/DESLIGA SIMULAÇÃO
const MODO_SIMULACAO = true;

// conexão com banco (GLOBAL - CORRETO)
const poolBancoDados = mysql.createPool({
    host: '127.0.0.1',
    user: 'cliente',
    password: 'Sptech2026*',
    database: 'meatech',
    port: 3307
}).promise();


// =========================
// 🔥 SIMULAÇÃO DE SENSOR
// =========================
function iniciarSimulacao() {

    console.log("🔥 Modo SIMULAÇÃO ativado");

    setInterval(async () => {

        // simula 13 câmaras
        for (let sensorId = 1; sensorId <= 13; sensorId++) {

            const temperatura = (Math.random() * 10 - 2).toFixed(1); // -2 a 8

            await poolBancoDados.execute(
                `INSERT INTO registro (fkSensor, registroPorta, registroTemp, dtHora)
                 VALUES (?, NULL, ?, NOW())`,
                [sensorId, temperatura]
            );
        }

        // simula portas (14–26)
        for (let sensorId = 14; sensorId <= 26; sensorId++) {

            const porta = Math.random() > 0.5 ? 1 : 0;

            await poolBancoDados.execute(
                `INSERT INTO registro (fkSensor, registroPorta, registroTemp, dtHora)
                 VALUES (?, ?, NULL, NOW())`,
                [sensorId, porta]
            );
        }

        console.log("📡 Dados simulados inseridos");

    }, 5000);
}


// =========================
// 🔌 ARDUINO (REAL)
// =========================
const serial = async (valoresSensorAnalogico, valoresSensorDigital) => {

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find(p => p.vendorId == 2341 && p.productId == 43);

    if (!portaArduino) {
        throw new Error("Arduino não encontrado");
    }

    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });

    arduino.on('open', () => {
        console.log(`Arduino conectado em ${portaArduino.path}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' }))
        .on('data', async (data) => {

            const valores = data.split(';');
            const sensorDigital = parseInt(valores[0]);
            const sensorAnalogico = parseFloat(valores[1]);

            valoresSensorAnalogico.push(sensorAnalogico);
            valoresSensorDigital.push(sensorDigital);

            await poolBancoDados.execute(
                `INSERT INTO registro (fkSensor, registroPorta, registroTemp, dtHora)
                 VALUES (?, ?, ?, NOW())`,
                [1, sensorDigital, sensorAnalogico]
            );

        });
};


// =========================
// 🌐 SERVIDOR
// =========================
const servidor = (valoresSensorAnalogico, valoresSensorDigital) => {

    const app = express();

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API rodando na porta ${SERVIDOR_PORTA}`);
    });

    app.get('/sensores/analogico', (_, res) => {
        res.json(valoresSensorAnalogico);
    });

    app.get('/sensores/digital', (_, res) => {
        res.json(valoresSensorDigital);
    });
};


// =========================
// 🚀 START DO SISTEMA
// =========================
(async () => {

    const valoresSensorAnalogico = [];
    const valoresSensorDigital = [];

    if (MODO_SIMULACAO) {
        iniciarSimulacao();
    } else {
        await serial(valoresSensorAnalogico, valoresSensorDigital);
    }

    servidor(valoresSensorAnalogico, valoresSensorDigital);

})();