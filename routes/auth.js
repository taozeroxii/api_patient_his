const router = require('express').Router(),
      jwt = require('jsonwebtoken'),
      passport = require('passport')


/* POST login. */
router.post('/login', ( req, res, next ) => {
  
  passport.authenticate('local', { session: false }, (err, user, info) => {
    
    if (err) return next(err)

    if(user) {
      const token = jwt.sign(user, 'your_jwt_secret') //your_jwt_secret คือใส่ค่าอะไรลงไปก็ได้เพื่อให้ server ตรวจสอบว่าเป็น SIGNATURE token ที่ถูกสร้างจาก server ตัวเอง ต้องใส่ให้ตรงกับ passport.js 
      return res.json({ token}) //หลังจาก login สำเร็จให้แสดงค่าตอบกลับแค่ token หากต้องการให้แสดงข้อมูล user ทั้งหมดด้วยใช้เป็น res.json({ user,token}) 
    } else {
      return res.status(422).json(info);
    }

  })(req, res, next)

})

module.exports = router