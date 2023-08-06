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
app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})