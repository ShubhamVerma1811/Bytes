import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAWt9uhYlfp2bCijI43Dpzpt0Su1LRqEb0",
  authDomain: "bytes-a0a8f.firebaseapp.com",
  projectId: "bytes-a0a8f",
  storageBucket: "bytes-a0a8f.appspot.com",
  messagingSenderId: "29998199376",
  appId: "1:29998199376:web:29e894cb165e77ec12d755",
}

const app = !firebase.apps.length && firebase.initializeApp(firebaseConfig)

export default app
