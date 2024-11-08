const alunosModel = require('../models/alunosModel');
const { validarAluno, validaCpf, validaData} = require('../validacoes/validacoes')

exports.getAlunos = async (req, res) => {
    try {
        const alunos = await alunosModel.getAlunos();
        res.status(200).json(alunos.rows);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await alunosModel.getAlunoById(req.params.id);
        res.status(200).json(aluno);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
};

exports.createAluno = async (req, res) => { 
    let { nome, cpf, email, datanascimento } = req.body;

    try {
        if (!req.body) {
            // return res.status(400).json({ message: 'Nenhum dado enviado' });
            throw new Error('Nenhum dado enviado')
        }

        const erroAluno = validarAluno(req.body);    
        if (erroAluno) {
            return res.status(400).json({ message: erroAluno });
        }

        const erroCpf = validaCpf(req.body.cpf);
        if (!validaCpf(req.body.cpf)) {
            return res.status(400).json({ message: erroCpf });
        }

        const erroData = validaData({ datanascimento: req.body.datanascimento });
        if (erroData){
            return res.status(400).json({ message: erroData });
        }
        
        const novoAluno = await alunosModel.createAluno(nome, cpf, email, datanascimento);
        const idAluno = novoAluno.rows[0].id;
        res.status(201).json({ message: `Aluno criado com sucesso`, id: idAluno });        
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ message: 'Erro ao criar aluno' });
    };
}
    
exports.updateAluno = async (req, res) => {    
    const idAluno = req.params.id;
    let { nome, cpf, email, datanascimento } = req.body;

    if (!req.body) {
        return res.status(400).json({ message: 'Nenhum dado enviado' });
    }

    const erroAluno = validarAluno(req.body);
    
    if (erroAluno) {
        return res.status(400).json({ message: erroAluno });
    }

    if (!validaCpf(req.body.cpf)) {
        return res.status(400).json({ message: 'CPF inválido' });
    }

    try {
        const aluno = alunosModel.updateAluno(idAluno, nome, cpf, email, datanascimento);
        if (aluno.rowsCount === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }     
        res.status(200).json({ message: `Aluno com ID ${idAluno} atualizado com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
};

exports.deleteAluno = async (req, res) => {  
    const idAluno = req.params.id;
    console.log('ID do aluno a ser excluído:', idAluno);

    try {
        alunosModel.deleteAluno(idAluno);
        res.status(200).json({message: `Aluno ${idAluno} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        res.status(500).json({ message: 'Erro ao excluir aluno' });
    }
};