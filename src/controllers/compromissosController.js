const compromissoController = {
    getAllCompromissos: async (req, res) => {
        res.status(200).json({
            status: "Deu tudo certo"
        })
    }
}

module.exports = compromissoController