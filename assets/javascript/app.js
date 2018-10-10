
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

$('#addFlightBtn').on("click", function() {
// Input flight info
var flightName = $("#flightNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var firstFlight = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
var frequency = $("#frequencyInput").val().trim();

// Temporary object holding flight data
var newFlight = {
    name: flightName,
    place: destination,
    fFlight: firstFlight,
    freq: frequency
    }

  // uploads flight data to the database
database.ref().push(newFlight);
console.log(newFlight.name);

  // clears all the text-boxes
  $("#flightNameInput").val("");
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
  var flightName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstFlight = childSnapshot.val().fFlight;
  var frequency = childSnapshot.val().freq;

  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstFlight, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);

  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstFlight);
  console.log("Difference in Time: " + timeDiff);

  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);

  // to calculate minutes till train,we store it in a variable
  var minToFlight = frequency - timeRemainder;

  // next train
  var nxFlight = moment().add(minToFlight, "minutes").format("HH:mm");

$("#flightTable>tbody").append("<tr><td>" + flightName + "</td><td>" + destination + "</td><td>" + nxFlight + "</td><td>" + frequency + "</td><td>" + minToFlight + "</td></tr>");
});