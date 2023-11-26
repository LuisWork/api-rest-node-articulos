const mongoose = require('mongoose');

const conexion = async() => {
    try{
        await mongoose.connect("mongodb://127.0.0.1/mi_blog");
        console.log("Conectado correctamente a la base de datos mi_blog")
    }catch(error){
        console.log();
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}

// Parametros a pasar despues de la URL en caso de error

/*

useNewUrlParser: true
useUnifiedTopology: true
useCreateIndex: true

*/