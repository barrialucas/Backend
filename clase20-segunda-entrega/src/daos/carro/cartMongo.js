const ContenedorMongo = require('../../contenedores/contMongo')
const CartModelo = require('../../../modelos/carro.model')

class CartMongo extends ContenedorMongo {
    
    constructor() {
        super('mongodb://localhost/productos', CartModelo)
    }

}

module.exports = CartMongo