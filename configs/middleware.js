const { validationResult } = require("express-validator");

module.exports = function (req, res, next) {
    //ตรวจสอบ validation
    req.validate = function () {
        const errors = validationResult(req).array();
        if (errors.length == 0) return;
        //console.log(errors);
        throw new Error(`${errors[0].param}:${errors[0].msg}`)//หากเจอ error ให้ส่งค่า errors ช่อง 0.params
    }
    //แสดง error ออกไป
    res.error = function (ex) {
        res.status(400).json({  message: ex.message });
    };
    next();
};
