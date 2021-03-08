const router = require('express').Router();
const service = require('../service/patientService')
const {check,validationResult} = require('express-validator')

const cors = require('cors')
router.use(cors());
let corsOptions = {
    origin:true,
    methods:['GET','POST','OPTIONS'],
    allowHeaders:['Content-Type','Authorization']
}
const   passport = require('passport');

router.get('/',async(req,res)=>{
  //  res.json(await service.find());
  res.send('respond with a PatientInfomations');
});


router.get('/getdatabyhn/:hn',passport.authenticate('jwt', {session: false}), cors(corsOptions),
async (req,res)=>  {
    console.log(req.params.hn); // get method ดึงค่าจาก url :id
    //console.log(req.body); //  ดึงค่าจากฟอร์มและส่งแบบ post
    try{
        // validationResult(req).throw();
        //req.validate();
        const model = await service.findOnegett(req.params.hn);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
});


router.get('/getdatabyvn/:vn', passport.authenticate('jwt', {session: false}),cors(corsOptions),
async (req,res)=>  {
    //console.log(req.params.hn); // get method ดึงค่าจาก url :id
    //console.log(req.body); //  ดึงค่าจากฟอร์มและส่งแบบ post
    try{
        // validationResult(req).throw();
        //req.validate();
        const model = await service.findOnegetvn(req.params.vn);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
});


router.get('/getdatabyan/:an', passport.authenticate('jwt', {session: false}),cors(corsOptions),
async (req,res)=>  {
    //console.log(req.params.hn); // get method ดึงค่าจาก url :id
    //console.log(req.body); //  ดึงค่าจากฟอร์มและส่งแบบ post
    try{
        // validationResult(req).throw();
        //req.validate();
        const model = await service.findOnegetan(req.params.an);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
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

router.post('/getdatabyvn',
[check('vn','ไม่ได้ใส่ข้อมูล  หรือ กรอกไม่ครบ 12 หลัก').not().isEmpty().isLength({ min: 12 })],
async (req,res)=>  {
    try{
        // validationResult(req).throw();
        req.validate();
        const model = await service.findOnevn( req.body);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
});


router.post('/getdatabyan',
[check('an','ไม่ได้ใส่ข้อมูล  หรือ กรอกไม่ครบ 9 หลัก').not().isEmpty().isLength({ min: 9 })],
async (req,res)=>  {
    try{
        req.validate();
        const model = await service.findOnean( req.body);
        res.status(200).json(model);
    }catch(ex){
        // res.status(400).json({message:ex.message}) ///การเรียกใช้เดิมไม่สามารถรู้ได้ error ตัวไหน
        res.error(ex)// เรียกฝช้จาก middleware ที่ถูกใช้งานผ่าน index file
    }
 
});





module.exports = router;