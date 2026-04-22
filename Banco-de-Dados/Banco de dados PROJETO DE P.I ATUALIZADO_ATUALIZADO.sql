CREATE DATABASE meatech;
USE meatech;

-- Tabela Empresa
CREATE TABLE Empresa (
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
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    login VARCHAR(50),
    senha VARCHAR(255) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela CamaraFria
CREATE TABLE CamaraFria (
    idCamara INT PRIMARY KEY AUTO_INCREMENT,
    identificacao VARCHAR(50) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Sensor
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipoSensor VARCHAR(20),
    statusSensor VARCHAR(20),
    fkCamara INT,
    FOREIGN KEY (fkCamara) REFERENCES CamaraFria(idCamara),
    CHECK (tipoSensor IN ('temperatura', 'porta')),
    CHECK (statusSensor IN ('ativo', 'inativo', 'manutencao'))
);

-- Tabela Registro
CREATE TABLE Registro (
    idRegistro INT AUTO_INCREMENT,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkSensor INT,
    registroPorta BOOLEAN,
    registroTemp DECIMAL(5,2),
    CONSTRAINT pkComposta PRIMARY KEY (idRegistro, fkSensor),
    CONSTRAINT regiSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

-- Tabela Alerta
CREATE TABLE Alerta (
    idAlerta INT AUTO_INCREMENT,
    tipoAlerta VARCHAR(100),
    descricao VARCHAR(150),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkRegistro INT,
    FOREIGN KEY (fkRegistro) REFERENCES Registro(idRegistro),
    CONSTRAINT pkComposta PRIMARY KEY (idAlerta, fkRegistro),
    CONSTRAINT chkTipoAlerta CHECK (tipoAlerta IN ( 'temperatura_alta', 'temperatura_baixa', 'porta_aberta'))
);