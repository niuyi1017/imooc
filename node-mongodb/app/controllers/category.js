const Category = require('../models/category')

//admin page
exports.new = (req, res) => {
  console.log('category new')
  res.render('category_admin', {
    title: 'imooc 后台分类录入页',
    category:{}
  })
}


// admin post movie    admin/movie/new
exports.save = (req, res) => {
  let _category = req.body.category
  let category = new Category(_category)
  category.save((err, category) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/admin/category/list')
    })
}


//category page
exports.list = (req, res) => {
  Category.fetch((err, categories) => {
    if (err) {
      console.log(err)
    }
    res.render('categorylist', {
      title: 'imooc 分类列表页',
      categories
    })
  })
}

//list delete movie  

exports.del = (req, res) => {
  let id = req.query.id
  if (id) {
    Movie.deleteOne({ _id: id }, (err, movie) => {
      if (err) {
        console(err)
      }
      else {
        res.json({ success: 1 })
      }
    })
  }
}
