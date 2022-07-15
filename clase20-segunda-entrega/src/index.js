const CartArchivo = require('./daos/carro/cartArchivo')
const ProductoArchivo = require('./daos/productos/prodArchivo')

const CartMemoria = require('./daos/carro/cartMemoria')
const ProductoMemoria = require('./daos/productos/prodMemoria')

const CartMongo = require('./daos/carro/cartMongo')
const ProductoMongo = require('./daos/productos/prodMongo')

const FactoryDAO = () => {

    const typeDB = process.env.typeDB;

    if(typeDB == 'memoria') {
        console.log('Generate DAO with memory');
        return {
            cart: new CartMemoria(),
            producto: new ProductoMemoria()
        }
    } else if(typeDB == 'archivo') {
        console.log('Generate DAO with file');
        return {
            cart: new CartArchivo(),
            producto: new ProductoArchivo()
        }
    } else if(typeDB == 'mongo') {
        console.log('Generate DAO with mongo');
        return {
            cart: new CartMongo(),
            producto: new ProductoMongo()
        }
    }

    throw new Error('typeDB is not found')
}

module.exports = FactoryDAO