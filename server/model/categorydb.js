const mongoose = require('mongoose')











var catschmea = new mongoose.Schema({
    category:String,
})

const CategoryDB =  mongoose.model('category',catschmea)

module.exports = CategoryDB