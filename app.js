const express = require('express');
const app = express();
const db = require('./config/db.config.js');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const dishRoutes = require('./routes/dishRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/dishes', dishRoutes);
app.use('/orders', orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Failed to sync models:', err));

module.exports = app;