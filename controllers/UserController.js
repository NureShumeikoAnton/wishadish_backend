const User = require('../models/User.js');
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

module.exports = {
    getAllUsers,
    createUser
}