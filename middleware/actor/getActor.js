const requireOption = require('../common').requireOption;
/**
 * Gets the actor with the given id,
 * if it exists
 * else it redirects to /lists
 */
module.exports = function (objrepo) {

    const actorModel = requireOption(objrepo, 'actorModel');

    return function (req, res, next) {
        actorModel.findOne({
            _id: req.params.actorid,
            _user: req.session.userid
        }).populate('_films').exec(function (err, result) {
            if ((err) || (!result)){
                return res.redirect('/lists');
            }

            res.locals.actor = result;
            return next();
        });
    };

};