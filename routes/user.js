const router = require('express').Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('user login success');
});

/* GET user profile. */
router.get('/profile', (req, res, next)  => {
  res.send(req.user);
});



module.exports = router;