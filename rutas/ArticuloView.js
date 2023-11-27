const express = require("express");
const ArticuloController = require("../controladores/ArticuloController");
const router = express.Router();

// Rutas de pruebas
router.get("/test", ArticuloController.test);
router.get("/ruta-de-prueba", ArticuloController.prueba);
router.get("/cursos", ArticuloController.cursos);

// Ruta util
router.post("/guardar", ArticuloController.guardar);
router.get("/listar/:ultimos?", ArticuloController.listar);
router.get("/articulo/:id", ArticuloController.getOne);
router.delete("/articulo/:id", ArticuloController.borrar);
router.put("/articulo/:id", ArticuloController.editar);

module.exports = router;
