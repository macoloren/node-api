const dotenv = require("dotenv")


//si llegan a faltar las credenciales el archivo .env (variables de entorno) 
const envFoud = dotenv.config();
if (!envFoud) {
    throw new Error("couldt find .env file")
};

// loggs para ambiente de dessarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

//variables de entorno, prefijo de la API
module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swager:{
        path: '/documentation'
    }
}