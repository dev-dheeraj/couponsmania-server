var express = require("express");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/images" });

var router = express.Router();
var categoryListArr = [
  {
    id: 1,
    category: "amazon",
  },
  {
    id: 2,
    category: "udemy",
  },
  {
    id: 3,
    category: "amazon",
  },
  {
    id: 4,
    category: "flipkart",
  },
  {
    id: 5,
    category: "flipkart",
  },
  {
    id: 6,
    category: "udemy",
  },
  {
    id: 7,
    category: "olineProduct",
  },
  {
    id: 8,
    category: "myShop",
  },
  {
    id: 9,
    category: "Mintra",
  },
  {
    id: 10,
    category: "DailyShop",
  },
  {
    id: 6,
    category: "DailyShop",
  },
];

var couponListArr = [
  {
    id: 10,
    title: "10% discount",
    category: "amazon",
    validity: "2021-05-03",
    code: "newCode",
    image_path : 'image_1620473797770_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 11,
    title: "50% off",
    category: "amazon",
    validity: "2021-05-03",
    code: "code50",
    image_path : 'image_1620473943009_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 12,
    title: "10% discount",
    category: "amazon",
    validity: "20-05-03",
    code: "77sdgj",
    image_path : 'image_1620473943009_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 13,
    title: " discount",
    category: "udemy",
    validity: "20-05-03",
    code: "sjdfb98",
    image_path : 'image_1620473943009_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 14,
    title: "100%off",
    category: "flipkart",
    validity: "20-05-03",
    code: "hhh",
    image_path : 'image_1620474410990_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 15,
    title: "only for shirts",
    category: "olineProduct",
    validity: "20-05-03",
    code: "hbhsdf77",
    image_path : 'image_1620477218547_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
  {
    id: 1,
    title: "Online cards ",
    category: "olineProduct",
    validity: "20-05-03",
    code: "hbhsdf77",
    image_path : 'image_1620474410990_.png', 
    description : 'In marketing, a coupon is a ticket or document that can be redeemed for a financial discount or rebate when purchasing a product. Customarily'
  },
];

router.get("/", (req, res) => {
  res.json({ message: "index page render" });
});

router.post("/addCoupon", (req, res, next) => {
  couponListArr.push(req.body);
  res.json({
    message: "Coupon list",
    content: categoryListArr,
    is_success: true,
  });
});

router.get("/getAllCategory", (req, res, next) => {
  res.json({
    message: "Category list",
    content: categoryListArr,
    is_success: true,
  });
});

router.post("/getCouponsList", (req, res, next) => {
  var couponByCategory = couponListArr.filter((itm) => {
    return itm.category == req.body.category;
  });
  res.json({
    message: "coupon list",
    content: couponListArr, // send all coupons
    is_success: true,
  });
  // according to category
  //   var coupon =
});

module.exports = router;
