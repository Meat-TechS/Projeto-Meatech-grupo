function login() {
    let emailCnpj = input_validacao.value;
    let senha = input_senha.value;
    
    let valido = true;

    // Validar se os campos estão preenchidos
    if (emailCnpj == '' || senha == '') {
        alert('Por favor, preencha todos os campos!');
        valido = false;
    }

    // Validar senha (mínimo 8 caracteres?)
    if (valido && senha.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres!');
        valido = false;
    }

    // Validar todos os requisitos da senha 
    if (valido) {
        const temMaiuscula = senha.includes('A') || senha.includes('B') || senha.includes('C') || 
                             senha.includes('D') || senha.includes('E') || senha.includes('F') || 
                             senha.includes('G') || senha.includes('H') || senha.includes('I') || 
                             senha.includes('J') || senha.includes('K') || senha.includes('L') || 
                             senha.includes('M') || senha.includes('N') || senha.includes('O') || 
                             senha.includes('P') || senha.includes('Q') || senha.includes('R') || 
                             senha.includes('S') || senha.includes('T') || senha.includes('U') || 
                             senha.includes('V') || senha.includes('W') || senha.includes('X') || 
                             senha.includes('Y') || senha.includes('Z');
        
        const temMinuscula = senha.includes('a') || senha.includes('b') || senha.includes('c') || 
                             senha.includes('d') || senha.includes('e') || senha.includes('f') || 
                             senha.includes('g') || senha.includes('h') || senha.includes('i') || 
                             senha.includes('j') || senha.includes('k') || senha.includes('l') || 
                             senha.includes('m') || senha.includes('n') || senha.includes('o') || 
                             senha.includes('p') || senha.includes('q') || senha.includes('r') || 
                             senha.includes('s') || senha.includes('t') || senha.includes('u') || 
                             senha.includes('v') || senha.includes('w') || senha.includes('x') || 
                             senha.includes('y') || senha.includes('z');
        
        const temNumero = senha.includes('0') || senha.includes('1') || senha.includes('2') || 
                          senha.includes('3') || senha.includes('4') || senha.includes('5') || 
                          senha.includes('6') || senha.includes('7') || senha.includes('8') || 
                          senha.includes('9');
        
        const temEspecial = senha.includes('!') || senha.includes('@') || senha.includes('#') || 
                            senha.includes('$') || senha.includes('%') || senha.includes('&') || 
                            senha.includes('*') || senha.includes('(') || senha.includes(')') || 
                            senha.includes('-') || senha.includes('_') || senha.includes('.') || 
                            senha.includes(',');

        if (!temMaiuscula || !temMinuscula || !temNumero || !temEspecial) {
            alert('A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 caractere especial e 1 número!');
            valido = false;
        }
    }

    // Fazer login se tudo estiver certo
    if (valido) {
        console.log('Tentativa de login:', { emailCnpj, senha });
        alert('Login realizado com sucesso!');
    }
}
