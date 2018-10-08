// Initial Firebase
var config = {
    apiKey: "AIzaSyC3yccjZ8IHwNU86ncq5lLC2TiouIEsnbY",
    authDomain: "train-schedule-5cfe7.firebaseapp.com",
    databaseURL: "https://train-schedule-5cfe7.firebaseio.com",
    projectId: "train-schedule-5cfe7",
    storageBucket: "train-schedule-5cfe7.appspot.com",
    messagingSenderId: "186655272180"
    };

firebase.initializeApp(config);

var database = firebase.database(config);

// Initial Values
var name = "";
var destination = "";
var firstTime = 0;
var frequency = "";