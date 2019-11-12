const express = require('express');
const router = express.Router();



articlesCtrl = require('../controllers/articles');

router.post('/', articlesCtrl.createArticle);
