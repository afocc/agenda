const pool = require('../../db');

const getCursos = async () => {
    return await pool.query("SELECT * FROM cursos");
};

const createCurso = async (nome_curso) => {
    try {    
    return await pool.query(
        "INSERT INTO cursos (nome_curso) VALUES ($1) RETURNING id_curso",
        [nome_curso]
    );
    } catch {
    throw new Error("Erro ao criar curso na model");
    } 
};

const getCursoById = async (id_curso) => {
    const curso = await pool.query("SELECT * FROM cursos WHERE id_curso = $1", [id_curso]);
    return curso.rows[0];
};

const updateCurso = async (id_curso, nome_curso) => {
    console.log(id_curso);
    console.log(nome_curso);
    return await pool.query(
        "UPDATE cursos SET nome_curso = $1 WHERE id_curso = $2",
        [nome_curso, id_curso]
    );
};

const deleteCurso = async (id_curso) => {
    return await pool.query("DELETE FROM cursos WHERE id_curso = $1", [id_curso]);
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
};