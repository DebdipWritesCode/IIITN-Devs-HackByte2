const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getHome, getProfile } = require('../controllers/story');

const router = express.Router();

router.get('/', requiresAuth() , getHome);

router.get('/profile', requiresAuth(), getProfile);

module.exports = router;