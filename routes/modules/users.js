const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register post
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push('必填欄位未完成！')
  }
  if (password !== confirmPassword) {
    errors.push('密碼與確認密碼不相符！')
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push('使用者曾已註冊！')
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => User.create({ name, email, password: hash })
          .then(() => res.redirect('/users/login'))
          .catch(error => console.log(error))
          )
    })
    .catch(error => console.log(error))
})

// login router
router.post('/login', passport.authenticate('local',{ failureRedirect: '/users/login', failureFlash: true}), (req, res) => {
   res.redirect('/')
  }
)

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})

module.exports = router