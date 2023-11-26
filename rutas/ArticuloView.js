const express = require("express");
const ArticuloController = require("../controladores/ArticuloController");
const router = express.Router();

// Rutas de pruebas
router.get("/test", ArticuloController.test);
router.get("/ruta-de-prueba", ArticuloController.prueba);
router.get("/cursos", ArticuloController.cursos);

// Ruta util

router.post("/crear", ArticuloController.crear);

module.exports = router;
