var firebaseConfig = {
    apiKey: "AIzaSyDDcgz7mcxjk88ZdkTFDExIk5RZW_UdDv4",
    authDomain: "iticom.firebaseapp.com",
    projectId: "iticom",
    storageBucket: "iticom.appspot.com",
    messagingSenderId: "348495596056",
    appId: "1:348495596056:web:8c343e1caccd5e026a516d",
    measurementId: "G-3VTDLL021K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();