const Dish = require('../models/Relations.js').Dish;

const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createDish = async (req, res) => {
    try {
        const {name, description, price, imageUrl, category} = req.body;
        const dish = await Dish.create({
            name,
            description,
            price,
            imageUrl,
            category
        });
        return res.status(201).json(dish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getDishById = async (req, res) => {
    try {
        const {dishId} = req.params;
        const dish = await Dish.findOne({where: {dishId}});
        if (!dish) {
            return res.status(404).json({message: 'Dish not found'});
        }
        res.status(200).json(dish);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateDish = async (req, res) => {
    try {
        const {dishId} = req.params;
        const {name, description, price, imageUrl, category} = req.body;
        const dish = await Dish.findOne({where: {dishId}});
        if (!dish) {
            return res.status(404).json({message: 'Dish not found'});
        }
        const updatedDish = await Dish.update({name, description, price, imageUrl, category}, {where: {dishId}});
        return res.status(200).json(updatedDish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteDish = async (req, res) => {
    try {
        const {dishId} = req.params;
        const dish = await Dish.findOne({where: {dishId}});
        if (!dish) {
            return res.status(404).json({message: 'Dish not found'});
        }
        await Dish.destroy({where: {dishId}});
        return res.status(200).json({message: 'Dish deleted successfully'});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const uploadImage = async (req, res) => {
    try {
        const {dishId} = req.params;
        const imageUrl = `/uploads/dishes/${req.file.filename}`;

        const dish = await Dish.findByPk(dishId);
        if (!dish) {
            return res.status(404).json({message: 'Dish not found'});
        }
        dish.imageUrl = imageUrl;
        await dish.save();
        return res.status(200).json({message: 'Image uploaded successfully'});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllDishes,
    createDish,
    getDishById,
    updateDish,
    deleteDish,
    uploadImage
}