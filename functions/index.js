const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webPush = require('web-push');
admin.initializeApp();

exports.saveSubscription = functions.https.onCall((data, context) => {
    return admin.database().ref('/subscriptions').push({subscription: data.subscription}).then((snapshot) => {
      return {subscription: data.subscription}
    });
  });

  exports.sendNotifications = functions.https.onCall((data, context) => {

    return admin.database().ref('/subscriptions').once('value', (snapshot) => {
      snapshot.forEach(element =>{
        webPush.sendNotification(JSON.parse(element.val().subscription));
      });  
    });
  });