// var express = require("express");
// var db = require("../config/dbConnection");
// var path = require("path");
// const multer = require("multer");
// const fs  = require("fs");

// const storage = multer.diskStorage({
//   destination : './upload/images',
//   filename : (req, file, cb)=>{
//     return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
//   }
  
// })
// const upload = multer({
//   storage : storage
//  });

// var router = express.Router();

// router.get("/", (req, res) => {

//   var imagesList =path.join("upload/images")
//   console.log(imagesList);
//   fs.readdir(imagesList, (err, files)=>{
//     if(err){
//       console.log(err);
//       // return res.send(err)
//     }
//     if(files.length == 0){
//       console.log('lenght 0 ');
//       // return res.send('No files there ')
//     }
//     // return res.json({files})
//     console.log('image files- ',files);
    
//   })


//   res.json({ message: "index page render" });
// });

// router.post("/addCoupon", upload.single("image"), (req, res, next) => {
//   console.log(req.body, 'add-- ', req.file);
//   var image_filename= ''
//   if(req.file){
//     image_filename = req.file.filename
//   }
//   db.query(
//     `INSERT INTO onlinecoupons (title, category,code, image, validity, image_path) VALUES ('${req.body.title}','${req.body.category}','${req.body.code}','${req.body.image}','${req.body.validity}', '${image_filename}') `,
//     (err, result) => {
//       // user does not exists
//       if (err) {
//         res.status(200).send({
//           message: err,
//           content: [],
//           is_success: false,
//         });
//         // throw err;
//       } else {
//         let coupon = [result];
//         return res.status(200).json({
//           message: "coupon added",
//           content: coupon,
//           is_success: true,
//         });
//       }
//     }
//   );
// });

// router.get("/getAllCategory", (req, res, next) => {
//   db.query(`SELECT DISTINCT category FROM onlinecoupons`, (err, result) => {
//     // db.query(`SELECT * FROM onlinecoupons`, (err, result) => {
//     // user does not exists
//     if (err) {
//       res.status(200).send({
//         message: err,
//         content: [],
//         is_success: false,
//       });
//       // throw err;
//     } else {
//       let coupon = [result];
//       return res.status(200).json({
//         message: "Category list",
//         content: coupon[0],
//         is_success: true,
//       });
//     }
//   });
// });

// router.post("/getCouponsList", (req, res, next) => {
//   db.query(
//     `SELECT * FROM onlinecoupons`,
//     // `SELECT * FROM onlinecoupons where category = '${req.body.category}'`,
//     (err, result) => {
//       // user does not exists
//       if (err) {
//         res.status(200).send({
//           message: err,
//           content: [],
//           is_success: false,
//         });
//         // throw err;
//       } else {
//         let coupon = [result];
    
//         return res.status(200).json({
//           message: "Category list",
//           content: coupon[0],
//           is_success: true,
//         });
//       }
//     }
//   );
// });

// module.exports = router;
