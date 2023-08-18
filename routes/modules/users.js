const express = require('express')
const passport = require('passport')
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
  
  if (!email || !password || !confirmPassword) {
    console.log('必填欄位未完成！')
    return res.render('register', { name, email, password, confirmPassword })
  }
  if (password !== confirmPassword) {
    console.log('密碼與確認密碼不相符！')
    return res.render('register', { name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('使用者曾已註冊！')
        return res.render('register', { name, email, password, confirmPassword })
      }

      return User.create({ name, email, password })
        .then(() => res.redirect('/users/login'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// login router
router.post('/login', passport.authenticate('local',{
  failureRedirect: '/users/login',
  successRedirect: '/',
}))

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})

module.exports = router