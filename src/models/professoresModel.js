const pool = require('../../db');

const getProfessores = async () => {
    return await pool.query("SELECT * FROM professores");
};

const getProfessorById = async (id_professor) => {
    const professor = await pool.query("SELECT * FROM professores WHERE id_professor = $1", [id_professor]);
    return professor.rows[0];
};

const createProfessor = async (nome_professor, cpf_professor, email_professor) => {
    try {    
    return await pool.query(
        "INSERT INTO professores (nome_professor, cpf_professor, email_professor) VALUES ($1, $2, $3) RETURNING id_professor",
        [nome_professor, cpf_professor, email_professor]
    );
    } catch {
    throw new Error("Erro ao criar professor na model");
    } 
};

const updateProfessor = async (id_professor, nome_professor, cpf_professor, email_professor) => {
    console.log(id_professor);
    return await pool.query(
        "UPDATE professores SET nome_professor = $1, cpf_professor = $2, email_professor = $3 WHERE id_professor = $4",
        [nome_professor, cpf_professor, email_professor, id_professor]
    );
};

const deleteProfessor = async (id_professor) => {
    return await pool.query("DELETE FROM professores WHERE id_professor = $1", [id_professor]);
};

module.exports = {
    getProfessores,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor
};