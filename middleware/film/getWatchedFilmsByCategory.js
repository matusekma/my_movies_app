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
        filmModel.find({watched: 1, _category: req.params.categoryid, _user: req.session.userid}).exec(function (err, results) {
            if ((err) || (!results)) {
                return res.redirect('/lists');
            }

            res.locals.watchedFilms = results;
            return next();
        });
    };

};