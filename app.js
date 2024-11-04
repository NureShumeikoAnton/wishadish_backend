const express = require('express');
const app = express();
const db = require('./config/db.config.js');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes.js');
const resetRoutes = require('./routes/resetRoutes.js');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/reset', resetRoutes);

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