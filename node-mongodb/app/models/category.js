const mongoose = require('mongoose')
const categorySchema = require('../schemas/category')
const Category = mongoose.model('Category', categorySchema)
module.exports = Category
