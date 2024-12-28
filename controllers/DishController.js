const Dish = require('../models/Relations.js').Dish;
const admin = require('../firebase');

const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getDishUser = async (req, res) => {
    try {
        const token = req.headers['token'];

        if(!token) {
            return res.status(400).json({message: 'User not authenticated'});
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken
        const user = await User.findOne({where: {uid: uid}});
        const userId = user.userId
        const dishes = await Dish.findAll();

        const dishesWithFavouriteStatus = await Promise.all(dishes.map(async (dish) => {
            const [favourite] = await db.sequelize.query(
                `SELECT 1 FROM favourites WHERE userId = :userId AND dishId = :dishId LIMIT 1`,
                {
                    replacements: { userId, dishId: dish.dishId },
                    type: Sequelize.QueryTypes.SELECT
                }
            );
            return {
                ...dish.toJSON(),
                isFavourite: favourite ? true : false
            };
        }));

        res.status(200).json(dishesWithFavouriteStatus);
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
    uploadImage,
    getDishUser
}