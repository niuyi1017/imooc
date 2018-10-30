const Movie = require('../models/movie')
const User = require('../models/user')
const _ = require('underscore')

module.exports = (app) => {
  //pre handle user
  app.use((req, res, next) => {
    let _user = req.session.user
    if (_user) {
      app.locals.user = _user
    }
    next()
  })

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

  //signup
  app.post('/user/signup', (req, res) => {
    let _user = req.body.user
    User.findOne({ name: _user.name }, (err, user) => {
      if (err) {
        console.log(err)
      }
      if (user) {
        return res.redirect('/')
      } else {
        let user = new User(_user)
        user.save((err, user) => {
          if (err) {
            console.log(err)
          }
          res.redirect('/admin/userList')
        })
      }
    })
  })

  //signin
  app.post('/user/signin', (req, res) => {
    let _user = req.body.user
    let name = _user.name
    let password = _user.password

    User.findOne({ name: name }, (err, user) => {
      if (err) {
        console.log(err)
      }
      if (!user) {
        return res.redirect('/')
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.log(err)
        }
        if (isMatch) {
          console.log("Password is matched!")
          req.session.user = user
          return res.redirect('/')
        } else {
          console.log("Password is not matched!")
          return res.redirect('/')
        }
      })
    })
  })
  app.get('/logout', (req, res) => {
    delete req.session.user
    delete app.locals.user
    res.redirect('/')
  })
  //userlist page
  app.get('/admin/userList', (req, res) => {
    User.fetch((err, users) => {
      if (err) {
        console.log(err)
      }
      res.render('userList', {
        title: 'imooc 用户列表页',
        users
      })
    })
  })

  //detail page
  app.get('/movie/:id', (req, res) => {
    let id = req.params.id
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err)
      }
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
      Movie.deleteOne({ _id: id }, (err, movie) => {
        if (err) {
          console(err)
        }
        else {
          res.json({ success: 1 })
        }
      })
    }
  })

}