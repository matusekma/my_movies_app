const authMW = require('../middleware/general/auth');
const invAuthMW = require('../middleware/general/invAuth');
const logoutMW = require('../middleware/general/logout');
const redirectMW = require('../middleware/general/redirect');
const renderMW = require('../middleware/general/render');

const getActorMW = require('../middleware/actor/getActor');
const getActorsMW = require('../middleware/actor/getActors');
const deleteActorMW = require('../middleware/actor/deleteActor');
const saveActorMW = require('../middleware/actor/saveActor');
const getCategoriesMW = require('../middleware/actor/getCategories');
const savePictureMW = require('../middleware/actor/savePicture');

const getFilmMW = require('../middleware/film/getFilm');
const getCategoryMW = require('../middleware/film/getCategory');
const getNotWatchedFilmsByCategoryMW = require('../middleware/film/getNotWatchedFilmsByCategory');
const getWatchedFilmsByCategoryMW = require('../middleware/film/getWatchedFilmsByCategory');
const saveFilmMW = require('../middleware/film/saveFilm');
const deleteFilmMW = require('../middleware/film/deleteFilm');
const setFilmAsWatchedMW = require('../middleware/film/setFilmAsWatched');

const validateLoginMW = require('../middleware/user/validateLogin');
const validateRegistrationMW = require('../middleware/user/validateRegistration');

const userModel = require('../models/user');
const filmModel = require('../models/film');
const actorModel = require('../models/actor');
const categoryModel = require('../models/category');

module.exports = function (app) {

    const objectRepository = {
        userModel: userModel,
        filmModel: filmModel,
        actorModel: actorModel,
        categoryModel: categoryModel
    };

    app.get('/',
        redirectMW(objectRepository)
    );

    app.use('/login',
        invAuthMW(objectRepository),
        validateLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.get('/logout',
        logoutMW(objectRepository),
        renderMW(objectRepository, 'logout')
    );

    app.use('/register',
        invAuthMW(objectRepository),
        validateRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    app.get('/lists',
        authMW(objectRepository),
        getCategoriesMW(objectRepository),
        getActorsMW(objectRepository),
        renderMW(objectRepository, 'lists')
    );

    app.get('/actor/:actorid/del',
        authMW(objectRepository),
        getActorMW(objectRepository),
        deleteActorMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/lists');
        }
    );

    app.use('/actors/new',
        authMW(objectRepository),
        //savePictureMW(objectRepository),
        saveActorMW(objectRepository),
        renderMW(objectRepository, 'createactor')
    );

    app.get('/actor/:actorid',
        authMW(objectRepository),
        getActorMW(objectRepository),
        renderMW(objectRepository, 'actor')
    );

    app.use('/actor/:actorid/edit',
        authMW(objectRepository),
        getActorMW(objectRepository),
        saveActorMW(objectRepository),
        renderMW(objectRepository, 'modifyactor')
    );

    app.get('/films/:categoryid',
        authMW(objectRepository),
        getCategoryMW(objectRepository),
        getWatchedFilmsByCategoryMW(objectRepository),
        getNotWatchedFilmsByCategoryMW(objectRepository),
        renderMW(objectRepository, 'filmlist')
    );

    app.get('/films/:categoryid/:filmid/del',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        deleteFilmMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/films/' + req.params.categoryid);
        }
    );

    app.get('/films/:categoryid/:filmid/watch',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        setFilmAsWatchedMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/films/' + req.params.categoryid);
        }
    );

    app.use('/films/:categoryid/new/:watched',
        authMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'createfilm')
    );

    app.get('/film/:categoryid/:filmid',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        renderMW(objectRepository, 'film')
    );

    app.use('/film/:categoryid/:filmid/edit',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'modifyfilm')
    );

};