var requireOption = require('../common').requireOption;
/**
 * Gets the category with the given categoryid
 * if it exists
 * else redirects to /lists
 */

module.exports = function (objrepo) {

    const categoryModel = requireOption(objrepo, 'categoryModel');

    return function (req, res, next) {

        categoryModel.findOne({
            _id: req.params.categoryid
        }).exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/lists');
            }

            res.locals.category = result;
            return next();
        });
    };

};