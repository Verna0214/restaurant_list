const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  restaurantList.forEach(item => {
    Restaurant.create({
      name: `${item.name}`,
      name_en: `${item.name_en}`,
      category: `${item.category}`,
      image: `${item.image}`,
      location: `${item.location}`,
      phone: `${item.phone}`,
      google_map: `${item.google_map}`,
      rating: `${item.rating}`,
      description: `${item.description}`
    })
  })
  console.log('done.')
})