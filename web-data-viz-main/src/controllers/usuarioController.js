var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {

        res.status(400).send("Seu email está undefined!");

    } else if (senha == undefined) {

        res.status(400).send("Sua senha está undefined!");

    } else {

        usuarioModel.autenticar(email, senha)

            .then(function (resultadoAutenticar) {

                console.log(resultadoAutenticar);

                if (resultadoAutenticar.length == 1) {

                    res.json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        fkEmpresa: resultadoAutenticar[0].fkEmpresa,
                        tipoUsuario: resultadoAutenticar[0].tipoUsuario
                    });

                } else if (resultadoAutenticar.length == 0) {

                    res.status(403).send("Email e/ou senha inválido(s)");

                } else {

                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");

                }

            })

            .catch(function (erro) {

                console.log(erro);

                console.log(
                    "\nHouve um erro ao realizar o login! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);

            });

    }

}

function cadastrarEmpresa(req, res) {
  var cnpj = req.body.cnpjServer;
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cep = req.body.cepServer;
  var numero = req.body.numeroServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (cnpj == undefined) {
    res.status(400).send("CNPJ está undefined!");
  } else if (razaoSocial == undefined) {
    res.status(400).send("Razão social está undefined!");
  } else if (cep == undefined) {
    res.status(400).send("CEP está undefined!");
  } else if (numero == undefined) {
    res.status(400).send("Número está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Senha está undefined!");
  } else {
    usuarioModel
      .cadastrarEmpresa(
        cnpj,
        razaoSocial,
        nomeFantasia,
        cep,
        numero,
        email,
        senha,
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarFuncionario(req, res) {
  var nomeFuncionario = req.body.nomeFuncionarioServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var login = req.body.loginServer;
  var senha = req.body.senhaServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  if (nomeFuncionario == undefined) {
    res.status(400).send("Nome do funcionário está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Cargo está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Email está undefined!");
  } else if (login == undefined) {
    res.status(400).send("Login está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Senha está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Empresa está undefined!");
  } else {
    usuarioModel
      .cadastrarFuncionario(
        nomeFuncionario,
        cargo,
        email,
        login,
        senha,
        fkEmpresa,
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrarEmpresa,
  cadastrarFuncionario,
};
