/**
 * Ends session when user logs out
 */

module.exports = function (objrepo) {

    return function (req, res, next) {
        req.session.destroy(function (err) {
            return next();
        });
    };

};