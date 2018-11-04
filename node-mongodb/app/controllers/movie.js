const Movie = require('../models/movie')
const Comment = require('../models/comment')
const _ = require('underscore')

exports.detail = (req, res) => {
  let id = req.params.id
  Movie.findById(id, (err, movie) => {
    if (err) {
      console.log(err)
    }
    Comment
    .find({movie: id})
    .populate('from', 'name')
    .populate('reply.from reply.to', 'name')
    .exec((err, comments) => {
      if (err) {
        console.log(err)
      }
      console.log(comments)
      res.render('detail', {
        title: 'imooc ' + movie.title,
        movie,
        comments
      })
    })
  })
}

//admin page
exports.new = (req, res) => {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: "",
      director: "",
      country: "",
      year: "",
      poster: "",
      flash: "",
      summary: "",
      language: ""
    }
  })
}

//admin update page  
exports.update = (req, res) => {
  let id = req.params.id
  if (id) {
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err)
      }
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie
      })
    })
  }
}

// admin post movie    admin/movie/new
exports.save = (req, res) => {
  let id = req.body.movie._id
  let movieObj = req.body.movie
  let _movie


  if (id !== 'undefined') {
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(movie, movieObj)
      _movie.save((err, movie) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie({
      director: movieObj.director,
      title: movieObj.title,
      country: movieObj.country,
      year: movieObj.year,
      summary: movieObj.summary,
      flash: movieObj.flash,
      poster: movieObj.poster,
      language: movieObj.language,
    })
    _movie.save((err, movie) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/' + movie._id)
    })
  }
}

//list page
exports.list = (req, res) => {
  Movie.fetch((err, movies) => {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: 'imooc 列表页',
      movies
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
