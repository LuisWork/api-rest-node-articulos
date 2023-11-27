const { validarArticulos } = require("../helper/validar");
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
    validarArticulos(parametros);
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

// Metodo para obtener un articulo por ID
const getOne = (req, res) => {
  // Recoger un id por la url
  let id = req.params.id;
  // Buscar el articulo
  Articulo.findById(id, (error, articuloEncontrado) => {
    // Si no existe devolver un error
    if (error || !articuloEncontrado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el articulo",
      });
    }
    // Si existe devolver el resultado
    return res.status(200).json({
      status: "success",
      articuloEncontrado,
    });
  });
};

// Metodo para eliminar un articulo por ID
const borrar = (req, res) => {
  let id = req.params.id;
  Articulo.findOneAndDelete({ _id: id }, (error, articuloEliminado) => {
    if (error || !articuloEliminado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el articulo a eliminar",
      });
    }
    return res.status(200).json({
      status: "success",
      articuloEliminado,
      mensaje: `El articulo a sido eliminado correctamente`,
    });
  });
};

// Metodo para editar un articulo por ID
const editar = (req, res) => {
  // Recoger el ID del articulo a editar
  let id = req.params.id;
  // Recoger los datos del body
  let parametros = req.body;
  // Validar datos
  try {
    validarArticulos(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  // Buscar y actualizar el articulo
  Articulo.findOneAndUpdate(
    { _id: id },
    parametros,
    { new: true },
    (error, articuloActualizado) => {
      if (error || !articuloActualizado) {
        return res.status(404).json({
          status: "error",
          mensaje: "No se ha encontrado el articulo para editar",
        });
      }
      // Devolver una respuesta
      return res.status(200).json({
        status: "success",
        mensaje: "El articulo se a actualizado correctamente",
        articuloActualizado,
      });
    }
  );
};

module.exports = {
  test,
  prueba,
  cursos,
  guardar,
  listar,
  getOne,
  borrar,
  editar,
};
