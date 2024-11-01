const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosController');

router.get("/", alunosController.getAlunos);
router.get("/:id", alunosController.getAlunoById);
router.post("/", alunosController.createAluno);
router.put("/:id", alunosController.updateAluno);
router.delete("/:id", alunosController.deleteAluno);

module.exports = router;