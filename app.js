const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Done')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})