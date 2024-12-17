const express = require('express');
const {getAllDishes, getDishById, createDish, updateDish, deleteDish} = require('../controllers/DishController.js');
const router = express.Router();

router.get('/', getAllDishes);
router.post('/', createDish);
router.get('/:dishId', getDishById);
router.put('/:dishId', updateDish);
router.delete('/:dishId', deleteDish);

module.exports = router;