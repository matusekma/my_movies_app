/**
 * Is user is not logged in, redirects the login screen
 * else redirect to /lists
 */
module.exports = function (objrepo) {

    return function (req, res, next) {

        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/lists');
        }
    };
};