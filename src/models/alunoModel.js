const pool = require('../../db');

const getAlunos = async () => {
    return await pool.query("SELECT * FROM alunos");
};

const createAluno = async (nome, cpf, email, datanascimento) => {
    try {    
    return await pool.query(
        "INSERT INTO alunos (nome, cpf, email, datanascimento) VALUES ($1, $2, $3, $4) RETURNING id",
        [nome, cpf, email, datanascimento]
    );
    } catch {
    throw new Error("Erro ao criar aluno na model");
    } 
};

const getAlunoById = async (id) => {
    return await pool.query("SELECT * FROM alunos WHERE id = $1", [id]);
};

const updateAluno = async (id, nome, cpf, email, datanascimento) => {
    console.log(id);
    return await pool.query(
        "UPDATE alunos SET nome = $1, cpf = $2, email = $3, datanascimento = $4 WHERE id = $5",
        [nome, cpf, email, datanascimento, id]
    );
};

const deleteAluno = async (id) => {
    return await pool.query("DELETE FROM alunos WHERE id = $1", [id]);
};

module.exports = {
    getAlunos,
    createAluno,
    getAlunoById,
    updateAluno,
    deleteAluno
};