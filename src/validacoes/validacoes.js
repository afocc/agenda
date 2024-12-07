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

    if (cpf.length != 11){
            return false;
    };

    const primeiroDigito = cpf[0];
    if (cpf.split('').every(digito => digito === primeiroDigito)) {
        return 'CPF inválido';
    }

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

const validaData = ({ datanascimento }) => {
      
    if (!datanascimento) {
        return 'Data de nascimento não pode estar vazia';
    }

    const dataNascimento = new Date(datanascimento);
    const hoje = new Date();
    
    // .toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})

    console.log(hoje);

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }
      
    // const idadeMs = hoje.getTime() - data.getTime();
    // const idadeSegundos = idadeMs / 1000;
    // const idade = (idadeSegundos / 31536000);



    console.log(idade);

    if (idade < 18){
        return 'O aluno deve ser maior de 18 anos';
    }

    return;

}

module.exports = {
    validarAluno,
    validaCpf,
    validaData
};