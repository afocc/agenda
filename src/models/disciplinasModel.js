const pool = require('../../db');

const getDisciplinas = async () => {
    return await pool.query("SELECT * FROM disciplinas");
};

const createDisciplina = async (nome_disciplina) => {
    try {    
    return await pool.query(
        "INSERT INTO disciplinas (nome_disciplina) VALUES ($1) RETURNING id_disciplina",
        [nome_disciplina]
    );
    } catch {
    throw new Error("Erro ao criar disciplina na model");
    } 
};

const getDisciplinaById = async (id_disciplina) => {
    const disciplina = await pool.query("SELECT * FROM disciplinas WHERE id_disciplina = $1", [id_disciplina]);
    return disciplina.rows[0];
};

const updateDisciplina = async (id_disciplina, nome_disciplina) => {
    console.log(id_disciplina);
    console.log(nome_disciplina);
    return await pool.query(
        "UPDATE disciplinas SET nome_disciplina = $1 WHERE id_disciplina = $2",
        [nome_disciplina, id_disciplina]
    );
};

const deleteDisciplina = async (id_disciplina) => {
    return await pool.query("DELETE FROM disciplinas WHERE id_disciplina = $1", [id_disciplina]);
};

module.exports = {
    getDisciplinas,
    getDisciplinaById,
    createDisciplina,
    updateDisciplina,
    deleteDisciplina
};