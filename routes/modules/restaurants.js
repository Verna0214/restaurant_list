const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  let restaurants = []
  let noResult = false // alert

  // 判斷使用者是否有輸入搜尋文字
  if (keyword) {
    Restaurant.find({
      $or: [ // 利用 mongoDB的運算式匹配各屬性
        { name: { $regex: keyword, $options: 'i' } },  // 運用 $regex 模糊比對及大小寫
        { name_en: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } }
      ]
    })
      .lean()
      .then((results) => {
        restaurants = results  // 將匹配結果賦值 restaurants，下一步檢查
        noResult = !restaurants.length
        return res.render('index', { restaurants, keyword, noResult })
      })
      .catch(error => console.log(error))
  } else { // 使用者若沒有輸入搜尋文字
    noResult = true
    return res.render('index', { restaurants, keyword, noResult })
  }
})

// create
router.post('/new', (req, res) => {
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  return Restaurant.create({ 
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


module.exports = router