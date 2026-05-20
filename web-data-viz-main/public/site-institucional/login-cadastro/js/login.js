// Função principal de login
function login() {
  let loginInput = input_validacao.value;
  let senha = input_senha.value;

  let caracteres = ["!", "@", "#", "$", "%", "&", "*", "?", "/"];
  let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  let valido = true;

  // Validação do campo de login (email ou CNPJ)
  if (loginInput === "") {
    valido = false;
    document.getElementById("login-required-error").style.display = "block";
  } else {
    document.getElementById("login-required-error").style.display = "none";

    // Verifica se é email ou CNPJ
    if (loginInput.includes("@")) {
      // Validação de email
      if (!loginInput.includes("@") || !loginInput.includes(".")) {
        valido = false;
        document.getElementById("login-invalid-error").style.display = "block";
      } else {
        document.getElementById("login-invalid-error").style.display = "none";
      }
    } else {
      // Validação de CNPJ (sem máscara deve ter 14 dígitos)
      if (loginInput.length != 14) {
        valido = false;
        document.getElementById("login-invalid-error").style.display = "block";
      } else {
        document.getElementById("login-invalid-error").style.display = "none";
      }
    }
  }

  // Validações de senha
  if (senha === "") {
    valido = false;
    document.getElementById("senha-required-error").style.display = "block";
  } else {
    document.getElementById("senha-required-error").style.display = "none";

    let contemNumero = false;
    let contemCaractere = false;

    // Validação de comprimento (mínimo 8 caracteres)
    if (senha.length < 8) {
      valido = false;
      document.getElementById("senha-comprimento-error").style.display =
        "block";
    } else {
      document.getElementById("senha-comprimento-error").style.display = "none";
    }

    // Verifica se contém número
    for (let cont = 0; cont < numeros.length; cont++) {
      if (senha.includes(numeros[cont].toString())) {
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

    // Verifica se contém caractere especial
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

    // Verifica se contém letra maiúscula
    if (senha == senha.toLowerCase()) {
      valido = false;
      document.getElementById("senha-maiuscula-error").style.display = "block";
    } else {
      document.getElementById("senha-maiuscula-error").style.display = "none";
    }

    // Verifica se contém letra minúscula
    if (senha == senha.toUpperCase()) {
      valido = false;
      document.getElementById("senha-minuscula-error").style.display = "block";
    } else {
      document.getElementById("senha-minuscula-error").style.display = "none";
    }
  }

  // Se válido, prossegue com o login
    if (valido) {
      fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailServer: loginInput,
          senhaServer: senha,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
            resposta.json().then((json) => {
              console.log(json);

              sessionStorage.ID_USUARIO = json.id;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.FK_EMPRESA = json.fkEmpresa;
              sessionStorage.TIPO_USUARIO = json.tipoUsuario;

              cardErro.style.display = "block";

              setTimeout(() => {
                cardErro.style.display = "none";
              }, 2000);

              setTimeout(() => {
                window.location.href = "../../dashboard/painel.html";
              }, 1000);
            });
          } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then((texto) => {
              console.error(texto);
            });
          }
        })
        .catch(function (erro) {
          console.log(erro);
        });
    }
  }

