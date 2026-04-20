// Event listener para aplicar máscara de CNPJ quando o usuário digitar
const inputValidacaoEl = document.getElementById('input_validacao');

inputValidacaoEl.addEventListener('input', function(e) {
    let valor = e.target.value;
    
    // Remove o que não é número
    valor = valor.replace(/\D/g, '');
    
    // Aplica máscara de CNPJ: XX.XXX.XXX/XXXX-XX
    if (valor.length > 0) {
        valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{2}\.\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, '$1/$2');
        valor = valor.replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, '$1-$2');
    }
    
    e.target.value = valor;
});

// Função principal de login
function login() {
    let loginInput = input_validacao.value;
    let senha = input_senha.value;

    let caracteres = ['!', '@', '#', '$', '%', '&', '*', '?', '/'];
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let valido = true;

    // Validação do campo de login (email ou CNPJ)
    if (loginInput === '') {
        valido = false;
        document.getElementById('login-required-error').style.display = "block";
    } else {
        document.getElementById('login-required-error').style.display = "none";
        
        // Verifica se é email ou CNPJ
        if (loginInput.includes('@')) {
            // Validação de email
            if (!loginInput.includes('@') || !loginInput.includes('.')) {
                valido = false;
                document.getElementById('login-invalid-error').style.display = "block";
            } else {
                document.getElementById('login-invalid-error').style.display = "none";
            }
        } else {
            // Validação de CNPJ (sem máscara deve ter 14 dígitos)
            let cnpjSemMascara = loginInput.replace(/\D/g, '');
            if (cnpjSemMascara.length != 14) {
                valido = false;
                document.getElementById('login-invalid-error').style.display = "block";
            } else {
                document.getElementById('login-invalid-error').style.display = "none";
            }
        }
    }

    // Validações de senha
    if (senha === '') {
        valido = false;
        document.getElementById('senha-required-error').style.display = "block";
    } else {
        document.getElementById('senha-required-error').style.display = "none";
        
        let contemNumero = false;
        let contemCaractere = false;
        
        // Validação de comprimento (mínimo 8 caracteres)
        if (senha.length < 8) {
            valido = false;
            document.getElementById('senha-comprimento-error').style.display = "block";
        } else {
            document.getElementById('senha-comprimento-error').style.display = "none";
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
            document.getElementById('senha-numero-error').style.display = "block";
        } else {
            document.getElementById('senha-numero-error').style.display = "none";
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
            document.getElementById('senha-caractere-error').style.display = "block";
        } else {
            document.getElementById('senha-caractere-error').style.display = "none";
        }
        
        // Verifica se contém letra maiúscula
        if (senha == senha.toLowerCase()) {
            valido = false;
            document.getElementById('senha-maiuscula-error').style.display = "block";
        } else {
            document.getElementById('senha-maiuscula-error').style.display = "none";
        }
        
        // Verifica se contém letra minúscula
        if (senha == senha.toUpperCase()) {
            valido = false;
            document.getElementById('senha-minuscula-error').style.display = "block";
        } else {
            document.getElementById('senha-minuscula-error').style.display = "none";
        }
    }

    // Se válido, prossegue com o login
    if (valido) {
        // Aqui você pode fazer a chamada para a API
        alert('Login realizado com sucesso!');
        console.log('Dados de login:', {
            login: loginInput,
            senha: senha
        });
    }
}
