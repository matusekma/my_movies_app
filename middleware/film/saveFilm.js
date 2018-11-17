const requireOption = require('../common').requireOption;
/**
 * Creates or edits film and redirects to /films/:categoryid
 * if data is given
 * else calls next()
 */
module.exports = function (objrepo) {


    const filmModel = requireOption(objrepo, 'filmModel');

    /*Title
    Release year
    Director
    Description
    Comment*/
    return function (req, res, next) {

        if ((typeof req.body.title === 'undefined') ||
            (typeof req.body.year === 'undefined')||
            (typeof req.body.director === 'undefined')||
            (typeof req.body.description === 'undefined')||
            (typeof req.body.comment === 'undefined')) {
            res.locals.categoryid = req.params.categoryid;
            return next();
        }

        let film = undefined;
        if (typeof res.locals.film !== 'undefined') {
            film = res.locals.film;
        } else {
            film = new filmModel();
        }

        film.title = req.body.title;
        film.year = req.body.year;
        film.director = req.body.director;
        film.length = req.body.length;
        film.comment = req.body.comment;
        film.description = req.body.description;
        film.rating = req.body.rating;
        film._category = req.params.categoryid;
        film._user = req.session.userid;

        if (req.params.watched === '1') {
            film.watched = 1;
        }
        res.locals.categoryid = req.params.categoryid;

        film.save(function (err, result) {
            if (err) {
                return next(new Error("Error while saving film"));
            }
            return res.redirect('/films/' + film._category);
        });
    };

};