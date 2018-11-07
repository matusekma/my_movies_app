/**
 * Creates or edits film and redirects to /films/:categoryid
 * if data is given
 * else calls next()
 */
module.exports = function (objrepo) {

    return function (req, res, next) {
        res.locals.categoryid = req.params.categoryid;
        return next();
    };

};