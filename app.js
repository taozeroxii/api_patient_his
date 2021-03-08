const express = require('express'),
      app = express(),
      passport = require('passport'),
      port = process.env.PORT || 4132

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

//ปกป้อง HTTP HEADER ด้วย Helmet
var helmet = require('helmet')
app.use(helmet())

// Set Parses JSON 
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// app.use((req, res, next) => {
//   // const ALLOW_ORIGIN = [ 'http://localhost:3003', 'https://hospital-admin-dev.daywork.co', ' https://hospital-admin.daywork.co','https://young-citadel-10757.herokuapp.com']                     
//   // const ORIGIN = req.headers.origin 
                              
//   // if (ALLOW_ORIGIN.includes(ORIGIN)) {
//   //    res.header('Access-Control-Allow-Origin', ORIGIN)
//   // }
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods','POST,GET,OPTIONS')
//   res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
//   next()
// })


//สร้าง custom function
app.use(require('./configs/middleware'))

// Import passport
require('./configs/passport');

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/user',  passport.authenticate('jwt', {session: false}), require('./routes/user'))
app.use('/patientinfomations',  require('./routes/patientinfomations'))


//Route ดึงข้อมูลส่ง โปรแกรมพี่จักกฤษ ยังไม่เอา authen 
app.use('/patientinfomations2', require('./routes/patientinfomations2'))
//app.use('/patientinfomations2', require('./routes/patientinfomations2'))


// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    }
  });
});

app.get('*', function (req, res) {
  res.status(200).json({ok:true,"apiCode": "HISCONNECT","apiName": "Data From His","version": "0.0.1",})
})

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))