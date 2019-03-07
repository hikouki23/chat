self.addEventListener('push', (event) => {
    self.registration.showNotification(event.data && event.data.text() || 'Notification received');
  
    self.clients.matchAll({
      includeUncontrolled: true,
      type: "window"
    }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          msg: event.data && event.data.text() || 'Notification received'
        });
      });
    });
  });
  
  self.addEventListener('install', event => {
    if (event.data === 'skipWaiting') {
      self.skipWaiting();
    }
  });
  
  self.addEventListener('pushsubscriptionchange', function (event) {
    console.log('Subscription expired');
    event.waitUntil(
      self.registration.pushManager.subscribe({
        userVisibleOnly: true
      })
      .then(function (subscription) {
        console.log('Subscribed after expiration', subscription.endpoint);
        console.log('Expiration time:', subscription.expirationTime);
        return fetch('register', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        });
      })
    );
  });