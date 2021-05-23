var pool = require("../../config/dbConnection");

// controller to add new coupons
add_coupons = (req, res) => {
    if (req.body) {
        var categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : 0
        var companyId = req.body.companyId ? parseInt(req.body.companyId) : 0
        var code = req.body.code ? req.body.code : 'no coupon code'
        var title = req.body.title ? req.body.title : 'copoun'
        var description = req.body.description ? req.body.description : ''
        var validity = req.body.validity ? req.body.validity : ''
        var subcategoryId = req.body.subcategoryId ? req.body.subcategoryId : 0
    }
    // var image_filename = ''
    // if (req.file) {
    //     var image_filename = req.file.filename ? req.file.filename : ''
    // }
    //  check for comapny name if already present then get id or inset new company name and get new id
    //  insert all data into coupons table 
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
                `INSERT INTO coupons (title,code,description,validity,categoryId,companyId, subcategoryId) VALUES ("${title}",'${code}',"${description}",'${validity}',${categoryId},${companyId}, ${subcategoryId})`,
                (err, result) => {
                    if (err) {
                        res.status(200).send({
                            message: err,
                            content: [],
                            is_success: false,
                        });
                        // throw err;
                    } else {
                        let data = [result];
                        res.status(200).json({
                            message: 'coupon added successfully',
                            content: [data],
                            is_success: true,
                        });
                        connection.release();

                    }
                }
            );
        }
    })
};

// controller to update new coupons
update_coupons = (req, res) => {

    //  write query here

    res.send('update coupons');
};

// controller to get coupons by id
get_coupons_by_id = (req, res) => {

    //  write query here

    res.send('get by id coupons');
};

// controller to get coupons by category
get_coupons_by_category = (req, res) => {
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
                `SELECT coupons.id, coupons.title, coupons.code, 
                coupons.description, coupons.validity, 
                companies.image, category.id as category_id, 
                category.name as category_name, 
                companies.id as company_id, 
                companies.name as company_name,
                subcategory.id as subcategory_id,
                subcategory.name as subcategory_name
                FROM coupons INNER JOIN 
                companies on coupons.companyId = companies.id 
                INNER JOIN category on coupons.categoryId = category.id 
                INNER JOIN subcategory on coupons.subcategoryId = subcategory.id 
                WHERE coupons.categoryId IN (${req.body.categoryIds})`,
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
                            message: "filtered coupon list",
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
// controller to get coupons by sub-category
get_coupons_by_subcategory = (req, res) => {
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
                `SELECT coupons.id, coupons.title, coupons.code, 
                coupons.description, coupons.validity, 
                companies.image, category.id as category_id, 
                category.name as category_name, 
                companies.id as company_id, 
                companies.name as company_name,
                subcategory.id as subcategory_id,
                subcategory.name as subcategory_name
                FROM coupons INNER JOIN 
                companies on coupons.companyId = companies.id 
                INNER JOIN category on coupons.categoryId = category.id 
                INNER JOIN subcategory on coupons.subcategoryId = subcategory.id 
                WHERE coupons.subcategoryId IN (${req.body.subcategoryIds})`,
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
                            message: "filtered coupon list",
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
// controller to get coupons by cat and subcat
get_coupons_by_cat_and_subcat = (req, res) => {
    var catId = req.body.categoryIds && req.body.categoryIds.length ? req.body.categoryIds : 0
    var subCatId = req.body.subcategoryIds && req.body.subcategoryIds.length ? req.body.subcategoryIds : 0
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
                `SELECT coupons.id, coupons.title, coupons.code, 
                coupons.description, coupons.validity, 
                companies.image, category.id as category_id, 
                category.name as category_name, 
                companies.id as company_id, 
                companies.name as company_name,
                subcategory.id as subcategory_id,
                subcategory.name as subcategory_name
                FROM coupons INNER JOIN 
                companies on coupons.companyId = companies.id 
                INNER JOIN category on coupons.categoryId = category.id 
                INNER JOIN subcategory on coupons.subcategoryId = subcategory.id 
                WHERE coupons.subcategoryId IN (${subCatId}) 
                AND coupons.categoryId in (${catId})`,
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
                            message: "filtered coupon list",
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

// controller to get coupons by company
get_coupons_by_company = (req, res) => {
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
                `SELECT coupons.id, coupons.title, coupons.code, 
                coupons.description, coupons.validity, 
                companies.image, category.id as category_id, 
                category.name as category_name, 
                companies.id as company_id, 
                companies.name as company_name,
                subcategory.id as subcategory_id,
                subcategory.name as subcategory_name
                FROM coupons INNER JOIN 
                companies on coupons.companyId = companies.id 
                INNER JOIN category on coupons.categoryId = category.id 
                INNER JOIN subcategory on coupons.subcategoryId = subcategory.id 
                WHERE coupons.companyId = ${req.body.companyId}`,
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
                            message: "filtered coupon list",
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

// controller to get ALl coupons
get_all_coupons = (req, res) => {
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
                `SELECT coupons.id, coupons.title, coupons.code, 
                coupons.description, coupons.validity, 
                companies.image, category.id as category_id, 
                category.name as category_name,
                companies.id as company_id, 
                companies.name as company_name,
                subcategory.id as subcategory_id,
                subcategory.name as subcategory_name  
                FROM coupons
                INNER JOIN category ON coupons.categoryId=category.id 
                INNER JOIN subcategory ON coupons.subcategoryId=subcategory.id 
                INNER JOIN companies on coupons.companyId = companies.id;`,
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
                            message: "coupon list",
                            content: coupon[0],
                            is_success: true,
                        });
                        connection.release();
                    }
                }
            );
        }
    })
};

get_coupons_by_search = (req, res) => {
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
                `SELECT coupons.id, coupons.title, coupons.code, 
        coupons.description, coupons.validity, companies.image, 
        category.id as category_id, category.name as category_name, 
        subcategory.id as subcategory_id,subcategory.name as subcategory_name,
         companies.id as company_id, companies.name as company_name
        FROM coupons
        INNER JOIN companies on coupons.companyId = companies.id 
        INNER JOIN category on coupons.categoryId = category.id
        INNER JOIN subcategory on coupons.subcategoryId = subcategory.id
        WHERE coupons.title LIKE '${req.body.searchParams}' OR 
        companies.name LIKE '%${req.body.searchParams}%' OR 
        category.name LIKE '%${req.body.searchParams}%' OR
        subcategory.name LIKE '%${req.body.searchParams}%'`,
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
                            message: "filtered coupon list",
                            content: coupon[0],
                            is_success: true,
                        });
                        connection.release();
                    }
                }
            );
        }
    })
}


module.exports = {
    get_all_coupons,
    add_coupons,
    update_coupons,
    get_coupons_by_category,
    get_coupons_by_company,
    get_coupons_by_id,
    get_coupons_by_search,
    get_coupons_by_subcategory,
    get_coupons_by_cat_and_subcat
}