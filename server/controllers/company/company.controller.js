var pool = require("../../config/dbConnection");

// controller to add new company
add_company = (req, res) => {
  var image_filename = ''
  if (req.file) {
    image_filename = req.file.filename ? req.file.filename : ''
  }
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(200).send({
          message: err,
          content: [],
          is_success: false
        })
      }
      else {
        connection.query(
          `INSERT INTO companies (name, image) SELECT * FROM (SELECT '${req.body.company}', '${image_filename}') AS tmp
            WHERE NOT EXISTS ( SELECT name FROM companies WHERE name = '${req.body.company}') LIMIT 1`,
          (err, result) => {
            if (err) {
              res.status(200).send({
                message: 'company not created !',
                content: [],
                error: err,
                is_success: false,
              });
              // throw err;
            } else {
              let data = [result];
              res.status(200).json({
                message: 'company added successfully',
                content: data,
                is_success: true,
              });
              connection.release();
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(200).send({
      message: err,
      content: [],
      is_success: false,
    });
  }
};

// controller to add new company
get_all_company = (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(200).send({
        message: err,
        content: [],
        is_success: false
      })
    }
    else {
      connection.query(
        `SELECT * FROM companies`,
        // `SELECT * FROM onlinecoupons where category = '${req.body.category}'`,
        (err, result) => {
          // user does not exists
          if (err) {
            res.status(200).send({
              message: err,
              content: [],
              is_success: false,
            });
            // throw err;
          } else {
            let coupon = [result];
             res.status(200).json({
              message: "Company list",
              content: coupon[0],
              is_success: true,
            });
            connection.release();
          }
        }
      );
    }
  });
};
// controller to delete  company by id
delete_company_by_id = (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(200).send({
        message: err,
        content: [],
        is_success: false
      })
    }
    else {
      connection.query(
        `DELETE coupons, companies FROM coupons 
        INNER JOIN companies
         WHERE coupons.companyId = ${req.body.companyId} AND
          companies.id = ${req.body.companyId}`,
        // `SELECT * FROM onlinecoupons where category = '${req.body.category}'`,
        (err, result) => {
          // user does not exists
          if (err) {
            res.status(200).send({
              message: err,
              content: [],
              is_success: false,
            });
            // throw err;
          } else {
            let coupon = [result];
            console.log(' delete com- ', coupon)
             res.status(200).json({
              message: "Deleted company",
              content: coupon[0],
              is_success: true,
            });
            connection.release();
          }
        }
      );
    }
  });
};

get_popular_companies = (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(200).send({
        message: err,
        content: [],
        is_success: false
      })
    }
    else {
      connection.query(
        `SELECT companies.id, companies.name, companies.image ,COUNT(*) AS coupons_counter 
        FROM coupons
        INNER JOIN companies on coupons.companyId = companies.id  
        GROUP BY companyId 
        ORDER BY coupons_counter DESC
        LIMIT 5`,
        (err, result) => {
          // user does not exists
          if (err) {
            res.status(200).send({
              message: err,
              content: [],
              is_success: false,
            });
            // throw err;
          } else {
            let coupon = [result];

             res.status(200).json({
              message: "popular companies",
              content: coupon[0],
              is_success: true,
            });
            connection.release();
          }
        }
      );
    }
  });
}

module.exports = {
  add_company,
  get_all_company,
  get_popular_companies,
  delete_company_by_id
}