const pgconnection = require('../configs/database');

module.exports = {
    find() {
        return new Promise((resolve,reject)=>{
            pgconnection
            .query(`SELECT hn,cid as personal_id,pname,fname,lname,sex as gender,
            case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text
            ,cz.emp_citizenship_name as citizen,pt.addrpart,pt.moopart,pt.tmbpart,pt.amppart,pt.chwpart,concat(pt.addrpart,' หมู่ ',pt.moopart,ta.full_name) as fulladdress,
            pt.po_code as post_code,
            mobile_phone_number
            ,death
            ,fathername,pt.motherlname,firstday as firstvisit,marrystatus,mt.name as marryname,type_area
            FROM patient pt
            LEFT JOIN emp_citizenship cz on cz.emp_citizenship_id  = pt.citizenship
            LEFT JOIN marrystatus mt on mt.code = pt.marrystatus
            LEFT JOIN thaiaddress ta on ta.addressid = concat(pt.chwpart,pt.amppart,pt.tmbpart)
            limit 100 `  ,(error,result)=>{
                if(error) return reject(error)
                
                resolve(result.rows)
            });
        });
    },

    findOnegett(value) {
        console.log(value);
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
                case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text
               -- ,cz.emp_citizenship_name as citizen,pt.addrpart,pt.moopart,pt.tmbpart,pt.amppart,pt.chwpart,concat(pt.addrpart,' หมู่ ',pt.moopart,ta.full_name) as fulladdress,
               -- pt.po_code as post_code,   mobile_phone_number ,death ,fathername,pt.motherlname,firstday as firstvisit,marrystatus,mt.name as marryname,type_area
                FROM patient pt
                LEFT JOIN emp_citizenship cz on cz.emp_citizenship_id  = pt.citizenship
                LEFT JOIN marrystatus mt on mt.code = pt.marrystatus
                LEFT JOIN pttype pty on pty.pttype = pt.pttype
                LEFT JOIN thaiaddress ta on ta.addressid = concat(pt.chwpart,pt.amppart,pt.tmbpart)  where hn=$1::text`,[value],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    },

    findOnegetvn(value) {
        console.log(value);
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
            case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text,
            ov.pt_priority,pp.name as pt_priority_name
            FROM ovst  ov
            INNER JOIN patient pt on pt.hn = ov.hn
            left JOIN pt_priority pp on pp.id = ov.pt_priority
            where vn = $1::text`,[value],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    },

    findOnegetan(value) {
        console.log(value);
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
            case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text,
            ov.pt_priority,pp.name as pt_priority_name
            FROM ovst  ov
            INNER JOIN patient pt on pt.hn = ov.hn 
            left JOIN pt_priority pp on pp.id = ov.pt_priority
            where an=$1::text`,[value],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    },

    findOne(value) {
        //console.log(value.hn);
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
                case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text
               -- ,cz.emp_citizenship_name as citizen,pt.addrpart,pt.moopart,pt.tmbpart,pt.amppart,pt.chwpart,concat(pt.addrpart,' หมู่ ',pt.moopart,ta.full_name) as fulladdress,
               -- pt.po_code as post_code,   mobile_phone_number ,death ,fathername,pt.motherlname,firstday as firstvisit,marrystatus,mt.name as marryname,type_area
                FROM patient pt
                LEFT JOIN emp_citizenship cz on cz.emp_citizenship_id  = pt.citizenship
                LEFT JOIN marrystatus mt on mt.code = pt.marrystatus
                LEFT JOIN pttype pty on pty.pttype = pt.pttype
                LEFT JOIN thaiaddress ta on ta.addressid = concat(pt.chwpart,pt.amppart,pt.tmbpart) where hn=$1::text`,[value.hn],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    },


    findOnevn(value) {
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
                case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text,
                ov.pt_priority,pp.name as pt_priority_name
                FROM ovst  ov
                INNER JOIN patient pt on pt.hn = ov.hn
                left JOIN pt_priority pp on pp.id = ov.pt_priority
                where vn = $1::text`,[value.vn],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    },

    findOnean(value) {
        return new Promise ((resolve,reject)=>{
            pgconnection
            .query(`SELECT pname,fname,lname,sex as gender,
                case when sex = '1' then 'ชาย' else 'หญิง' END as gender_text,
                ov.pt_priority,pp.name as pt_priority_name
                FROM ovst  ov
                INNER JOIN patient pt on pt.hn = ov.hn 
                left JOIN pt_priority pp on pp.id = ov.pt_priority
                where an=$1::text`,[value.an],(error,result)=>{
                if(error) return reject(error)
               // resolve(result.length > 0 ? result[0] : null)
               resolve(result.rows[0])
            } )
        })
    }



}