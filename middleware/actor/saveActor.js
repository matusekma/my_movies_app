const requireOption = require('../common').requireOption;
/**
 * Creates or edits actor and redirects to /lists
 * if data is given
 * else calls next()
 */
/*name: String,
    birthYear: Number,
    nationality: String,
    comment: String,
    description: String,
    picPath: String,
    films: [Number]*/
module.exports = function (objrepo) {

    const actorModel = requireOption(objrepo, 'actorModel');

    return function (req, res, next) {

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.birthYear === 'undefined') ||
            (typeof req.body.nationality === 'undefined') ||
            (typeof req.body.comment === 'undefined') ||
            (typeof req.body.description === 'undefined')) {
            return next();
        }

        let actor = undefined;
        if (typeof res.locals.actor !== 'undefined') {
            actor = res.locals.actor;
        } else {
            actor = new actorModel();
        }

        actor.name = req.body.name;
        actor.birthYear = req.body.birthYear;
        actor.nationality = req.body.nationality;
        actor.comment = req.body.comment;
        actor.description = req.body.description;
        actor._user = req.session.userid;
        if(typeof res.locals.filename !== 'undefined') {
            actor.picName = res.locals.filename;
        }

        actor.save(function (err, result) {
            if (err) {
                return next(new Error("Error while saving actor"));
            }
            return res.redirect('/lists');
        });
    };

};