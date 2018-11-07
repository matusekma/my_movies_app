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
            _id: req.params.actorid
        }).populate('_films').exec(function (err, result) {
            if ((err) || (!result)){
                return res.redirect('/lists');
            }

            res.locals.actor = result;
            return next();
        });

        /*var actor = new actorModel();
        actor.name = 'Johnson';
        actor.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/lists');
        });*/

        /*res.tpl.actor = {
            id: 1,
            name: 'Dwayne Johnson',
            birthYear: 1972,
            nationality: 'American',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.',
            description: 'asd',
            picPath: 'asd',
        };

        res.tpl.films = [];
        res.tpl.films.push(
            {
                id: 1,
                title: 'Jumanji',
                category: {id: 1, name: 'Comedy', filmnumber: 15}
            },
            {
                id: 2,
                title: 'Baywatch',
                category: {id: 1, name: 'Comedy', filmnumber: 15}
            },
            {
                id: 3,
                title: 'Rampage',
                category: {id: 1, name: 'Comedy', filmnumber: 15}
            },
        );
        return next();*/
    };

};