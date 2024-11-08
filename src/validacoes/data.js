const datanascimento = '2007-02-16';
const data = new Date(datanascimento);
const hoje = new Date();

const idadeMs = hoje.getTime() - data.getTime();
const idadeSegundos = idadeMs / 1000;
const idade = (idadeSegundos / 31536000).toFixed(1);

if (idade >= 18){
    console.log('Aprovado')
} else {
    console.log('Reprovado')
}

const dia = (data.getDate() + 1).toString().padStart(2,'0');
const mes = (data.getMonth() + 1).toString().padStart(2,'0');
const ano = data.getFullYear();

const dataBr = `${dia}/${mes}/${ano}`;


console.log(dataBr);
console.log(idade);