const express = require('express');
const router = express.Router();



articlesCtrl = require('../controllers/articles');


router.get('/', articlesCtrl.getAllArticles);
router.get('/:articleId', articlesCtrl.getOneArticle);
router.post('/', articlesCtrl.createArticle);
router.put('/:articleId', articlesCtrl.modifyArticle);
router.delete('/:articleId', articlesCtrl.deleteArticle);



module.exports = router;
