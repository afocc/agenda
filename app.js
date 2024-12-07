require('dotenv').config();
const express = require("express");
const pool = require('./db');
const app = express();
const port = 3000;
const host = '0.0.0.0';

const packageJson = require("./package.json");

const alunosRoutes = require('./src/routes/alunosRoutes');
const cursosRoutes = require('./src/routes/cursosRoutes');
const disciplinasRoutes = require('./src/routes/disciplinasRoutes');
const professoresRoutes = require('./src/routes/professoresRoutes');
const turmasRoutes = require('./src/routes/turmasRoutes');

app.use(express.json());

app.use('/alunos', alunosRoutes);
app.use('/cursos', cursosRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/professores', professoresRoutes);
app.use('/turmas', turmasRoutes);

app.get("/", (req, res) => {
    res.send("Nome do projeto: " + packageJson.name)
});

app.listen(port, host, () => {
    console.log(`Servidor rodando na porta ${port}`);
});