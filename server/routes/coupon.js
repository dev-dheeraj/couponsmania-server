var express = require("express");
var deleFileMiddleware = require("../middleware/deleteImage.middleware");
var path = require("path");
const multer = require("multer");
const fs = require("fs");
const categoryController  = require("../controllers/category/category.controller");
const subcategoryController  = require("../controllers/subcategory/subcategory.controller");
const companyController  = require("../controllers/company/company.controller");
const couponController  = require("../controllers/coupons/coupons.controller");

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
  }

})
const upload = multer({
  storage: storage
});

var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: 'index page',
    content: [],
    is_success: true,
  });
});

// ********1********* Category routes ****************//
// Add new category
router.post("/addCategory",categoryController.add_category);
// get all category
router.get("/getAllCategory", categoryController.get_all_category)
//  get all category and subcategory
router.get("/getAllCategoryAndSubcat", categoryController.get_all_cat_subcat)
// ********************  Category *******************//

// ********1********* subCategory routes ****************//
// Add new category
router.post("/addSubcategory",subcategoryController.add_subcategory);
// get all category
router.get("/getAllSubcategory", subcategoryController.get_all_subcategory)
// ********************  subCategory *******************//


// *********2********* company routes******************//
// add new company name 
router.post("/addCompany", upload.single("image") ,companyController.add_company);
// getall companies list
router.get("/getAllCompany",companyController.get_all_company);
// get most 10 used company list
router.get("/getpopularCompany",companyController.get_popular_companies);
// get most 10 used company list
router.post("/deleteCompanyById",companyController.delete_company_by_id);
// ****************** company routes******************//


// **********3******** coupons routes******************//
// add new coupon
router.post("/addCoupon", couponController.add_coupons)
// get all coupons
router.get("/getAllCoupon", deleFileMiddleware, couponController.get_all_coupons)
// get all coupons by category 
router.post("/getCouponsByCategory", couponController.get_coupons_by_category)
// get all coupons by sub category 
router.post("/getCouponsBySubcategory", couponController.get_coupons_by_subcategory)
// get searched coupons 
router.post("/getCouponsBySearch", couponController.get_coupons_by_search)
// get coupons by category and subcategory
router.post("/getCouponsByCatAndSubCat", couponController.get_coupons_by_cat_and_subcat)
// get coupons by company
router.post("/getCouponsByCompany", couponController.get_coupons_by_company) 
// ****************** coupons routes******************//

module.exports = router;
