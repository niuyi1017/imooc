const Index = require('../app/controllers/index')
const User = require('../app/controllers/user')
const Movie = require('../app/controllers/movie')

module.exports = (app) => {
  //pre handle user
  app.use((req, res, next) => {
    let _user = req.session.user
    app.locals.user = _user
    next()
  })

  //index page
  app.get('/', Index.index)

  //user
  app.post('/user/signup', User.signup)
  app.post('/user/signin', User.signin)
  app.get('/logout',User.logout)
  app.get('/admin/userList', User.list)

  //movie
  app.get('/movie/:id', Movie.detail)
  app.get('/admin/movie', Movie.new) 
  app.get('/admin/update/:id', Movie.update)
  app.post('/admin/movie', Movie.save)
  app.get('/admin/list', Movie.list)  
  app.delete('/admin/list', Movie.del)
}