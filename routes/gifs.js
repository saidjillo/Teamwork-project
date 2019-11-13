const express = require('express');
const router = express.Router();


gifsCtrl = require('../controllers/gifs');

router.post('/', gifsCtrl.createGif);



module.exports = router;