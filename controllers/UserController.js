const User = require('../models/Relations').User;
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const {lastName, firstName, email, password, role, phone} = req.body;
        const user = await User.findOne({where: {email}});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return await User.create({
            lastName,
            firstName,
            email,
            password: hashedPassword,
            role,
            phone
        });
    } catch (error) {
        return error;
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserByUID = async (req, res) => {
    try {
        const {uid} = req.params;
        const user = await User.findOne({where: {uid}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByUID
}