const passport      = require('passport'),
      passportJWT   = require("passport-jwt"),
      ExtractJWT    = passportJWT.ExtractJwt,
      JWTStrategy   = passportJWT.Strategy,
      LocalStrategy = require('passport-local').Strategy

// Mock Data สร้างข้อมูลการ login โดยไม่ดึงจากdb 
const user = {
  id: 1,
  sub: 'cpaapidatafromhis_to_anoterprogram',
  email: 'test@gmail.com'
  // ,password:'yourpassword' // ไม่ควรเก็บ password ในtoken
}
 
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (email, password, cb) => {        

    //this one is typically a DB call.
    if (email !== user.email || password !== user.sub) 
      return cb(null, false, {message: 'Incorrect email or password.'})
            
    return cb(null, user, {message: 'Logged In Successfully'})
  }
));


passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret' //your_jwt_secret คือใส่ค่าอะไรลงไปก็ได้เพื่อให้ server ตรวจสอบว่าเป็น SIGNATURE  token ที่ถูกสร้างจาก server ตัวเอง
    },
    (jwtPayload, cb) => {

      try {
        // find the user in db if needed
        if(jwtPayload.id == user.id) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      } catch (error) {
        return cb(error, false);
      }
    }
));