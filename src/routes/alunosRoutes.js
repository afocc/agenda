const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const alunosController = require('../controllers/alunosController');
const authController = require('../controllers/authController');

router.get("/", alunosController.getAlunos);
router.get("/:id", alunosController.getAlunoById);
router.post("/", alunosController.createAluno);
router.put("/:id", alunosController.updateAluno);
router.delete("/:id", alunosController.deleteAluno);
router.post("/login", authController.login);

module.exports = router;