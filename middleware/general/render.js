/**
 * Renders the view given as parameter
 * @param objrepo
 * @param viewName
 */
module.exports = function (objrepo, viewName) {

    return function (req, res) {
        res.render(viewName, res.tpl);
    };

};