const disciplinasModel = require('../models/disciplinasModel')

exports.getDisciplinas = async (req, res) => {
    try {
        const disciplinas = await disciplinasModel.getDisciplinas();
        res.status(200).json(disciplinas.rows);
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        res.status(500).json( {message: 'Erro ao buscar disciplinas'});
    }
}

exports.getDisciplinaById = async (req, res) => {
    try {
        const disciplina = await disciplinasModel.getDisciplinaById(req.params.id_disciplina);
        res.status(200).json(disciplina);
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        res.status(500).json({ message: 'Erro ao buscar disciplinas' });
    }
};

exports.createDisciplina = async (req, res) => {
    let { nome_disciplina } = req.body;

    if (!req.body) {
        return res.status(400).json({ message: 'Nenhum dado enviado' });
    } 

    try {
        const novaDisciplina = await disciplinasModel.createDisciplina(nome_disciplina);
        const disciplinaId = novaDisciplina.rows[0].id_disciplina;
        res.status(201).json({ message: `Disciplina criado com sucesso`, id_disciplina: disciplinaId });
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        res.status(500).json({ message: 'Erro ao criar disciplina' });
    };
};


exports.updateDisciplina = async (req, res) => {
    const idDisciplina = req.params.id_disciplina;
    let { nome_disciplina } = req.body;
    try {
        const disciplina = await disciplinasModel.updateDisciplina(idDisciplina, nome_disciplina);
        if (disciplina.rowCount === 0) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }     
        res.status(200).json({ message: `Disciplina com ID ${idDisciplina} atualizada com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        res.status(500).json({ message: 'Erro ao atualizar disciplina' });
    }
};

exports.deleteDisciplina = async (req, res) => {
    const idDisciplina = req.params.id_disciplina;
    console.log('ID da disciplina a ser excluída:', idDisciplina);

    try {
        disciplinasModel.deleteDisciplina(idDisciplina);
        res.status(200).json({message: `disciplina ${idDisciplina} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir disciplina:', error);
        res.status(500).json({ message: 'Erro ao excluir disciplina' });
    }
};


    