const express = require('express'),
      app = express(),
      passport = require('passport'),
      port = process.env.PORT || 3000

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

//ปกป้อง HTTP HEADER ด้วย Helmet
var helmet = require('helmet')
app.use(helmet())

// Set Parses JSON 
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//สร้าง custom function
app.use(require('./configs/middleware'))

// Import passport
require('./configs/passport');

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/user',  passport.authenticate('jwt', {session: false}), require('./routes/user'))
app.use('/patientinfomations',  passport.authenticate('jwt', {session: false}), require('./routes/patientinfomations'))

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

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))