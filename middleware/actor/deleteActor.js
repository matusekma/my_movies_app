const fs = require('fs');

/**
 * Deletes actor, if it's loaded
 */
module.exports = function (objrepo) {

    return function (req, res, next) {
        if (typeof res.locals.actor === 'undefined') {
            return next();
        }

        fs.unlink('./public/actorpictures/' + res.locals.actor.picName, (err) => {
            if (err) return next(err);
            console.log('picture was deleted');
        });

        res.locals.actor.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });


    };

};