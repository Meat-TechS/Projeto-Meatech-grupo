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
    idRegistro INT AUTO_INCREMENT,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkSensor INT,
    registroPorta BOOLEAN,
    registroTemp DECIMAL(5,2),
    CONSTRAINT pkComposta PRIMARY KEY (idRegistro, fkSensor),
    CONSTRAINT regiSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- Tabela Alerta
CREATE TABLE alerta (
    idAlerta INT AUTO_INCREMENT,
    tipoAlerta VARCHAR(100),
    descricao VARCHAR(150),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP(),
    fkRegistro INT,
    FOREIGN KEY (fkRegistro) REFERENCES registro(idRegistro),
    CONSTRAINT pkComposta PRIMARY KEY (idAlerta, fkRegistro),
    CONSTRAINT chkTipoAlerta CHECK (tipoAlerta IN ( 'temperatura_alta', 'temperatura_baixa', 'porta_aberta'))
);

INSERT INTO empresa (cnpj, razaoSocial, nomeFantasia, cep, numero, email, senha) 
VALUES ('12345678000199', 'casa frigorifica brasil', '@ do boi', '01311000', '1500', 'contato@arrobadoboi.com', 'hash_senha_123');

INSERT INTO funcionario (nomeFuncionario, cargo, email, login, senha, fkEmpresa) 
VALUES 
('João Silva', 'Gerente de TI', 'joao@arrobadoboi.com', 'joao.silva', 'senha_segura_456', 1),
('Maria Souza', 'Técnico de Manutenção', 'maria@arrobadoboi.com', 'maria.souza', 'senha_segura_789', 1);


INSERT INTO camarafria (identificacao, fkEmpresa) 
VALUES 
('Câmara Congelados 01', 1),
('Câmara Resfriados A2', 1);

INSERT INTO sensor (tipoSensor, statusSensor, fkCamara) 
VALUES 
('temperatura', 'ativo', 1),
('porta', 'ativo', 1),
('temperatura', 'manutencao', 2);


INSERT INTO registro (fkSensor, registroTemp) VALUES 
(1, 4); 
INSERT INTO registro (fkSensor, registroPorta) VALUES 
(2, 1); 
INSERT INTO registro (fkSensor, registroTemp) VALUES 
(1, 5); 


INSERT INTO alerta (tipoAlerta, descricao, fkRegistro) 
VALUES 
('porta_aberta', 'A porta da Câmara 01 ficou aberta por mais de 5 minutos', 2);

INSERT INTO alerta (tipoAlerta, descricao, fkRegistro) 
VALUES 
('temperatura_alta', 'Temperatura subiu para 5.2°C na Câmara 01', 3);

select * from registro;