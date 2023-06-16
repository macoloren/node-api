const ExpressServer = require('./server/expressServer')
const config = require('../config/index')


//levantando servidor 
module.exports = async () => {

    const server = new ExpressServer();
    console.log("Express Loaded");

    server.start()
    console.log(`####################################`);
    console.log(`server listen on port ${config.port}`);
    console.log(`####################################`);
    
};
