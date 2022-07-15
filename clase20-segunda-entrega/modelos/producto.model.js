const mongoose = require('mongoose');

const ProductModel = 
mongoose.model('Productos', new mongoose.Schema({
        producto: String,
        img: String,
        precio: Number
    })
);
 
module.exports = ProductModel;