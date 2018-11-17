module.exports = function (objrepo) {
    return function (req, res, next) {
        if (typeof req.body.actorPicture === 'undefined') {
            return next();  //no picture uploaded
            //return res.status(400).send('No files were uploaded.');
        }


    };
};