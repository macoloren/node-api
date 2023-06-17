const winston = require('winston');
const config = require('../../config/index')



    const transports = [];
    transports.push(
        new winston.transports.Console(),
    )

    const loggerInstance = winston.createLogger({
        level: config.log.level,
        format: winston.format.simple(),
        transports
    });

    module.exports = loggerInstance