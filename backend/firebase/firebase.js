var admin = require("firebase-admin");

var serviceAccount = require("./uber-786eb-firebase-adminsdk-wi7js-f7fb3997cb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
