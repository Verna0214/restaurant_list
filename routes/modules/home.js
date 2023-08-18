const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// index page
router.get('/', (req, res) => {
  const sort = req.query.sortType
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .then((allRestaurants) => {
      let restaurants = [...allRestaurants]

      restaurants.sort((a, b) => {
        switch(sort) {
          case 'asc':
            return a.name_en < b.name_en ? -1 : 1
          case 'desc':
            return a.name_en > b.name_en ? -1 : 1
          case 'category':
            return a.category < b.category ? -1 : 1
          case 'location':
            return a.location < b.category ? -1 : 1
          default:
            return 0
        }
      })
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

module.exports = router