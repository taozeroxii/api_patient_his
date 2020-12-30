const router = require('express').Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('user login success');
});

/* GET user profile. */
router.get('/profile', (req, res, next)  => {
  res.send(req.user);//แสดงรายละเอียดทั้งหมดของ user หากต้องการแสดงแค่ข้อมูลชื่อใช้ .sub ต่อท้าย
});



module.exports = router;