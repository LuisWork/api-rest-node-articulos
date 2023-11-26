const validator = require("validator");
const Articulo = require("../modelos/ArticuloModel");

const test = (req, res) => {
  return res.status(200).send("<h1>Home Page Test</h1>");
};

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

const cursos = (req, res) => {
  console.log("Se ha ejecutado el endpoint probando");

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorroblesweb.es/master-react",
    },
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorroblesweb.es/master-react",
    },
  ]);
};

const guardar = (req, res) => {
  // Recoger parametros por POST a guardar
  let parametros = req.body;
  // Validar datos
  try {
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: undefined });
    let validar_contenido = !validator.isEmpty(parametros.contenido);
    if (!validar_titulo || !validar_contenido) {
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Crear el objeto a guardar
  const articulo = new Articulo(parametros);
  // Asignar valores al objetos basado en el modelo (Manual o automatico)
  // Manual articulo.titulo = parametros.titulo;
  // Guardar el articulo en la base de datos
  articulo.save((error, articuloGuardado) => {
    if (error || !articuloGuardado) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el articulo",
      });
    }
    // Devolver el resultado
    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Articulo creado con exito",
    });
  });
};

// Metodo get Todos los articulos
const listar = (req, res) => {
  let consulta = Articulo.find({});
  if (req.params.ultimos) {
    consulta.limit(3);
  }
  consulta.sort({ fecha: -1 });
  consulta.exec((error, articulos) => {
    if (error || !articulos) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado articulos",
      });
    }
    return res.status(200).send({
      status: "success",
      parametro: req.params.ultimos,
      contador: articulos.length,
      articulos,
    });
  });
};

module.exports = {
  test,
  prueba,
  cursos,
  guardar,
  listar,
};
