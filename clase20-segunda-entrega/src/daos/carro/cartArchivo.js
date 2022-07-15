const ContenedorArchivo=require('../../contenedores/contArchivo')

class CartArchivo extends ContenedorArchivo {
    
    constructor() {
        super('./src/DB/DB_carts.json')
    }

}

module.exports = CartArchivo