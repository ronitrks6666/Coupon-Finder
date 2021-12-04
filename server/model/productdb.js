const mongoose = require('mongoose')











var productschmea = new mongoose.Schema({
    category:String,
    name:String,
    image:String
})

const ProductDB =  mongoose.model('product',productschmea)

module.exports = ProductDB