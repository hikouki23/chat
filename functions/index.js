const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webPush = require('web-push');
admin.initializeApp();

webPush.setVapidDetails('mailto:hikouki@dev.com', functions.config().serverkey.public, functions.config().serverkey.private);

exports.saveSubscription = functions.https.onCall((data, context) => {
    return admin.database().ref('/subscriptions').push({subscription: data.subscription}).then((snapshot) => {
      return {subscription: data.subscription}
    }).catch(err=>console.error(err));
  });

  exports.sendNotifications = functions.https.onCall((data, context) => {

    return admin.database().ref('/subscriptions').once('value', (snapshot) => {
      snapshot.forEach(element =>{
        webPush.sendNotification(JSON.parse(element.val().subscription));
      });  
    });
  });