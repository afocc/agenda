const professoresModel = require('../models/professoresModel')

exports.getProfessores = async (req, res) => {
    try {
        const professores = await professoresModel.getProfessores();
        res.status(200).json(professores.rows);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json( {message: 'Erro ao buscar professores'});
    }
}

exports.getProfessorById = async (req, res) => {
    try {
        const professor = await professoresModel.getprofessorById(req.params.id_professor);
        res.status(200).json(professor);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json({ message: 'Erro ao buscar professores' });
    }
};

exports.createProfessor = async (req, res) => {
    let { nome_professor, cpf_professor, email_professor } = req.body;

    if (!req.body) {
        return res.status(400).json({ message: 'Nenhum dado enviado' });
    } 

    try {
        const novoProfessor = await professoresModel.createProfessor(nome_professor, cpf_professor, email_professor);
        const professorId = novoProfessor.rows[0].id_professor;
        res.status(201).json({ message: `Professor criado com sucesso`, id_professor: professorId });
    } catch (error) {
        console.error('Erro ao criar professor:', error);
        res.status(500).json({ message: 'Erro ao criar professor' });
    };
};


exports.updateProfessor = async (req, res) => {
    const idProfessor = req.params.id_professor;
    let { nome_professor, cpf_professor, email_professor } = req.body;
    try {
        const professor = await professoresModel.updateProfessor(idProfessor, nome_professor, cpf_professor, email_professor);
        if (professor.rowCount === 0) {
            return res.status(404).json({ message: 'professor não encontrada' });
        }     
        res.status(200).json({ message: `professor com ID ${idProfessor} atualizada com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ message: 'Erro ao atualizar professor' });
    }
};

exports.deleteProfessor = async (req, res) => {
    const idProfessor = req.params.id_professor;
    console.log('ID da professor a ser excluída:', idProfessor);

    try {
        professoresModel.deleteProfessor(idProfessor);
        res.status(200).json({message: `professor ${idProfessor} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir professor:', error);
        res.status(500).json({ message: 'Erro ao excluir professor' });
    }
};

