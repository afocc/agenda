const express = require("express");
const pool = require('./db');
const app = express();
const port = 3000;
const host = '0.0.0.0';

const alunosController = require('./src/controllers/alunosController');

app.use(express.json());

const packageJson = require("./package.json");

app.get("/", (req, res) => {
    res.send("Nome do projeto: " + packageJson.name)
})

app.get("/alunos", alunosController.getAlunos);

app.get("/alunos/:id", alunosController.getAlunosById);

app.post("/alunos", alunosController.createAluno);

app.put("/alunos/:id", alunosController.updateAluno);

app.delete("/alunos/:id", alunosController.deleteAluno);

   

app.listen(port, host, () => {
    console.log(`Servidor rodando na porta ${port}`);
});