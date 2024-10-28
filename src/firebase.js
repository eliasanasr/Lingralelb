import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAlXOJ2syaD2k65wk4CLAPmnaw1pjqD0Og",
  authDomain: "lingralereact-5d8e1.firebaseapp.com",
  projectId: "lingralereact-5d8e1",
  storageBucket: "lingralereact-5d8e1.appspot.com",
  messagingSenderId: "518433602471",
  appId: "1:518433602471:web:fcd454955d6141852fd482",
  measurementId: "G-Z645MNTWZM"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BP6KAcFLGJdlAdjaQtLmDwWg9IiCLtg4Yf4sBi2ENHbW5FFD_9KSUvgGrI2aY1FHIWXDf902yp65ePZDnoT2fdM",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
