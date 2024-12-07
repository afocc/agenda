require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const EXPIRATION = process.env.EXPIRATION;
const pool = require('../../db');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    console.log('Recebido:', { email, senha });

    try {
        const result = await pool.query('SELECT * FROM alunos WHERE email = $1', [email]);
        const alunos = result.rows[0];

        console.log(alunos);
       
        if (!alunos) 
            return res.status(401).json({ message: 'Credenciais inválidas' });
        

        const senhaCorreta = await bcrypt.compare(senha, alunos.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: alunos.id, email: alunos.email }, SECRET,
            { expiresIn: EXPIRATION } 
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};