const {createUser} = require('./UserController.js');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const user = await createUser(req, res);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({message: 'Invalid password'});
    }

    const tokenExpiration = 3600*24;
    const token = jwt.sign(
        { id: user.id, role: user.role},
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: tokenExpiration }
    );
    res.status(200).json({
        token,
        userId: user.userId,
        role: user.role,
    });
}

module.exports = {
    register,
    login
}