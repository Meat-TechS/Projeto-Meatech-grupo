CREATE DATABASE meatech;
USE meatech;

-- Tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(14) NOT NULL UNIQUE,
    razaoSocial VARCHAR(100) NOT NULL,
    nomeFantasia VARCHAR(100),
    cep CHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(300) NOT NULL
);

-- Tabela Funcionario
CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    login VARCHAR(50),
    senha VARCHAR(255) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela CamaraFria
CREATE TABLE camarafria (
    idCamara INT PRIMARY KEY AUTO_INCREMENT,
    identificacao VARCHAR(50) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela Sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipoSensor VARCHAR(20),
    statusSensor VARCHAR(20),
    fkCamara INT,
    FOREIGN KEY (fkCamara) REFERENCES camarafria(idCamara),
    CHECK (tipoSensor IN ('temperatura', 'porta')),
    CHECK (statusSensor IN ('ativo', 'inativo', 'manutencao'))
);

-- Tabela Registro
CREATE TABLE registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkSensor INT,
    registroPorta BOOLEAN,
    registroTemp DECIMAL(5,2),

    CONSTRAINT regiSensor 
        FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- Tabela Alerta
CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    tipoAlerta VARCHAR(100),
    descricao VARCHAR(150),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkRegistro INT,

    FOREIGN KEY (fkRegistro) REFERENCES registro(idRegistro),

    CONSTRAINT chkTipoAlerta 
        CHECK (
            tipoAlerta IN (
                'temperatura_alta',
                'temperatura_baixa',
                'porta_aberta'
            )
        )
);
