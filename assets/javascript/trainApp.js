// $(document).ready(function () {

/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrO2i511MPyckgtIHV90EkwNqS5_dfiL0",
    authDomain: "train-schedular-154df.firebaseapp.com",
    databaseURL: "https://train-schedular-154df.firebaseio.com",
    projectId: "train-schedular-154df",
    storageBucket: "train-schedular-154df.appspot.com",
    messagingSenderId: "174596492538"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    var trainName ;
    var destName ;
    var frequency ;
    var firstTrain;

  // caputure Button Click

  $("#add-train-btn").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // Grabbed user input
    trainName = $("#train-name-input").val().trim();
    destName = $("#dest-input").val().trim();
    frequency = $("#freq-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();

    // Creates local temporary object for holding train data

    var newTrain = {
      trainName: trainName,
      frequency: frequency,
      destName: destName,
      firstTrain: firstTrain
    };

    // Uploads all data to the database
    // code for handling the push

    database.ref().push(newTrain);

    //Alert

    // alert("Train Successfully added");

    // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");    
	  $("#freq-input").val("");
  	});


//Firebase watcher + initial loader
// It works similar to .on("value")

database.ref().on("child_added",function(childSnapshot){

  console.log(childSnapshot.val());
   trainName = childSnapshot.val().trainName;
   destName = childSnapshot.val().destName;
  frequency = childSnapshot.val().frequency;
  firstTrain = childSnapshot.val().firstTrain;


  

  // First train Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(firstTrain, "HH:mm A").subtract(1, "years");
  // console.log(firstTrainTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A" ));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  // console.log(tRemainder);

  // Minute Until next train 
  var trainMinAway = frequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + trainMinAway);

  // Next Train
  var nextTrainTime = moment().add(trainMinAway, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));


 // Add each train's data into the table

 var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destName),
  // $("<td>").text(moment(firstTrainConverted).format("hh:mm A")),
  $("<td>").text(frequency),
  $("<td>").text(moment(nextTrainTime).format("hh:mm A")),
  $("<td>").text(trainMinAway, "minutes"));
 $("#train-table > tbody").append(newRow);


 });





