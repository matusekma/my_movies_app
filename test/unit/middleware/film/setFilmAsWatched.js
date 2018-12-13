const expect = require('chai').expect;
const setFilmAsWatchedMW = require('../../../../middleware/film/setFilmAsWatched');

describe('Unit tests for setFilmAsWatched middleware ', function () {
    it('should return next() without error when film is undefined', function (done) {
        const res = {
            locals: {}
        };

        setFilmAsWatchedMW({})({}, res, function(err){
            expect(res.locals.film).to.eql(undefined);
            expect(err).to.eql(undefined);
            done();
        });

    });

    it('should set film as watched and call next() when saving film was successful', function (done) {
        const res = {
            locals: {
                film: {
                    save: function(cb){
                        cb(undefined, 'eredmeny')
                    }
                }
            }
        };

        setFilmAsWatchedMW({})({}, res, function(err){
            expect(res.locals.film.watched).to.eql(1);
            expect(err).to.eql(undefined);
            done();
        });

    });

    it('should return error when db returns error', function (done) {
        const res = {
            locals: {
                film: {
                    save: function(cb){
                        cb('hiba', undefined)
                    }
                }
            }
        };

        setFilmAsWatchedMW({})({}, res, function(err){
            expect(res.locals.film.watched).to.eql(1);
            expect(err).to.eql('hiba');
            done();
        });
    });
});