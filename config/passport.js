const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (app) => {
  // 初始化
  // 與 session 結合
  app.use(passport.initialize())
  app.use(passport.session())

  // set localStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true, }, (req, email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '使用者未註冊！'))
        }
        return bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email 或 Password 錯誤！'))
            }
            return done(null, user)
          })
          .catch(err => done(err, false))
      })
      .catch(err => done(err, false))
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