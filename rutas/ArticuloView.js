const express = require("express");
const multer = require("multer");
const ArticuloController = require("../controladores/ArticuloController");
const router = express.Router();

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imagenes/articulos");
  },
  filename: function (req, file, cb) {
    cb(null, "articulo" + Date.now() + file.originalname);
  },
});

const subidas = multer({ storage: almacenamiento });

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
router.post(
  "/subir-imagen/:id",
  [subidas.single("file0")],
  ArticuloController.subirImagen
);

module.exports = router;
