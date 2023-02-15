import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB5FBkz0VqRrFNh3cwc80BYZrEf7Wm3PVo",
    authDomain: "miniblog-ref-e06fc.firebaseapp.com",
    projectId: "miniblog-ref-e06fc",
    storageBucket: "miniblog-ref-e06fc.appspot.com",
    messagingSenderId: "462191539895",
    appId: "1:462191539895:web:8dd83b2fdbe39b112f7f32",
    measurementId: "G-WSVRHGW7M5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };