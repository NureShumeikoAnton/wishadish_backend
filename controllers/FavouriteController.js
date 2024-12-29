const {User} = require('../models/Relations.js');
const admin = require('../firebase');
const db = require('../config/db.config.js');

const postFavoruites = async (req, res) => {
    try {
        const {dishId} = req.body;
        const token = req.headers['token'];

        if(!token) {
            return res.status(400).json({message: 'User not authenticated'});
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken
        const user = await User.findOne({where: {uid: uid}});
        const userId = user.userId
        await sequelize.query(
            `INSERT INTO favourites (dishId, userId) VALUES (${dishId}, ${userId}`,
            {
              replacements: { dishId, userId },
              type: db.sequelize.QueryTypes.INSERT,
            }
        );

        return res.status(201).json(":)");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getFavoruites = async (req, res) => {
    try {
        const token = req.headers['token'];

        if(!token) {
            return res.status(400).json({message: 'User not authenticated'});
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken
        const user = await User.findOne({where: {uid: uid}});
        const userId = user.userId
        favourites = await sequelize.query(
            `SELECT * FROM favourites WHERE userId = ${userId}`,
            {
              replacements: { userId },
              type: db.sequelize.QueryTypes.SELECT,
            }
        );

        return res.status(201).json(favourites);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteFavoruites = async (req, res) => {
    try {
        const {dishId} = req.body;
        const token = req.headers['token'];

        if(!token) {
            return res.status(400).json({message: 'User not authenticated'});
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken
        const user = await User.findOne({where: {uid: uid}});
        const userId = user.userId
        await sequelize.query(
            `DELETE FROM favourites WHERE dishId = ${dishId} AND userId = ${userId}`
        );

        return res.status(201).json(":)");
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    postFavoruites,
    getFavoruites,
    deleteFavoruites
}