const requireOption = require('../common').requireOption;
/**
 * Sets the watched parameter of the film given
 * with its filmid
 * if it exists
 * else redirects to /lists
 */

module.exports = function (objrepo) {
    
    return function (req, res, next) {

        if (typeof res.locals.film === 'undefined') {
            return next();
        }

        const film = res.locals.film;
        film.watched = 1;

        film.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        })
    };

};