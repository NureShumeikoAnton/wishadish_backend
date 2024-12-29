const express = require('express');
const {postFavoruites, getFavoruites, deleteFavoruites} = require('../controllers/FavouriteController.js');
const router = express.Router();

router.get('/', getFavoruites);
router.post('/', postFavoruites);
router.delete('/:dishId', deleteFavoruites);

module.exports = router;