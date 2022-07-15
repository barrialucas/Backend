const ContenedorArchivo = require('../../contenedores/contArchivo')

class ProductoArchivo extends ContenedorArchivo {
    constructor() {
        super('./src/DB/DB_productos.json')
    }
}

module.exports = ProductoArchivo