const ExpressServer = require('./server/expressServer')
const config = require('../config/index')
const logger = require('./logger/index')
const mongooseLoader = require('./mongoose/index')


//levantando servidor 
module.exports = async () => {

    await mongooseLoader();
    logger.info("DB loaded and connected")

    const server = new ExpressServer();
    logger.info("Express Loaded");

    server.start()
    logger.info(`
        ####################################
        server listen on port ${config.port}
        ####################################
    `);
};
