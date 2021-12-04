// Here we are creating mongoDB models for storing data and then sending it to controller 

const mongoose = require('mongoose')








// Creating mongoose schema and defining its type
var myschema = new mongoose.Schema({
    name:{
        type:String,

    },
    category:{
        type:String,
    },
    image:String,
    price:String,
    description:String
})


const ItemDB = mongoose.model('productdb',myschema)

module.exports = ItemDB;