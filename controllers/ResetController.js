const User = require('../models/User.js');
const ResetToken = require('../models/ResetToken.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const generateToken = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'User does not exist'});
        }

        const token = crypto.randomBytes(5).toString('hex')
        try {
            await ResetToken.create({
                userId: user.userId,
                token: token
            });
        } catch (error) {
            return res.status(500).json({message: error.message});
        }

        const resetLink = `http://Localhost:${process.env.PORT}/reset/final?token=${token}&userId=${user.userId}`;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: `"wishAdish" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`
        });
        return res.status(200)
        
    } catch (error) {
        return res.status(500).json({message: error.message});;
    }
};

const confirmReset = async (req, res) => {
    try {
        const { token, userId } = req.query;
        const resetToken = await ResetToken.findOne({where: {token, userId}});
        if (!resetToken) {
            return res.status(400).json({message: 'Token does not exist'});
        }

        res.status(200).json({token: token, userId: userId})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const resetPassword = async (req, res) => {
    try {
        const { userId, token, password } = req.body;
        const user = await User.findOne({where: {userId}});
        if (!user) {
            return res.status(400).json({message: 'User does not exist'});
        }

        const resetToken = await ResetToken.findOne({where: {userId, token}});
        if (!resetToken) {
            return res.status(400).json({message: 'Token does not exist'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            await user.update({ password: hashedPassword },);
            await ResetToken.destroy({where: {userId}});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }

        res.status(200)
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    generateToken,
    confirmReset,
    resetPassword
}