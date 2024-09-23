const alunoModel = require('../models/alunoModel');

exports.getAlunos = async (req, res) => {
    try {
        const alunos = await alunoModel.getAlunos();
        // const alunos = result.rows.map(aluno => ({
        //     ...aluno,
        //     datanascimento: aluno.datanascimento.toISOString().split('T')[0]
        // }));
        res.status(200).json(alunos.rows);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
};

exports.createAluno = async (req, res) => { 

    let { nome, cpf, email, datanascimento } = req.body;

    cpf = cpf.replaceAll('.', '');
    cpf = cpf.replaceAll('-', '');

    if (!nome || !cpf || !email || !datanascimento) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const novoAluno = await alunoModel.createAluno(nome, cpf, email, datanascimento);
        const alunoId = novoAluno.rows[0].id;
        res.status(201).json({ message: `Aluno criado com sucesso`, id: alunoId });
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ message: 'Erro ao criar aluno' });
    }

};

exports.getAlunosById = async (req, res) => {
    try {
        const result = await alunoModel.getAlunosById(req.params.id);
        const alunos = result.rows.map(aluno => ({
            ...aluno,
            datanascimento: aluno.datanascimento.toISOString().split('T')[0]
        }));
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
};

exports.updateAluno = async (req, res) => {
    const alunoId = req.params.id;
    const { nome, cpf, email, datanascimento } = req.body;

    if (!nome || !cpf || !email || !datanascimento) {
        return res.status(400).json({ message: 'Todos os campos (nome, cpf, email, datanascimento) são obrigatórios' });
    }

    try {
        const aluno = await pool.query("SELECT * FROM alunos WHERE id = $1", [alunoId]);

        if (aluno.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        alunoModel.updateAluno(alunoId, nome, cpf, email, datanascimento)

        res.status(200).json({ message: `Aluno com ID ${alunoId} atualizado com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
};

exports.deleteAluno = async (req, res) => {  
    const alunoId = req.params.id;
    console.log('ID do aluno a ser excluído:', alunoId);

    try {
        alunoModel.deleteAluno(alunoId);
        res.status(200).json({message: `Aluno ${alunoId} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        res.status(500).json({ message: 'Erro ao excluir aluno' });
    }

};