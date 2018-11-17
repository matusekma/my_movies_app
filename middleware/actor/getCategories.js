var requireOption = require('../common').requireOption;

/**
 * Gets  categories
 */
module.exports = function (objrepo) {

    var categoryModel = requireOption(objrepo, 'categoryModel');
    return function (req, res, next) {

        categoryModel.find({}).sort({name: 'asc'}).exec(function (err, results) {
            if ((err) || (!results)) {
                return next(new Error('Error finding categories!'));
            }
            res.locals.categories = results;
            return next();
        });
    };

};