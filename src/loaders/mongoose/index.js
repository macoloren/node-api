const mongoose = require('mongoose');
const config = require("../../config")

//conexion a base de datos
module.exports = async () => {
    await mongoose.connect(config.databaseURL);
};