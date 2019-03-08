const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webPush = require('web-push');

admin.initializeApp();

webPush.setVapidDetails('mailto:hikouki@dev.com', functions.config().serverkey.public, functions.config().serverkey.private);
webPush.setGCMAPIKey("AAAAcx4hzTI:APA91bFRmxJFx8L7xN0SBLvChYvRNGd4z2NBDUdffNseYhq-gIPHxgxXOHD0Itr61swuzab0-pz0jR2WVdq-a5wqU-2wV4Fq9EtGFcBL9zJ0AZAwIaKF7yDFmlcr3qcex8WwQ_8QfDlw");

exports.saveSubscription = functions.https.onCall((data, context) => {
    admin.database().ref('/subscriptions').push({
        subscription: data.subscription
    }).then((snapshot) => {
        return {
            subscription: data.subscription
        }
    }).catch(err => console.error(err));
});

exports.sendNotifications = functions.https.onCall((data, context) => {
    admin.database().ref('/subscriptions').once('value', (snapshot) => {
        snapshot.forEach(childSnapshot => {
            try {
                console.log(childSnapshot.val());
                let subscription = JSON.parse(childSnapshot.val().subscription);
                webPush.sendNotification(subscription);
            } catch (error) {
                console.error(error);
            }
        });
    });
});