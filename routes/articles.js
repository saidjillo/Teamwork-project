const express = require('express');
const router = express.Router();



articlesCtrl = require('../controllers/articles');

router.post('/', articlesCtrl.createArticle);

router.get('/:articleId', articlesCtrl.getOneThing);



module.exports = router;
