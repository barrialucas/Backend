const ContenedorMongo = require('../../contenedores/contMongo')
const ProductoModel = require('../../../modelos/producto.model')

class ProductoMongo extends ContenedorMongo {
    
    constructor() {
        super('mongodb://localhost/productos', ProductoModel)
    }

}

module.exports = ProductoMongo