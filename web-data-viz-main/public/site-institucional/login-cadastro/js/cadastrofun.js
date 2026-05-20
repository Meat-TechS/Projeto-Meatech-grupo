function cadastrar() {

  let nome = input_nome.value;
  let email = input_email.value;
  let matricula = input_matricula.value;
  let cargo = input_cargo.value;

  let senha = input_criacaoSenha.value;
  let confirmacao = input_confirmacaoSenha.value;

  let caracteres = ["!", "@", "$", "%", "&", "*", "?", "/"];
  let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  let valido = true;

  // VALIDAÇÃO NOME
  if (nome === "") {
    valido = false;
    document.getElementById("nome-required-error").style.display = "block";
  } else {
    document.getElementById("nome-required-error").style.display = "none";
  }

  // VALIDAÇÃO EMAIL
  if (email === "") {
    valido = false;
    document.getElementById("email-required-error").style.display = "block";
  } else {

    document.getElementById("email-required-error").style.display = "none";

    if (!email.includes("@") || !email.includes(".")) {

      valido = false;
      document.getElementById("email-invalid-error").style.display = "block";

    } else {

      document.getElementById("email-invalid-error").style.display = "none";

    }
  }

  // VALIDAÇÃO MATRÍCULA
  if (matricula === "") {

    valido = false;
    document.getElementById("matricula-required-error").style.display = "block";

  } else {

    document.getElementById("matricula-required-error").style.display = "none";

  }

  // VALIDAÇÃO CARGO
  if (cargo === "") {

    valido = false;
    document.getElementById("cargo-required-error").style.display = "block";

  } else {

    document.getElementById("cargo-required-error").style.display = "none";

  }


  // VALIDAÇÃO SENHA
  if (senha === "") {

    valido = false;
    document.getElementById("senha-required-error").style.display = "block";

  } else {

    document.getElementById("senha-required-error").style.display = "none";

    let contemNumero = false;
    let contemCaractere = false;

    // comprimento mínimo
    if (senha.length < 8) {

      valido = false;
      document.getElementById("senha-comprimento-error").style.display = "block";

    } else {

      document.getElementById("senha-comprimento-error").style.display = "none";

    }

    // número
    for (let cont = 0; cont < numeros.length; cont++) {

      if (senha.includes(numeros[cont])) {

        contemNumero = true;
        break;

      }
    }

    if (!contemNumero) {

      valido = false;
      document.getElementById("senha-numero-error").style.display = "block";

    } else {

      document.getElementById("senha-numero-error").style.display = "none";

    }

    // caractere especial
    for (let cont = 0; cont < caracteres.length; cont++) {

      if (senha.includes(caracteres[cont])) {

        contemCaractere = true;
        break;

      }
    }

    if (!contemCaractere) {

      valido = false;
      document.getElementById("senha-caractere-error").style.display = "block";

    } else {

      document.getElementById("senha-caractere-error").style.display = "none";

    }

    // letra maiúscula
    if (senha == senha.toLowerCase()) {

      valido = false;
      document.getElementById("senha-maiuscula-error").style.display = "block";

    } else {

      document.getElementById("senha-maiuscula-error").style.display = "none";

    }

    // letra minúscula
    if (senha == senha.toUpperCase()) {

      valido = false;
      document.getElementById("senha-minuscula-error").style.display = "block";

    } else {

      document.getElementById("senha-minuscula-error").style.display = "none";

    }
  }

  // CONFIRMAÇÃO DE SENHA
  if (confirmacao === "") {

    valido = false;
    document.getElementById("confirmacao-required-error").style.display = "block";

  } else {

    document.getElementById("confirmacao-required-error").style.display = "none";

    if (confirmacao != senha) {

      valido = false;
      document.getElementById("confirmacao-invalid-error").style.display = "block";

    } else {

      document.getElementById("confirmacao-invalid-error").style.display = "none";

    }
  }

  // CADASTRO
  if (valido) {

    let fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch("/usuarios/cadastrarFuncionario", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        nomeFuncionarioServer: nome,
        cargoServer: cargo,
        emailServer: email,
        loginServer: matricula,
        senhaServer: senha,
        fkEmpresaServer: fkEmpresa

      }),

    })

    .then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {

        cardErro.style.display = "block";

        setTimeout(() => {

          cardErro.style.display = "none";

        }, 2000);

        setTimeout(() => {

          window.location.href = "./login.html";

        }, 2000);

      } else {

        throw "Houve um erro ao tentar realizar o cadastro!";

      }

    })

    .catch(function (erro) {

      console.log(`#ERRO: ${erro}`);

    });

  }

}