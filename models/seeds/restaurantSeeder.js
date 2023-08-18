const bcrypt = require('bcryptjs')
// 判斷執行環境再載入 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => {
          return User.create({
            name: user.name,
            email: user.email,
            password: hash
          })
        })
    })
  )
  .then((users) => {
    const user1_id = users[0]._id
    const user2_id = users[1]._id

    Promise.all(
      restaurantList.map((res, resIndex) => {
        if (resIndex < 4) {
          res.userId = user1_id
        } else {
          res.userId = user2_id
        }
        return Restaurant.create(res)
      })
    )
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
  })

})

