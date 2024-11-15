const admin = require('../firebase');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { token, lastName, firstName, role, phone } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;
        console.log(decodedToken);

        let user = await User.create({
            lastName,
            firstName,
            email,
            role,
            phone,
            uid
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

        const user = await User.findOne({ where: { userId: uid } });
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
