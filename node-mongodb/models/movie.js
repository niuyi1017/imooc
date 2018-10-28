const mongoose = require('mongoose')
const movieSchema = require('../schemas/movie')
const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
