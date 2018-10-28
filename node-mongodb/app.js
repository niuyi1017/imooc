const express = require('express')
const path =require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('underscore')
// var multer = require('multer'); // v1.0.5
// var upload = multer()
const Movie = require('./models/movie')

const port = process.env.port || 3000
const app = express() 

// mongoose.connect('mongodb://localhost/imooc_movie', { useNewUrlParser: true })
mongoose.connection.openUri('mongodb://localhost/imooc_movie', { useNewUrlParser: true })
app.set ('views', './views/pages')
app.set ('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname,'public')))
app.listen(port)

console.log('node-mongodb started on port: ' + port)  

//index page
app.get('/', (req, res) => {
  Movie.fetch((err, movies) => {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: 'imooc 首页',
      movies
    })
  })
})
//detail page
app.get('/movie/:id', (req, res) => {
  let id = req.params.id
  Movie.findById(id, (err, movie) => {
    res.render('detail', {
      title: 'imooc ' + movie.title,
      movie
    })
  })
})

//admin page
app.get('/admin/movie', (req, res) => {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie:{
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
})

//admin update page  
app.get('/admin/update/:id', (req, res) => {
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
})

// admin post movie    admin/movie/new
app.post('/admin/movie/new', (req, res) => {
  // console.log(req.body)
  let id = req.body.movie._id
  // let id = req.body.id
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

})
//list page
app.get('/admin/list', (req, res) => {
  Movie.fetch((err, movies) => {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: 'imooc 列表页',
      movies
    })
  })
})  

//list delete movie  

app.delete('/admin/list', (req, res) => {
  let id = req.query.id

  if (id) {
    Movie.remove({ _id: id}, (err, movie) => {
      if (err) {
        console(err)
      }
      else {
        res.json({success: 1})
      }
    })
  }
})
