
//para que todas las respuestas retornadas tengan el mismo formato
class Success {
    constructor(data) {
        this.status = "ok",
        this.data = data
    }
};

module.exports  = Success;