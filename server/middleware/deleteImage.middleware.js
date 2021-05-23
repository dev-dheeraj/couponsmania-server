var db = require("../config/dbConnection");
const fs = require("fs");
const moment = require('moment');

// delete expire image fro node server (/upload/images folder)
const deleFileMiddleware = (req, res, next) => {
    try {
        var today = moment(new Date()).format("YYYY-MM-DD");
        db.query(
            `DELETE FROM coupons where validity < '${today}'`,
            (err, result) => {
                // user does not exists
                if (err) {
                    res.status(200).send({
                        message: err,
                        content: [],
                        is_success: false,
                    });
                } else {
                    // call next callback function
                    next()                        
                }
            }
        );

    } catch (error) {
        return res.status(200).json({
            message: "Error to get coupons list",
            content: [],
            is_success: false,
        });

    }
}

module.exports = deleFileMiddleware