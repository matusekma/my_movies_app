var requireOption = require('../common').requireOption;
var Mongoose = require('mongoose').Mongoose;
/**
 * Gets the film with the given filmid
 * if it exists
 * else redirects to /lists
 */
module.exports = function (objrepo) {
    
    const filmModel = requireOption(objrepo, 'filmModel');

    return function (req, res, next) {

        filmModel.findOne({
            _id: req.params.filmid,
            _user: req.session.userid
        }).populate('_category').exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/films/' + req.param.categoryid);
            }

            res.locals.film = result;
            return next();
        });

    };

};