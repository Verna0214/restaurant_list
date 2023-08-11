// require related modules
const express = require('express')
const exphbs = require('express-handlebars')

const Restaurant = require('./models/restaurant')
const router = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

// set handlebars
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// set static
app.use(express.static('public'))
// use router
app.use(router)


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  let noResult = false

  const restaurants = restaurantList.results.filter(item => {
    return (item.name.toLowerCase().includes(keyword.toLowerCase()) ||
    item.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
    item.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  
  if (!keyword.length || !restaurants.length) {
    noResult = true
  }

  res.render('index', { restaurants, keyword, noResult})
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})