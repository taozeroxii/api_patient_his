# ระบบ api his hosxp-4 postgre demo การติดตั้ง

0.  Install all package npm install ลง node package ทั้งหมด สร้างไฟล์ configs.js และconnect database ได้เลย ปัจจุบันใช้ของ postgresql
1.  test runproject npm start สั่งรันโปรเจค
2.  login authenticate by postman passport
ล็อกอิน post ใน url  localhost:3000/auth/login  
โดยส่ง email password ให้ตรงกับที่ตั้งไว
  ในตัวอย่างใช้ค่าใน mockdata
   Mock Data user   
   const user = {
     id: 1,
     sub: 'test1234',
     email: 'test@gmail.com' 
   }

 หลังส่งค่าไปจะได้ค่าตอบกลับเป็นข้อมูล user ทั้งหมดมารวมถึง token ที่ใช้งานแทน session  token Type Bearer 
 ตัวอย่าง 
 ```
 "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjA5MzIxNDI0fQ.9K61skvzaKdB8MpOFuI4CEnvy7Na__qNk2Y9-BOt-pw"
 ```
 ลองเทสเข้า url localhost:<port>/user/profile เพื่อดูว่า login แล้วหรือไม่ต้องส่งค่า Token ที่ได้จากการ lognin  หาก login แล้วจะรีเทรินค่า user name password id กลับมาเป็น json format

 Then Your get token Type Bearer Copy token to Authorization and paste your can get data  สามารถดึงข้อมูลจากในฐานข้อมูล his รพ ได้โดยต้องส่ง token มาพร้อมกับเลข hn  
 from url จากพาร์ทนี้
   - http://yourip/patientinfomations/getdatabyhn METHODS POST hn and server responds information patient from his

# 3.Running ใช้งาน ผ่าน pm2 ใน server  
 - 3.1 กรณี windows ให้ติดตั้ง auto start ด้วยคำสั่ง
 - 3.1.1 npm install pm2-windows-startup -g
 - 3.1.2 pm2-startup install
 - 3.2 กรณี Linux ให้ใช้คำสั้ง pm2 startup
 - 3.3 start การใช้งาน API ด้วยคำสั่ง pm2 start app.js -i 2 --name "api_getdatafromhis"  ชื่อ --name จะต้องตรงกับค่า PM2_NAME ใน config file
 - 3.4 ใช้คำสั่ง pm2 save เพื่อบันทึกค่าที่ใช้งานในปัจจุบัน
 - 3.5 เปิด http://localhost:<port ที่กำหนดตาม config> ใน browser เพื่อแสดงผล 
 - 3.6 ทดสอบการเชื่อมต่อฐานข้อมูล HIS http://localhost:<port>



 cradit การสั่งรัน pm2 บนserver https://medium.com/pnpsolution/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3-run-node-js-%E0%B8%9A%E0%B8%99-server-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-pm2-fd66c1e54b60
 
 
 cradit.การทำ JWT TOKEN อ่านเพิ่มเติมได้ที่ 
 https://medium.com/@siriphonnot/%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89-jwt-%E0%B8%81%E0%B8%B1%E0%B8%9A-passport-js-authentication-7d5bde58bd22

 
