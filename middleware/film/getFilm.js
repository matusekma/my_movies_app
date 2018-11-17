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