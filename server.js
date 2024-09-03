const express = require("express")
const app = express()

app.use(express.json());

const packageJson = require("./package.json");

app.get("/", (req, res) => {
    res.send("Nome do projeto: " + packageJson.name)
})

app.get("/alunos", (req, res) => {
    res.send(req.query)
})

app.get("/alunos/:id_aluno", (req, res) => {
    res.send(req.query)
})

app.post("/alunos", (req, res) => {
    res.status(201).json(req.body)
})

app.put("/alunos/:id_aluno", (req, res) => {
    res.status(202).json(req.body)
})

app.delete("/alunos/:id_aluno", (req, res) => {
    let mensagem = `O aluno ${req.params.id_aluno} foi deletado com sucesso.`
    res.status(202).json({
        mensagem
    });
})

app.listen(3000)
