const cursosModel = require('../models/cursosModel')

exports.getCursos = async (req, res) => {
    try {
        const cursos =  await cursosModel.getCursos();
        res.status(200).json(cursos.rows);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }    
};

exports.getCursoById = async (req, res) => {
    try {
        const curso = await cursosModel.getCursoById(req.params.id_curso);
        res.status(200).json(curso);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
};

exports.createCurso = async (req, res) => {
    let { nome_curso } = req.body;

    if (!req.body) {
        return res.status(400).json({ message: 'Nenhum dado enviado' });
    } 

    try {
        const novoCurso = await cursosModel.createCurso(nome_curso);
        const cursoId = novoCurso.rows[0].id_curso;
        res.status(201).json({ message: `Curso criado com sucesso`, id_curso: cursoId });
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ message: 'Erro ao criar curso' });
    };
};

exports.updateCurso = async (req, res) => {
    const idCurso = req.params.id_curso;
    let { nome_curso } = req.body;
    
    try {
        const curso = await cursosModel.updateCurso(idCurso, nome_curso);
        if (curso.rowCount === 0) {
            return res.status(404).json({ message: 'Curso não encontrado' });
        }     
        res.status(200).json({ message: `Curso com ID ${idCurso} atualizado com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ message: 'Erro ao atualizar curso' });
    }
};

exports.deleteCurso = async (req, res) => {
    const idCurso = req.params.id_curso;
    console.log('ID do curso a ser excluído:', idCurso);

    try {
        cursosModel.deleteCurso(idCurso);
        res.status(200).json({message: `Curso ${idCurso} excluído com sucesso` }); 

    } catch (error) {
        console.error('Erro ao excluir curso:', error);
        res.status(500).json({ message: 'Erro ao excluir curso' });
    }
};