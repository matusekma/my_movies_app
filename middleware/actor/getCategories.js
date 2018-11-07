var requireOption = require('../common').requireOption;

/**
 * Gets  categories
 */
module.exports = function (objrepo) {

    var categoryModel = requireOption(objrepo, 'categoryModel');
    return function (req, res, next) {

        categoryModel.find({}).exec(function (err, results) {
            if ((err) || (!results)) {
                return next(new Error('Error finding categories!'));
            }
            res.locals.categories = results;
            return next();
        });
        /*res.tpl.actors = [];
        for (let i = 0; i < 10; ++i) {
            res.tpl.actors.push({
                id: i,
                name: 'asd' + i,
                birthYear: 2018 + i,
                nationality: 'asd' + i,
                comment: 'asd' + i,
                description: 'asd' + i,
                picPath: 'asd' + i,
            });
        }
        res.tpl.categories = [
            {id: 1, name: 'Action', filmnumber: 15},
            {id: 2, name: 'Comedy', filmnumber: 33},
            {id: 3, name: 'Drama', filmnumber: 5},
            {id: 4, name: 'Fantasy', filmnumber: 7},
            {id: 5, name: 'Horror', filmnumber: 3}
        ];
        return next();*/
    };

};