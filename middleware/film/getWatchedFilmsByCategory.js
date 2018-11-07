const requireOption = require('../common').requireOption;
/**
 *  Gets the watched films of the given categoryid
 *  if the category exists
 *  else redirects to /lists
 */
module.exports = function (objrepo) {

    const filmModel = requireOption(objrepo, 'filmModel');

    return function (req, res, next) {
        // not watched films
        filmModel.find({watched: 1, _category: req.params.categoryid}).exec(function (err, results) {
            if ((err) || (!results)) {
                return res.redirect('/lists');
            }

            res.locals.watchedFilms = results;
            return next();
        });
        /*res.locals.watchedFilms = [
            {
                id: 1,
                title: 'Jumanji',
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            }
        ];

        res.locals.notWatchedFilms = [
            {
                id: 2,
                title: 'Baywatch',
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            },
            {
                id: 3,
                title: 'Rampage',
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            }
        ];
        return next();*/
    };

};