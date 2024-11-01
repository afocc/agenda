const express = require('express');
const router = express.Router();
const professoresController = require('../controllers/professoresController');

router.get("/", professoresController.getProfessores);
router.get("/:id", professoresController.getProfessorById);
router.post("/", professoresController.createProfessor);
router.put("/:id", professoresController.updateProfessor);
router.delete("/:id", professoresController.deleteProfessor);

module.exports = router;