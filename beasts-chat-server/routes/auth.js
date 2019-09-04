const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get('/google',passport.authenticate('google', {
  scope:['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('redirect URI ', req.user);
  res.end('redirect URI for' +  req.user.name);
});

module.exports = router;
