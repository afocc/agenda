const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

router.get("/", cursosController.getCursos);
router.get("/:id", cursosController.getCursoById);
router.post("/", cursosController.createCurso);
router.put("/:id", cursosController.updateCurso);
router.delete("/:id", cursosController.deleteCurso);

module.exports = router;