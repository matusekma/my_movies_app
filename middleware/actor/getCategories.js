var requireOption = require('../common').requireOption;

/**
 * Gets  categories
 */
module.exports = function (objrepo) {

    const categoryModel = requireOption(objrepo, 'categoryModel');

    return function (req, res, next) {

        categoryModel.find({}).sort({name: 'asc'}).exec(function (err, results) {
            if ((err) || (!results)) {
                return next(new Error('Error finding categories!'));
            }

            if(results.length === 0) {
                const categories = [
                    {name: 'Action'},
                    {name: 'Comedy'},
                    {name: 'Horror'},
                    {name: 'Drama'},
                    {name: 'Thriller'},
                    {name: 'Fantasy'},
                    {name: 'Romance'},
                    {name: 'Biography'},
                    {name: 'History'},
                    {name: 'War'},
                ];
                const categoryModels = [];
                for (let category of categories) {
                    let newCategory = new categoryModel();
                    newCategory.name = category.name;
                    categoryModels.push(newCategory);
                }
                categoryModel.insertMany(categoryModels);
                res.locals.categories = categoryModels;
            } else {
                res.locals.categories = results;
            }
            return next();
        });
    };

};