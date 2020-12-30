const router = require('express').Router(),
      jwt = require('jsonwebtoken'),
      passport = require('passport')


/* POST login. */
router.post('/login', ( req, res, next ) => {
  
  passport.authenticate('local', { session: false }, (err, user, info) => {
    
    if (err) return next(err)

    if(user) {
      const token = jwt.sign(user, 'your_jwt_secret')
      return res.json({ token}) //หลังจาก login สำเร็จให้แสดงค่าตอบกลับแค่ token หากต้องการให้แสดงข้อมูล user ทั้งหมดด้วยใช้เป็น res.json({ user,token}) 
    } else {
      return res.status(422).json(info);
    }

  })(req, res, next)

})

module.exports = router