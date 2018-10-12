const authMW = require('../middleware/general/auth');
const invAuthMW = require('../middleware/general/invAuth');
const logoutMW = require('../middleware/general/logout');
const redirectMW = require('../middleware/general/redirect');
const renderMW = require('../middleware/general/render');

const getActorMW = require('../middleware/actor/getActor');
const deleteActorMW = require('../middleware/actor/deleteActor');
const saveActorMW = require('../middleware/actor/saveActor');
const getCategoriesActorsMW = require('../middleware/actor/getCategoriesActors');

const getFilmMW = require('../middleware/film/getFilm');
const getCategoryMW = require('../middleware/film/getCategory');
const getFilmsByCategoryMW = require('../middleware/film/getFilmsByCategory');
const saveFilmMW = require('../middleware/film/saveFilm');
const deleteFilmMW = require('../middleware/film/deleteFilm');
const setFilmAsWatchedMW = require('../middleware/film/setFilmAsWatched');

const checkForgotPassMW = require('../middleware/user/checkForgotPass');
const validateLoginMW = require('../middleware/user/validateLogin');
const validateRegistrationMW = require('../middleware/user/validateRegistration');

/*var userModel = require('../models/user');
var filmModel = require('../models/film');
var actorModel = require('../models/actor');
var categoryModel = require('../models/category');*/

module.exports = function (app) {

    var objectRepository = {
        /*userModel: userModel,
        filmModel: filmModel,
        actorModel: actorModel,
        categoryModel: categoryModel*/
    };

    app.get('/',
        redirectMW(objectRepository)
    );

    app.use('/login',
        invAuthMW(objectRepository),
        validateLoginMW(objectRepository),
        renderMW(objectRepository, 'index.html')
    );

    app.get('/logout',
        logoutMW(objectRepository),
        renderMW(objectRepository, 'logout.html')
    );

    app.use('/forgot',
        invAuthMW(objectRepository),
        checkForgotPassMW(objectRepository),
        renderMW(objectRepository, 'forgot.html')
    );

    app.use('/register',
        invAuthMW(objectRepository),
        validateRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register.html')
    );

    app.get('/lists',
        authMW(objectRepository),
        getCategoriesActorsMW(objectRepository),
        renderMW(objectRepository, 'lists.html')
    );

    app.get('/actor/:actorid/del',
        authMW(objectRepository),
        getActorMW(objectRepository),
        deleteActorMW(objectRepository),
        renderMW(objectRepository, 'lists.html')
    );

    app.use('/actors/new',
        authMW(objectRepository),
        saveActorMW(objectRepository),
        renderMW(objectRepository, 'creatactor.html')
    );

    app.get('/actor/:actorid',
        authMW(objectRepository),
        getActorMW(objectRepository),
        renderMW(objectRepository, 'actor.html')
    );

    app.use('/actor/:actorid/edit',
        authMW(objectRepository),
        getActorMW(objectRepository),
        saveActorMW(objectRepository),
        renderMW(objectRepository, 'modifyactor.html')
    );

    app.get('/films/:categoryid',
        authMW(objectRepository),
        getCategoryMW(objectRepository),
        getFilmsByCategoryMW(objectRepository),
        renderMW(objectRepository, 'filmlist.html')
    );

    app.get('/films/:categoryid/:filmid/del',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        deleteFilmMW(objectRepository),
        renderMW(objectRepository, 'filmlist.html')
    );

    app.get('/films/:categoryid/:filmid/watch',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        setFilmAsWatchedMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'filmlist.html')
    );

    app.use('/films/:categoryid/new',
        authMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'createfilm.html')
    );

    app.use('/films/:categoryid/new/watched',
        authMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'createfilm.html')
    );

    app.get('/film/:filmid',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        renderMW(objectRepository, 'film.html')
    );

    app.use('/film/:filmid/edit',
        authMW(objectRepository),
        getFilmMW(objectRepository),
        saveFilmMW(objectRepository),
        renderMW(objectRepository, 'modifyfilm.html')
    );

}