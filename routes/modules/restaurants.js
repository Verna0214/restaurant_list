const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  let restaurants = []
  let noResult = false // alert

  // 判斷使用者是否有輸入搜尋文字
  if (keyword) {
    Restaurant.find({
      $or: [ // 利用 mongoDB的運算式匹配各屬性
        { name: { $regex: keyword, $options: 'i' } },  // 運用 $regex 模糊比對及大小寫
        { name_en: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } }
      ], userId
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

// new page
router.get('/new', (req, res) => {
  res.render('new')
})

// detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// create
router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ 
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.name = name,
      restaurant.name_en = name_en,
      restaurant.category = category,
      restaurant.image = image,
      restaurant.location = location,
      restaurant.phone = phone,
      restaurant.google_map = google_map,
      restaurant.rating = rating,
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.deleteOne()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router