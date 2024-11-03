const express = require('express');
const app = express();
const db = require('./config/db.config.js');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync with {force: true}');
    }
);

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Failed to sync models:', err));

module.exports = app;