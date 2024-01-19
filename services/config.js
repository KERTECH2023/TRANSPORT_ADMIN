// config.js

const admin = require("firebase-admin");

const serviceAccount = require("../firebase-key.json");

const BUCKET = "imagestor-768b5.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

module.exports = {
  admin,
  BUCKET,
};
