const Story = require('../models/story');

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

exports.getAddStory = (req, res, next) => {
    res.render('add-story', {
        pageTitle: 'Add Story',
        path: '/add-story',
        isAuthenticated: req.oidc.isAuthenticated()
    });
};

exports.postAddStory = (req, res, next) => {
    const title = req.body.title;
    const category = req.body.option;
    const storyStarting = req.body.message;
    const story = new Story({owner: req.user, title: title, category: category, storyStarting: storyStarting, contributions: []});
    story.save()
        .then(result => {
            return res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getStoryDetails = (req, res, next) => {

};

exports.getCategories = (req, res, next) => {
    res.render('categories', {
        path: '/categories',
        pageTitle: 'Categories',
        isAuthenticated: req.oidc.isAuthenticated()
    });
};