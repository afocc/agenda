const pool = require('../../db');

const getTurmas = async () => {
    return await pool.query("SELECT * FROM turmas");
};

const createTurma = async (apelido_turma, id_curso) => {
    try {    
    return await pool.query(
        "INSERT INTO turmas (apelido_turma, id_curso) VALUES ($1, $2) RETURNING id_turma",
        [apelido_turma, id_curso]
    );
    } catch {
    throw new Error("Erro ao criar turma na model");
    } 
};

const getTurmaById = async (id_turma) => {
    const turma = await pool.query("SELECT * FROM turmas WHERE id_turma = $1", [id_turma]);
    return turma.rows[0];
};

const updateTurma = async (id_turma, apelido_turma, id_curso) => {
    console.log(id_turma);
    return await pool.query(
        "UPDATE Turmas SET apelido_turma = $1, id_curso = $2 WHERE id_turma = $3",
        [apelido_turma, id_curso, id_turma]
    );
};

const deleteTurma = async (id_turma) => {
    return await pool.query("DELETE FROM Turmas WHERE id_turma = $1", [id_turma]);
};

module.exports = {
    getTurmas,
    getTurmaById,
    createTurma,
    updateTurma,
    deleteTurma
};