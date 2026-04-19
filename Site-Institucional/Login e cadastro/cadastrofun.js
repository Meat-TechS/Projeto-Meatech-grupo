function cadastrar() {
        let cnpj = input_cnpj.value
        let matricula = input_matricula.value
        let nome = input_nome.value
        let email = input_email.value

        let senha = input_criacaoSenha.value

        let confirmacao = input_confirmacaoSenha.value
        let caracteres = ['!', '@', '$', '%', '&', '*', '?', '/']
        let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

        let mensagem = ''
        let valido = true
       
        // cnpj validacao
    
        if (cnpj === '') {
            valido = false
            document.getElementById('cnpj-required-error').style.display = "block";
        } else {
            document.getElementById('cnpj-required-error').style.display = "none";
            if (cnpj.length != 14) {
                valido = false
                document.getElementById('cnpj-invalid-error').style.display = "block";
            }else {
                document.getElementById('cnpj-invalid-error').style.display = "none";
            }
        }

        // nome validacao
       
        if (nome === '') {
            valido = false
            document.getElementById('nome-required-error').style.display = "block";
        }else{
             document.getElementById('nome-required-error').style.display = "none";
        }
        // validacao email
      
        if (email === '') {
            valido = false
           document.getElementById('email-required-error').style.display = "block";
        } else{
             document.getElementById('email-required-error').style.display = "none";
            if (!email.includes('@')) {
                valido = false
            document.getElementById('email-invalid-error').style.display = "block";
        }else {
           document.getElementById('email-invalid-error').style.display = "none";
        }
            }
        // matricula validacao
        
        if (matricula === '') {
            valido = false
           document.getElementById('matricula-required-error').style.display = "block";
        } else{
             document.getElementById('matricula-required-error').style.display = "none";
        }

        // validações senha
       
        if (senha === '') {
            valido = false
            document.getElementById('senha-required-error').style.display = "block";
        } 
        
        else {
            document.getElementById('senha-required-error').style.display = "none";
            let contemnumero = false
            let contemcaractere = false
            if (senha.length < 8) {
                valido = false
                document.getElementById('senha-comprimento-error').style.display = "block";
            } else{
                document.getElementById('senha-comprimento-error').style.display = "none";
            }
            for (let cont = 0; cont < numeros.length; cont++) {
                if (senha.includes(numeros[cont])) {
                 contemnumero = true
                     break
                } }
                if(!contemnumero){
                    valido = false
                    document.getElementById('senha-numero-error').style.display = "block";
                }else{
                    document.getElementById('senha-numero-error').style.display = "none";
                }
           
            for (let cont = 0; cont < caracteres.length; cont++) {
                if (senha.includes(caracteres[cont])) {
                    contemcaractere = true
                     break}
                } 
                
                if(!contemcaractere){
                    valido = false
                   document.getElementById('senha-caractere-error').style.display = "block";
                }else{
                     document.getElementById('senha-caractere-error').style.display = "none";
                }
            
            if (senha == senha.toLowerCase()) {
                valido = false
                 document.getElementById('senha-maiuscula-error').style.display = "block";
            }else{
               document.getElementById('senha-maiuscula-error').style.display = "none";  
            }
           
        }

        // confirmacao de senha validacao
        if (confirmacao === '') {
            document.getElementById('confirmacao-required-error').style.display = "block";  
        } else {
            document.getElementById('confirmacao-required-error').style.display = "none";  
            if (confirmacao != senha ) {
                valido = false
               document.getElementById('confirmacao-invalid-error').style.display = "block"; 
            }else{
                 document.getElementById('confirmacao-invalid-error').style.display = "none"; 
            }
        }

        if (valido) {
            cardErro.style.display = "block"
           
        }
        }