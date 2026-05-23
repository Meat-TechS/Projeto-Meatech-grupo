var database = require("../database/config")

function autenticar(login, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", login, senha)
    var instrucaoSql = `

        SELECT 
            idEmpresa AS id,
            nomeFantasia AS nome,
            email,
            idEmpresa AS fkEmpresa,
            'empresa' AS tipoUsuario
        FROM empresa
        WHERE (email = '${login}' OR cnpj = '${login}')
        AND senha = '${senha}'

        UNION

        SELECT
            idFuncionario AS id,
            nomeFuncionario AS nome,
            email,
            fkEmpresa,
            'funcionario' AS tipoUsuario
        FROM funcionario
        WHERE email = '${login}'
        AND senha = '${senha}';

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(
    cnpj,
    razaoSocial,
    nomeFantasia,
    cep,
    numero,
    email,
    senha
) {

    var instrucaoSql = `
        INSERT INTO empresa
        (cnpj, razaoSocial, nomeFantasia, cep, numero, email, senha)
        VALUES
        (
            '${cnpj}',
            '${razaoSocial}',
            '${nomeFantasia}',
            '${cep}',
            '${numero}',
            '${email}',
            '${senha}'
        );
    `;

    return database.executar(instrucaoSql);
}

function cadastrarFuncionario(
    nomeFuncionario,
    cargo,
    email,
    login,
    senha,
    fkEmpresa
) {

    var instrucaoSql = `
        INSERT INTO funcionario
        (nomeFuncionario, cargo, email, login, senha, fkEmpresa)
        VALUES
        (
            '${nomeFuncionario}',
            '${cargo}',
            '${email}',
            '${login}',
            '${senha}',
            ${fkEmpresa}
        );
    `;

    return database.executar(instrucaoSql);
}

function contarPortasAbertasMais10Min() {
    const sql = `
        SELECT COUNT(*) AS portas_abertas_10min
        FROM registro r
        JOIN sensor s ON s.idSensor = r.fkSensor
        WHERE s.tipoSensor = 'porta'
          AND r.registroPorta = 1
          AND TIMESTAMPDIFF(MINUTE, r.dtHora, NOW()) >= 10;
    `;

    return database.executar(sql);
}


module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarFuncionario,
     contarPortasAbertasMais10Min,
};