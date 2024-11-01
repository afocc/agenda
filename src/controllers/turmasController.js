const turmasModel = require('../models/turmasModel')

exports.getTurmas = async (req, res) => {
    try {
        const turmas = await turmasModel.getTurmas();
        res.status(200).json(turmas.rows);
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        res.status(500).json( {message: 'Erro ao buscar turmas'});
    }
}

exports.getTurmaById = async (req, res) => {
    try {
        const turma = await turmasModel.getTurmaById(req.params.id_turma);
        res.status(200).json(turma);
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        res.status(500).json({ message: 'Erro ao buscar turmas' });
    }
};

exports.createTurma = async (req, res) => {
    let { apelido_turma, id_curso } = req.body;

    if (!req.body) {
        return res.status(400).json({ message: 'Nenhum dado enviado' });
    } 

    try {
        const novaTurma = await turmasModel.createTurma(apelido_turma, id_curso);
        const turmaId = novaTurma.rows[0].id_turma;
        res.status(201).json({ message: `Turma criada com sucesso`, id_turma: turmaId });
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        res.status(500).json({ message: 'Erro ao criar turma' });
    };
};


exports.updateTurma = async (req, res) => {
    const idTurma = req.params.id_turma;
    let { apelido_turma, id_curso } = req.body;
    try {
        const turma = await turmasModel.updateTurma(idTurma, apelido_turma, id_curso);
        if (turma.rowCount === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }     
        res.status(200).json({ message: `Turma com ID ${idturma} atualizada com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        res.status(500).json({ message: 'Erro ao atualizar turma' });
    }
};

exports.deleteTurma = async (req, res) => {
    const idTurma = req.params.id_turma;
    console.log('ID da turma a ser excluída:', idTurma);

    try {
        turmasModel.deleteTurma(idTurma);
        res.status(200).json({message: `turma ${idTurma} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir turma:', error);
        res.status(500).json({ message: 'Erro ao excluir turma' });
    }
};

