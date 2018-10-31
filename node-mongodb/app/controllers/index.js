const Movie = require('../models/movie')

exports.index = (req, res) => {
  Movie.fetch((err, movies) => {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: 'imooc 首页',
      movies
    })
  })
}