const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/profile', function(req, res, next) {
  console.log('profile data for:', req.user);
  if(req.user) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

module.exports = router;
