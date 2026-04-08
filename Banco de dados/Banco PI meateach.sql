CREATE DATABASE meatech;
USE meatech;

-- Tabela principal (entidade forte)
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(14) UNIQUE,
    razaoSocial VARCHAR(60),
    nomeFantasia VARCHAR(45),
    cep CHAR(8),
    numero VARCHAR(8),
    complemento VARCHAR(30),
    email VARCHAR(45),
    codigoConfirmacao CHAR(5)
);

INSERT INTO Empresa VALUES
(NULL,'12345678000101','Frigorifico Norte LTDA','Frigorifico Norte','01001000','100','Galpao A','contato@norte.com','ABC12'),
(NULL,'98765432000199','Carnes Brasil SA','Carnes Brasil','02002000','200','Bloco B','contato@brasil.com','XYZ34');

-- Relacionamento 1:N (uma empresa tem vários funcionários, mas um funcionário é só de uma empresa)
-- Auto relacionamento um funcionário pode supervisionar outro
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(100),
    cargo VARCHAR(50),
    fkSupervisor INT,
    fkEmpresa INT,
    CHECK (cargo IN ('operador', 'supervisor')),
    FOREIGN KEY (fkSupervisor) REFERENCES Funcionario(idFuncionario), -- Relacionamento com Funcionario (hierarquia)
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) -- Relacionamento com Empresa
);

INSERT INTO Funcionario VALUES
(NULL,'Carlos Augusto','supervisor',NULL,1),
(NULL,'Natalia Santos','operador',1,1),
(NULL,'Rafael Aguiar','operador',1,2);

-- Relacionamento 1:1 cada empresa pode ter apenas um login, e cada login pertence a uma única empresa
CREATE TABLE LoginEmpresa (
    idLoginEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(15),
    codigoAcesso CHAR(5),
    fkEmpresa INT UNIQUE,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) -- Relacionamento com Empresa
);

INSERT INTO LoginEmpresa VALUES
(NULL,'admin@norte.com','123456','EMP01',1),
(NULL,'admin@brasil.com','abcdef','EMP02',2);

-- Relacionamento 1:1 cada funcionário pode ter apenas um login, e cada login pertence a um único funcionário
CREATE TABLE LoginFuncionario (
    idLoginFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(15),
    codigoAcesso CHAR(5),
    fkFuncionario INT UNIQUE, 
    FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario) -- Relacionamento com Funcionario
);

INSERT INTO LoginFuncionario VALUES
(NULL,'carlos.augusto@norte.com','123456','FNC01',1),
(NULL,'natalia.santos@norte.com','abcdef','FNC02',2),
(NULL,'rafael.aguiar@brasil.com','654321','FNC03',3);

-- Relacionamento 1:N uma empresa pode ter várias câmaras frias, mas cada câmara fria pertence a uma única empresa
CREATE TABLE CamaraFria (
    idCamara INT PRIMARY KEY AUTO_INCREMENT,
    localizacao VARCHAR(50),
    temperaturaMin DECIMAL(5,2),
    temperaturaMax DECIMAL(5,2),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) -- Relacionamento com Empresa
);

INSERT INTO CamaraFria VALUES
(NULL,'Camara 1',-10.00,0.00,1),
(NULL,'Camara 2',-5.00,5.00,2);

-- Relacionamento 1:N uma câmara fria pode ter vários sensores, mas cada sensor pertence a uma única câmara fria
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipoSensor VARCHAR(20),
    statusSensor VARCHAR(20),
    fkCamara INT,
    CHECK (tipoSensor IN ('temperatura', 'porta')),
    CHECK (statusSensor IN ('ativo', 'inativo', 'manutencao')),
    FOREIGN KEY (fkCamara) REFERENCES CamaraFria(idCamara) -- Relacionamento com CamaraFria
);

INSERT INTO Sensor VALUES
(NULL,'temperatura','ativo',1),
(NULL,'porta','ativo',2);

-- Relacionamento 1:N um sensor pode registrar várias temperaturas ao longo do tempo, mas cada registro pertence a um único sensor
-- ENTIDADE FRACA depende do sensor para existir
CREATE TABLE Temperatura (
    valorTemperatura DECIMAL(5,2),
    dataHora DATETIME,
    fkSensor INT,
    PRIMARY KEY (fkSensor, dataHora),
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor) -- Relacionamento com Sensor
);

INSERT INTO Temperatura VALUES
(-8.50,'2026-04-01 10:00:00',1),
(-9.20,'2026-04-01 11:00:00',1);

-- Relacionamento 1:N um sensor pode registrar vários estados de porta ao longo do tempo, mas cada registro pertence a um único sensor
-- ENTIDADE FRACA depende do sensor para existir
CREATE TABLE Porta (
    statusPorta VARCHAR(10),
    dataHora DATETIME,
    fkSensor INT,
    CHECK (statusPorta IN ('aberta', 'fechada')),
    PRIMARY KEY (fkSensor, dataHora),
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor) -- Relacionamento com Sensor
);

INSERT INTO Porta (statusPorta, dataHora, fkSensor) VALUES
('aberta', '2026-04-01 10:05:00', 2),
('fechada', '2026-04-01 10:10:00', 2);

-- Relacionamento 1:N um sensor pode gerar vários alertas, mas cada alerta pertence a um único sensor
CREATE TABLE Alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    descricaoAlerta VARCHAR(100),
    dataHora DATETIME,
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor) -- Relacionamento com Sensor
);

INSERT INTO Alerta VALUES
(NULL,'Temperatura acima do limite','2026-04-01 10:00:00',1),
(NULL,'Porta aberta por muito tempo','2026-04-01 10:06:00',2);