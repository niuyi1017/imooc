const User = require('../models/user')

exports.showSignup = (req, res) => {
  res.render('signup', {
    title: '注册页面'
  })
}
exports.showSignin = (req, res) => {
  res.render('signin', {
    title: '登录页面'
  })
}
exports.signup = (req, res) => {
  let _user = req.body.user
  User.findOne({ name: _user.name }, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      return res.redirect('/signin')
    } else {
      let user = new User(_user)
      user.save((err, user) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/')
      })
    }
  })
}


//signin
exports.signin = (req, res) => {
  let _user = req.body.user
  let name = _user.name
  let password = _user.password

  User.findOne({ name: name }, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res.redirect('/signup')
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
        return res.redirect('/signin')
      }
    })
  })
}
//logout  
exports.logout = (req, res) => {
  delete req.session.user
  //delete app.locals.user
  res.redirect('/')
}
//userlist page
exports.list = (req, res) => {
  User.fetch((err, users) => {
    if (err) {
      console.log(err)
    }
    res.render('userList', {
      title: 'imooc 用户列表页',
      users
    })
  })
}