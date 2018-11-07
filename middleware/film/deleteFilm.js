/**
 * Deletes actor if it is loaded
 */
module.exports = function (objrepo) {

    return function (req, res, next) {
        if (typeof res.locals.film === 'undefined') {
            return next();
        }

        res.locals.film.remove(function (err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/films/' + res.tpl.film._category.id);
        });
    };

};