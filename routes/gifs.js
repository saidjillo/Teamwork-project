const express = require('express');
const router = express.Router();


gifsCtrl = require('../controllers/gifs');

router.get('/', gifsCtrl.getAllGifs);
router.get('/:gifId', gifsCtrl.getOneGif);
router.post('/', gifsCtrl.createGif);
router.delete('/:gifId', gifsCtrl.deleteGif);


module.exports = router;