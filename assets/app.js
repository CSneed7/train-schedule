$(document).ready(function(){
	
	var trainData = new Firebase("https://train-schedule-e66ba.firebaseio.com/");

	
	$("#addTrainBtn").on("click", function(){

		
		var trainName = $("#trainName").val().trim();
		var destination = $("#destination").val().trim();
		var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequency").val().trim();

		
		console.log(trainName);
		console.log(destination);
		console.log(trainTime);
		console.log(frequency);

		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTime,
			frequency: frequency,
		}

		
		trainData.push(newTrain);

		$("#trainName").val("");
		$("#destination").val("");
		$("#train").val("");
		$("#frequency").val("");

		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTime = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTime), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTime), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});