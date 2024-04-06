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
    const storyID = req.params.StoryID;
    Story.findById(storyID)
        .then(story => {
            res.render('story-details', {
                story: story,
                pageTitle: `${story.title}`,
                path: `/stories/${storyID}`,
                isAuthenticated: req.oidc.isAuthenticated()
            });
        })
        .catch(err => console.log(err));
};

exports.postStoryDetails = (req, res, next) => {
    const storyPart = req.body.storyPart;
    const storyID = req.params.StoryID;
    Story.findById(storyID)
        .then(story => {
            story.contributions.push({
                userID: req.user,
                storypartNumber: story.contributions.length + 1,
                story: storyPart,
                likes: 0,
                dislikes: 0
            });
            return story.save();
        })
        .then(result => {
            res.redirect(`/stories/${storyID}`);
        })
        .catch(err => console.log(err));
};

exports.getStories = (req, res, next) => {
    const category = req.query.category;
    Story.find({category: category})
        .then(stories => {
            if(!stories) {
                res.render('No stories yet in this category');
            }
            else {
                res.render('stories', {
                    stories: stories,
                    pageTitle: `${category} Stories`,
                    path: '/stories',
                    isAuthenticated: req.oidc.isAuthenticated()
                });
            }
        })
        .catch(err => console.log(err));
}

exports.getCategories = (req, res, next) => {
    res.render('categories', {
        path: '/categories',
        pageTitle: 'Categories',
        isAuthenticated: req.oidc.isAuthenticated()
    });
};

exports.getAbout = (req, res, next) => {
    res.render('about', {
        path: '/about',
        pageTitle: 'About',
        isAuthenticated: req.oidc.isAuthenticated()
    });
}