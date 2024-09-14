const express = require("express")
const pool = require('./db');
const app = express()
const port = 3000;

app.use(express.json());

const packageJson = require("./package.json");

app.get("/", (req, res) => {
    res.send("Nome do projeto: " + packageJson.name)
})

app.get("/alunos", async (req, res) => {

    // Retornando alunos e retirando o timestamp da data de nascimento
    try {
        const result = await pool.query("SELECT * FROM alunos");
    
        const alunos = result.rows.map(aluno => {
        return {
            ...aluno,
            datanascimento: aluno.datanascimento.toISOString().split('T')[0]
          };
        });
    
        res.status(200).json(alunos);

        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            res.status(500).json({ message: 'Erro ao buscar alunos' });
        }
    });

app.post("/alunos", async (req, res) => {
    const { nome, cpf, email, datanascimento } = req.body;   
            
    if (!nome || !cpf || !email || !datanascimento) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
    try {
            
        await pool.query("SELECT setval('alunos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM alunos))");
        
        const novoAluno = await pool.query(
            "INSERT INTO alunos (nome, cpf, email, datanascimento) VALUES ($1, $2, $3, $4) RETURNING id",
            [nome, cpf, email, datanascimento]
            );
        
        const alunoId = novoAluno.rows[0].id;
        
            res.status(201).json({ message: `Aluno criado com sucesso`, id: alunoId });
        } catch (error) {
            console.error('Erro ao criar aluno:', error);
            res.status(500).json({ message: 'Erro ao criar aluno' });
          }
        });

app.put("/alunos/:id", async (req, res) => {
    const alunoId = req.params.id;
    const { nome, cpf, email, datanascimento } = req.body;
  
    if (!nome || !cpf || !email || !datanascimento) {
        return res.status(400).json({ message: 'Todos os campos (nome, cpf, email, datanascimento) são obrigatórios' });
    }
  
    try {
        const aluno = await pool.query("SELECT * FROM alunos WHERE id = $1", [alunoId]);
  
        if (aluno.rows.length === 0) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
  
        await pool.query(
        "UPDATE alunos SET nome = $1, cpf = $2, email = $3, datanascimento = $4 WHERE id = $5",
        [nome, cpf, email, datanascimento, alunoId]
      );
  
        res.status(200).json({ message: `Aluno com ID ${alunoId} atualizado com sucesso` });

    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
  });

app.delete("/alunos/:id", async (req, res) => {
    
    const alunoId = req.params.id;
    console.log('ID do aluno a ser excluído:', alunoId);

    try {
        await pool.query("DELETE FROM alunos WHERE id = $1", [alunoId]);
        res.status(200).json({ message: `Aluno ${alunoId} excluído com sucesso` });

    } catch (error) {  
        console.error('Erro ao excluir aluno:', error);
        res.status(500).json({ message: 'Erro ao excluir aluno' });
    }

});

app.listen(port, () => {
    console.log("Servidor rodando")
});