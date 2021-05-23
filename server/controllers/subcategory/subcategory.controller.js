var pool = require("../../config/dbConnection");

// controller to add new category
add_subcategory = (req, res, next) => {
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
                    `INSERT INTO subcategory (name,categoryId) SELECT * FROM (SELECT '${req.body.subcategory}', ${req.body.categoryId}) AS tmp
            WHERE NOT EXISTS ( SELECT name FROM category WHERE name = '${req.body.subcategory}') LIMIT 1`,
                    (err, result) => {
                        if (err) {
                            res.status(200).send({
                                message: 'subcategory not created !',
                                content: [],
                                error: err,
                                is_success: false,
                            });
                            // throw err;
                        } else {
                            let data = [result];
                            res.status(200).json({
                                message: 'subcategory added successfully',
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
update_subcategory = (req, res) => {

    //  write query here

    res.send('update category');
};

// controller to getcate byt id
get_subcategory_by_id = (req, res) => {

    //  write query here

    res.send('get by id category');
};

// controller to get ALl category
get_all_subcategory = (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(200).send({
                message: err,
                content: [],
                is_success: false
            })
        }
        else {
            connection.query(`SELECT * FROM subcategory`, (err, result) => {
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
                        message: "subCategory list",
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
    add_subcategory,
    get_all_subcategory,
    get_subcategory_by_id,
    update_subcategory
}