const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/facebook/callback', passport.authenticate('facebook', { 
  successRedirect: '/',
  failureRedirect: '/users/login' })
)

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

module.exports = router