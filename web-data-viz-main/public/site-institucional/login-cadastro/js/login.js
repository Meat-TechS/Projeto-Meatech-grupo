// Função principal de login
function login() {
  let loginInput = input_validacao.value;
  let senha = input_senha.value;


  let valido = true;

  // Validação do campo de login (email ou CNPJ)
  if (loginInput === "") {
    valido = false;
    document.getElementById("login-required-error").style.display = "block";
  } else {
    document.getElementById("login-required-error").style.display = "none";
  }

  // Validações de senha
  if (senha === "") {
    valido = false;
    document.getElementById("senha-required-error").style.display = "block";
  } else {
    document.getElementById("senha-required-error").style.display = "none";
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

