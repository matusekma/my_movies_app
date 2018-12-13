const expect = require('chai').expect;
const deleteFilmMW = require('../../../../middleware/film/deleteFilm');

describe('Unit tests for deleteFilm middleware ', function () {
    it('should return next() without error when film is undefined', function (done) {
        const res = {
            locals: {}
        };

        deleteFilmMW({})({}, res, function(err){
            expect(res.locals.film).to.eql(undefined);
            expect(err).to.eql(undefined);
            done();
        });

    });

    it('should call redirect when deleting film was successful', function (done) {
        let redirected = false;
        let nextcalled = false;
        const res = {
            locals: {
                film: {
                    remove: function(cb){
                        cb(undefined)
                    }
                }
            },
            redirect: function(path){
                redirected = true;
                done();
            }
        };

        deleteFilmMW({})({}, res, function(err){
            nextcalled = true;
            done();
        });

        expect(redirected).to.be.eql(true);
        expect(nextcalled).to.be.eql(false);
    });

    it('should return error when db returns error', function (done) {
        let redirected = false;
        let nextcalled = false;
        const res = {
            locals: {
                film: {
                    remove: function(cb){
                        cb('hiba')
                    }
                }
            },
            redirect: function(path){
                redirected = true;
                done();
            }
        };

        deleteFilmMW({})({}, res, function(err){
            expect(err).to.eql('hiba');
            nextcalled = true;
            done();
        });

        expect(redirected).to.be.eql(false);
        expect(nextcalled).to.be.eql(true);
    });
});

