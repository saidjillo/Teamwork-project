const express = require('express');
const router = express.Router();



articlesCtrl = require('../controllers/articles');

router.post('/', articlesCtrl.createArticle);
router.get('/:articleId', articlesCtrl.getOneThing);
router.delete('/:articleId', articlesCtrl.deleteArticle);



module.exports = router;
