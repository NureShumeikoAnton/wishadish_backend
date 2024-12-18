const express = require('express');
const {getAllDishes, getDishById, createDish, updateDish, deleteDish, uploadImage} = require('../controllers/DishController.js');
const router = express.Router();
const upload = require('./multerConfig.js');

router.get('/', getAllDishes);
router.post('/', createDish);
router.get('/:dishId', getDishById);
router.put('/:dishId', updateDish);
router.delete('/:dishId', deleteDish);

router.post('/upload/:dishId', upload.single('image'), uploadImage);
module.exports = router;