const expect = require('chai').expect;
const getActorsMW = require('../../../../middleware/actor/getActors');

describe('Unit tests for getActors middleware ', function () {
    it('should return users', function (done) {
        const req = {
            session: {
                userid: 10
            }
        };

        const res = {
            locals: {}
        };
        const mockActorModel = {
            find: function(queryParams) {
                return {
                    exec: function (cb) {
                        cb(undefined, ['mockactor1', 'mockactor2'])
                    }
                }
            }
        };

        getActorsMW({
            actorModel: mockActorModel
        })(req, res, function (err) {
            expect(res.locals.actors).to.eql(['mockactor1', 'mockactor2']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return error when db returns error', function (done) {
        const req = {
            session: {
                userid: 10
            }
        };

        const mockActorModel = {
            find: function(queryParams) {
                return {
                    exec: function (cb) {
                        cb('hiba', undefined)
                    }
                }
            }
        };

        getActorsMW({
            actorModel: mockActorModel
        })(req, {}, function (err) {
            expect(err.message).to.eql('Error finding actors!');
            done();
        });
    });
});