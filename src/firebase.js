import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyBJNwgWttOagh3tWfUthZCHhaMttQ1ndQg",
    authDomain: "react-firebase-todo-app-b165b.firebaseapp.com",
    projectId: "react-firebase-todo-app-b165b",
    storageBucket: "react-firebase-todo-app-b165b.appspot.com",
    messagingSenderId: "926844221451",
    appId: "1:926844221451:web:cb3886689a50bfccdb2f0e",
    measurementId: "G-318C958G8Y",
});

const db = firebase.firestore();
export default db;
