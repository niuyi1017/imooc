const Movie = require('../models/movie')
const Category = require('../models/category')

exports.index = (req, res) => {
  Category
    .find({})
    .populate({path:'movies', options: {limit: 5}})
    .exec((err, categories) => {
      if (err) {
        console.log(err)
      }
      res.render('index', {
        title: 'imooc 首页',
        categories
      })
    })
  }