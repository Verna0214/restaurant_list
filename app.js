const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

// set handlebars
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// router
app.get('/', (req, res) => {
  res.send('Done')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})