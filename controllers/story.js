exports.getHome = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home',
        path: '/',
        isAuthenticated: req.oidc.isAuthenticated()
    });
};

exports.getProfile = (req, res, next) => {
    res.render('profile', {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: 'Profile page'
    });
};