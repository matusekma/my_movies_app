var requireOption = require('../common').requireOption;

/**
 * Gets all actors
 */
module.exports = function (objrepo) {

    var actorModel = requireOption(objrepo, 'actorModel');

    return function (req, res, next) {
        actorModel.find({ _user: req.session.userid }).exec(function (err, results) {
            if ((err) || (!results)) {
                return next(new Error('Error finding actors!'));
            }

            res.locals.actors = results;
            return next();
        });
    };
};