const ExpressServer = require('./server/expressServer')
const config = require('../config/index')
const logger = require('./logger/index')


//levantando servidor 
module.exports = async () => {

    const server = new ExpressServer();
    logger.info("Express Loaded");

    server.start()
    logger.info(`
        ####################################
        server listen on port ${config.port}
        ####################################
    `);
};
