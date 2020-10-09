import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app=firebase.initializeApp({
    apiKey: "AIzaSyCyfgYxeTvzXMkMgEy3PFZzC8V2gcUrXb8",
    authDomain: "frutinak-coder.firebaseapp.com",
    databaseURL: "https://frutinak-coder.firebaseio.com",
    projectId: "frutinak-coder",
    storageBucket: "frutinak-coder.appspot.com",
    messagingSenderId: "761240602382",
    appId: "1:761240602382:web:198e35977efa29ba5d795f",
});

export function getFirebase(){
    return app;
}

export function getFirestore(){
    return firebase.firestore(app);
}