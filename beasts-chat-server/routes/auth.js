const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');


/* GET users listing. */
router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'))
});

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
  res.redirect('/index.html')
});


module.exports = router;
