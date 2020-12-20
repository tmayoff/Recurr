function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/authentication/login');
}

module.exports.isAuthenticated = isAuthenticated;