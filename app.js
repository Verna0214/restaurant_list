const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const restaurantList = require('./restaurant.json')
const port = process.env.PORT || 3000

// set handlebars
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// set static
app.use(express.static('public'))

// router
app.get('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  const restaurant = restaurantList.results.find(item => item.id === id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('search', { restaurants, keyword })
})

app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})