const admin = require("firebase-admin");
const serviceAccount = require("./wishadish-78b7f-firebase-adminsdk-r2y0d-aba2d0527e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
