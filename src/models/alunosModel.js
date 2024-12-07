const pool = require('../../db');
const bcrypt = require('bcrypt'); 

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

const updateAluno = async (id, nome, cpf, email, datanascimento, senha) => {
    console.log(id);

    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
    return await pool.query(
        "UPDATE alunos SET nome = $1, cpf = $2, email = $3, datanascimento = $4, senha = $5 WHERE id = $6",
        [nome, cpf, email, datanascimento, hashedPassword, id]);
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