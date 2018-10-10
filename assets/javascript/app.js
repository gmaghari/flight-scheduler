
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyANk1gfR3O0zWKn_xr2BkOjmVddClxsmns",
  authDomain: "trainschedule-3e074.firebaseapp.com",
  databaseURL: "https://trainschedule-3e074.firebaseio.com",
  projectId: "trainschedule-3e074",
  storageBucket: "trainschedule-3e074.appspot.com",
  messagingSenderId: "262734186202"

  // apiKey: "AIzaSyD40PtSZy0ttgknYxtXwC6jOrOIlOkGJjw",
  // authDomain: "aug-2018-cohort.firebaseapp.com",
  // databaseURL: "https://aug-2018-cohort.firebaseio.com",
  // projectId: "aug-2018-cohort",
  // storageBucket: "aug-2018-cohort.appspot.com",
  // messagingSenderId: "496808859260"
};
firebase.initializeApp(config);


var database = firebase.database();
// var trainName ="";
// var destination = "";
// var firstTrain ="";
// var frequency = "";

$('#addTrainBtn').on("click", function() {
// Input train info
var trainName = $("#trainNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
var frequency = $("#frequencyInput").val().trim();

// Temporary object holding train data
var newTrain = {
    name: trainName,
    place: destination,
    ftrain: firstTrain,
    freq: frequency
    }

  // uploads train data to the database
database.ref().push(newTrain);
console.log(newTrain.name);

  // clears all the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");

  // Prevents moving to new page
  return false;
});

//  Firebase event listener for adding trains to database and in html row
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

  // Now we store the childSnapshot values into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;

  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);

  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);

  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);

  // to calculate minutes till train,we store it in a variable
  var minToTrain = frequency - timeRemainder;

  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

$("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});