import store from "./store";
import { db, functions } from "./firebase";
const saveSubscription = functions.httpsCallable('saveSubscription');

const config = {
  setup() {
    if (!'serviceWorker' in navigator || !'Notification' in window)
      console.log('Defaulting to polling');
    else {
      registerWorker();
      registerClientUpdateEvent();
    }
  }
}
async function registerWorker() {
  let registration = await navigator.serviceWorker.register('service-worker.js').catch(err => console.error(err));
  let serverKey = functions.config().serverkey.public || "BDmfNRL53lHEEcq0842qz_DuELFzD2lDzbckS-hgqWOObSo_g86elxKDqJZwYj6OoHzA8H3FaBB8GA3TDfIznJY";

  let subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(serverKey),
  }).then(subscription => {
    console.log(`Saving subscription:${subscription}`);
  })
    .catch(err => console.error(err));

    saveSubscription({ subscription: JSON.stringify(subscription) }).catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function registerClientUpdateEvent() {
  navigator.serviceWorker.addEventListener('message', event => {
    store.commit('updateMessageCount', 2);
    console.log('worked');
  });
}

export default config.setup();