const { conexion } = require("./basedatos/conexion");

const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("Hola Mundo desde NODE.JS");

// Conectar a la base de datos
conexion();

// Crear servidor de Node

const app = express();
const puerto = 3900;

// Configurar CORS

app.use(cors());

// Convertir el body a objeto JS

app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

app.get("/", );

// Rutas
const rutas_articulo = require("./rutas/ArticuloView");

// Cargar Rutas
app.use("/api", rutas_articulo);

// Crear servidor y escuchar peticiones http

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto" + puerto);
});
