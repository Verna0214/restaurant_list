// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
// 判斷執行環境再載入 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

// set handlebars
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
// set static
app.use(express.static('public'))
// use express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
// use body-parser
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))
// use passport
usePassport(app)
// use flash
app.use(flash())
// middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// use router
app.use(router)
// start server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})