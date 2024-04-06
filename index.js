const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { auth } = require('express-openid-connect');

const MONGODB_URI = 'mongodb+srv://carrotuser:carrotuser@cluster0.a2qn0ei.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const storyRoutes = require('./routes/story');
const { get404Page } = require('./controllers/error');
const {config} = require('./models/auth');

const User = require('./models/user');

app.use(auth(config));
app.use((req, res, next) => {
    res.locals.user = req.oidc.user;
    if(req.oidc.user) {
        User.findOne({name: req.oidc.user.name})
        .then(user => {
            if(user) {
                req.user = user;
                return next();
            }
            else {
                const user = new User({name: req.oidc.user.name, stories: {}});
                user.save()
                    .then(result => {
                        req.user = user;
                        return next();
                    })
            }
        })
        .catch(err => console.log(err));
    }
    else {
        return next();
    }
    
});

app.use(storyRoutes);
app.use(get404Page);

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Connected');
        app.listen(3000);
    })
    .catch(err => console.log(err));