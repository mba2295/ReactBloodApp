var firebase = require('firebase');
try {
    var config = {
        apiKey: "AIzaSyDe7eGBrbtc48NHq_E8sERQ29Ck1ONhoUo",
        authDomain: "react-blood-app.firebaseapp.com",
        databaseURL: "https://react-blood-app.firebaseio.com",
        storageBucket: "react-blood-app.appspot.com",
        messagingSenderId: "569400500112"
    };
    firebase.initializeApp(config);
} catch (error) {
    console.log(error);
}
export var refFirebase = firebase.database();
export var myFirebase = firebase;
