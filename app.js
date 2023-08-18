// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 判斷執行環境再載入 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

// set handlebars
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
// set static
app.use(express.static('public'))
// use body-parser
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))
// use router
app.use(router)
// start server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})