const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  // 初始化
  // 與 session 結合
  app.use(passport.initialize())
  app.use(passport.session())

  // set localStrategy
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: '使用者未註冊！' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email 或 Password 輸入錯誤！'})
        }
        return done(null, user)
      })
      .catch(err => done(err, null))
  }))

  // 序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}