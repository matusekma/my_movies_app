var requireOption = require('../common').requireOption;
var Mongoose = require('mongoose').Mongoose;
/**
 * Gets the film with the given filmid
 * if it exists
 * else redirects to /lists
 */
module.exports = function (objrepo) {
        /*coverPath: String,
        watched: {
        type: Number,
    default: 0
    },
    _user: {
        type: Schema.Types.ObjectId,
            ref: 'User'
    },
    _category: {
        type: Schema.Types.ObjectId,
            ref: 'Category'
    }*/
    const filmModel = requireOption(objrepo, 'filmModel');

   /* const film = new filmModel();
    film.title = 'Jumanji';
    film.year = 2000;
    film.director = 'xy';
    film.description = 'xy';
    film.comment = 'xy';
    film.length = 120;
    film.rating = 5;
    film._category = "5be211e7b4e11d3f08cf4155";

    film.save();*/

    return function (req, res, next) {

        filmModel.findOne({
            _id: req.params.filmid
        }).exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/films/' + req.param.categoryid);
            }

            res.locals.film = result;
            return next();
        });
        /*const filmid = req.params.filmid;

        const films = [
            {
                id: 1,
                title: 'Jumanji',
                length: 119,
                director: 'xy',
                description: 'wasd',
                comment: 'qwerty',
                rating: 4.5,
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            },
            {
                id: 2,
                title: 'Baywatch',
                length: 119,
                director: 'xy',
                description: 'wasd',
                comment: 'qwerty',
                rating: 4.5,
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            },
            {
                id: 3,
                title: 'Rampage',
                length: 119,
                director: 'xy',
                description: 'wasd',
                comment: 'qwerty',
                rating: 4.5,
                category: {id: 2, name: 'Comedy', filmnumber: 15}
            }];

        const categories = [{id: 1, name: 'Action', filmnumber: 15},
            {id: 2, name: 'Comedy', filmnumber: 33},
            {id: 3, name: 'Drama', filmnumber: 5},
            {id: 4, name: 'Fantasy', filmnumber: 7},
            {id: 5, name: 'Horror', filmnumber: 3}
        ];

        res.tpl.film = films[filmid-1];
        res.tpl.categoryid = categories[res.tpl.film.id - 1].id;

        return next();*/
    };

};