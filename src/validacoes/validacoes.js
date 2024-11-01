const validarAluno = ({ nome, cpf, email, datanascimento }) => {
    
    if (!nome || !cpf || !email || !datanascimento) {
        return 'Todos os campos são obrigatórios';
    }

    if (nome.length < 3) {
        return 'O nome deve ter pelo menos 3 letras';
    }

    if (!/^(?!.*  )[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(nome)) {
        return 'O nome deve começar com letra maiúscula';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Email inválido';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(datanascimento)) {
        return 'Formato de data inválido. Use YYYY-MM-DD.';
    }

    return null;
};


const validaCpf = ({ cpf }) => {

    if (!cpf) {
        return 'CPF não pode ser vazio';
    }

    cpf = cpf.replaceAll('.', '').replaceAll('-', '');

        if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
            cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
            cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
            cpf == "88888888888" || cpf == "99999999999" || cpf == "01234567890".test(cpf)){
            return false;
        };

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma+= parseInt(cpf.charAt(i)) * (10 - i);                
        } 
        let dv1 = 11 - (soma % 11);
        dv1 = dv1 >= 10 ? 0 : dv1;

        soma = 0;
        for (let i = 0; i < 9; i++) {
            soma+= parseInt(cpf.charAt(i)) * (11 - i);
        }
        soma += dv1 * 2;
        let dv2 = 11 - (soma % 11);   
        dv2 = dv2 >= 10 ? 0 : dv2;       

        return cpf.charAt(9) == dv1 && cpf.charAt(10) == dv2;
        
}

// const validaData = ({ datanascimento }) => {
        
//         if {

//         }   
// }

module.exports = {
    validarAluno,
    validaCpf
};