const router = require('express').Router();
const service = require('../service/patientService')
const {check,validationResult} = require('express-validator')

router.get('/',async(req,res)=>{
  //  res.json(await service.find());
  res.send('respond with a PatientInfomations');
});

router.post('/getdatabyhn',
[check('hn','ไม่ได้ใส่ข้อมูล  หรือ กรอกไม่ครบ 9 หลัก').not().isEmpty().isLength({ min: 9 })],
async (req,res)=>  {
    //console.log(req.params.id); // get method ดึงค่าจาก url :id
    //console.log(req.body); //  ดึงค่าจากฟอร์มและส่งแบบ post
    try{
        // validationResult(req).throw();
        req.validate();
        const model = await service.findOne( req.body);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
});


module.exports = router;