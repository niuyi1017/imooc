const express = require('express')
const path =require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)


const port = process.env.port || 3000
const app = express() 

const dbUrl = 'mongodb://localhost/imooc_movie'
mongoose.connect(dbUrl, { useNewUrlParser: true })
app.set ('views', './app/views/pages')
app.set ('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: 'imooc',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // harlf of hour
  },
  store: new mongoStore({
    url: dbUrl,
    auto_reconnect: true,
    collection: 'sessions',
  })
}))

if ('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true);
}
require('./config/routes')(app)

app.locals.moment = require('moment')
app.use(express.static(path.resolve(__dirname,'public')))
app.listen(port)

console.log('node-mongodb started on port: ' + port)  

