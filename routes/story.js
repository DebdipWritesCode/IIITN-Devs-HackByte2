const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getHome, getProfile, getCategories, getAddStory, postAddStory } = require('../controllers/story');

const router = express.Router();

router.get('/', requiresAuth() , getHome);

router.get('/categories', getCategories);

router.get('/add-story', getAddStory);

router.post('/add-story', postAddStory);

router.get('/stories/:StoryID');

router.get('/profile', requiresAuth(), getProfile);

module.exports = router;