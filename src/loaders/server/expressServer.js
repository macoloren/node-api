const express = require('express');
const morgan =  require('morgan')
const config = require("../../config")


//inicialisa servidor de express 
class ExpressServer {

    constructor() {
        this.app = express();
        this.port = config.port
        this.basePath = config.api.prefix

        this._middlewares();
        this._routes();
    };

    //permita objetos tipo json
    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    };

    //inyectando las rutas a la api
    _routes() {

        //endpoit para monitoriar la api si esta viva
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.app.use(`${this.basePath}/users`, require('../../routes/users.routes'))
    }

    //iniciando server, en que puerto esta escuchando la app
    async start() {
        this.app.listen(this.port, (error) => {
            if (error) {
                console.log(err);
                process.exit(1);
                return;
            };
        });
    };
};

module.exports = ExpressServer