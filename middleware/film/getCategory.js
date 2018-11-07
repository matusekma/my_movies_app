var requireOption = require('../common').requireOption;
/**
 * Gets the category with the given categoryid
 * if it exists
 * else redirects to /lists
 */

module.exports = function (objrepo) {

    var categoryModel = requireOption(objrepo, 'categoryModel');
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
        /*const categories = [
            {id: 1, name: 'Action', filmnumber: 15},
            {id: 2, name: 'Comedy', filmnumber: 33},
            {id: 3, name: 'Drama', filmnumber: 5},
            {id: 4, name: 'Fantasy', filmnumber: 7},
            {id: 5, name: 'Horror', filmnumber: 3}
        ];

        res.tpl.category = categories[categoryid - 1];

        return next();*/
    };

};