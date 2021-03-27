// initialize luxon variable
var DateTime = luxon.DateTime;

// ----- functions that show the current date and curren time on the page -----

// render the current date to the DOM
var getDate = function () {
	var date = DateTime.now().toLocaleString(DateTime.DATE_HUGE);
	$("#currentDay").html(`It is ${date}`);
};

getDate();

// render the curren time to the DOM
var getTime = function () {
	var time = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
	$("#currentTime").html(time);
};

getTime();

// ----- format time cells based on relation to current time -----
// declare variable holding all possible time slots
var timeSlots = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// add a class to each element with the "work" class
for (var i = timeSlots[0]; i < timeSlots.length + timeSlots[0]; i++) {
	// get the coressponding row based on the id (time)
	var rowEl = $(`#${i}`);

	// get the "work" column for the element
	var colEl = rowEl.find(".work");

	// get the current hour
	var currentHour = DateTime.now().hour;

	// compare the current hour to each block and style accordingly
	if (i === currentHour) {
		colEl.addClass("present");
	} else if (i > currentHour) {
		colEl.addClass("future");
	} else {
		colEl.addClass("past");
	}
}

// ------ update the time and date every second
// update the current time every second
setInterval(function () {
	// update date
	getDate();

	// update time
	getTime();
}, 1000);
