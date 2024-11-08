const pool = require('../../db');

const getAlunos = async () => {
    try {
        return await pool.query("SELECT * FROM alunos");
    } catch {
        throw new Error("Erro ao buscar alunos na model");
    }
};

const getAlunoById = async (id) => {
    try {
        const aluno = await pool.query("SELECT * FROM alunos WHERE id = $1", [id]);
        return aluno.rows[0];
    } catch {
        throw new Error("Erro ao buscar aluno na model");
    }
};

const createAluno = async (nome, cpf, email, datanascimento) => {
    try {    
        return await pool.query(
            "INSERT INTO alunos (nome, cpf, email, datanascimento) VALUES ($1, $2, $3, $4) RETURNING id",
            [nome, cpf, email, datanascimento]);
    } catch {
        throw new Error("Erro ao criar aluno na model");
    } 
};

const updateAluno = async (id, nome, cpf, email, datanascimento) => {
    console.log(id);
    try {
    return await pool.query(
        "UPDATE alunos SET nome = $1, cpf = $2, email = $3, datanascimento = $4 WHERE id = $5",
        [nome, cpf, email, datanascimento, id]);
    } catch {
        throw new Error("Erro ao atualizar aluno na model");
    }
    
};

const deleteAluno = async (id) => {
    try {
        return await pool.query("DELETE FROM alunos WHERE id = $1", [id]);
    } catch {
        throw new Error("Erro ao deletar aluno na model");
    }
};

module.exports = {
    getAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno
};