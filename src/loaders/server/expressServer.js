const express = require('express');
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
const config = require("../../config")
const logger = require('../logger/index');
const { error } = require('winston');


//inicialisa servidor de express
class ExpressServer {

    constructor() {
        this.app = express();
        this.port = config.port
        this.basePath = config.api.prefix

        this._middlewares();
        this._status()
        this._swaggerConfig();
        this._routes();


        this._notfoud();
        this._errorHandler();

    };


    //permita objetos tipo json
    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    };

    //inyectando las rutas a la api
    _routes() {
        this.app.use(`${this.basePath}/users`, require('../../routes/users.routes'))
    }

    //endpoit para monitoriar la api si esta viva, (online)
    _status() {
        this.app.head("/status", (req, res) => {
            res.status(200).json('Aplication Up');
        });
    };

    //middleware, manejo de errores, exepciones (404 not foud) 
    _notfoud() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.code = 404;
            next(err);
        })
    };

    //manejador de erroes, exepciones, errores internos de toda la app
    _errorHandler() {
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;

            //info del error
            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);

            res.status(code);
            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            };
            res.status(code).json(body)
        });
    };

    //documentacion Swagger
    _swaggerConfig() {
        this.app.use(
            config.swager.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swagger.json')) //donde estara escrita la documentacion
        );
    };

    //iniciando server, en que puerto esta escuchando la app
    async start() {
        this.app.listen(this.port, (error) => {
            if (error) {
                logger.error(err);
                process.exit(1);
                return;
            };
        });
    };
};

module.exports = ExpressServer