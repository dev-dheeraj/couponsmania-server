var pool = require("../../config/dbConnection");

// controller to add new category
add_category = (req, res, next) => {
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
                    `INSERT INTO category (name) SELECT * FROM (SELECT '${req.body.category}') AS tmp
            WHERE NOT EXISTS ( SELECT name FROM category WHERE name = '${req.body.category}') LIMIT 1`,
                    (err, result) => {
                        if (err) {
                            res.status(200).send({
                                message: 'category not created !',
                                content: [],
                                error: err,
                                is_success: false,
                            });
                            // throw err;
                        } else {
                            let data = [result];
                            res.status(200).json({
                                message: 'category added successfully',
                                content: data,
                                is_success: true,
                            });
                            connection.release();
                        }
                    }
                );
            }
        })
    } catch (err) {
        res.status(200).send({
            message: err,
            content: [],
            is_success: false,
        });
    }

};

// controller to update new category
update_category = (req, res) => {

    //  write query here

    res.send('update category');
};

// controller to getcate byt id
get_category_by_id = (req, res) => {

    //  write query here

    res.send('get by id category');
};

// controller to get ALl category
get_all_category = (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(200).send({
                message: err,
                content: [],
                is_success: false
            })
        }
        else {
            connection.query(`SELECT * FROM category`, (err, result) => {
                // db.query(`SELECT * FROM onlinecoupons`, (err, result) => {
                // user does not exists
                if (err) {
                    res.status(200).send({
                        message: err,
                        content: [],
                        is_success: false,
                    });
                } else {
                    let coupon = [result];
                    res.status(200).json({
                        message: "Category list",
                        content: coupon[0],
                        is_success: true,
                    });
                    connection.release();
                }
            });
        }
    })
};
// controller to get ALl category and subcategory
get_all_cat_subcat = (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(200).send({
                message: err,
                content: [],
                is_success: false
            })
        }
        else {
            connection.query(`SELECT category.id as category_id,
            category.name as category_name, 
            subcategory.id as subcategory_id,
            subcategory.name as subcategory_name,
            subcategory.categoryId as subcategory_catId
             FROM category
            INNER JOIN subcategory ON category.id = subcategory.categoryId WHERE category.id = subcategory.categoryId`, (err, result) => {
                // db.query(`SELECT * FROM onlinecoupons`, (err, result) => {
                // user does not exists
                if (err) {
                    res.status(200).send({
                        message: err,
                        content: [],
                        is_success: false,
                    });
                } else {
                    let coupon = [result];
                    res.status(200).json({
                        message: "Category list",
                        content: coupon[0],
                        is_success: true,
                    });
                    connection.release();
                }
            });
        }
    })
};

module.exports = {
    add_category,
    get_all_category,
    get_category_by_id,
    update_category,
    get_all_cat_subcat
}