const admin = require('../firebase');
const { User } = require('../models');

const register = async (req, res) => {
    try {
        const { token, lastName, firstName, role, phone } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;

        let user = await User.findOne({ where: { firebaseUid: uid } });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = await User.create({
            firebaseUid: uid,
            lastName,
            firstName,
            email,
            role,
            phone
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken;

        const user = await User.findOne({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = {
    register,
    login
};
