/**
 * Deletes actor, if it's loaded
 */
module.exports = function (objrepo) {

    return function (req, res, next) {
        if (typeof res.locals.actor === 'undefined') {
            return next();
        }

        res.locals.actor.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });


    };

};