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
// format event cells based on relation to current time
var getTimeStatus = function () {
	// add a class to each element with the "work" class
	for (var i = 7; i < 20; i++) {
		// get the "work" column for the element at time i
		var colEl = $(`#${i} .work`);
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
};

getTimeStatus();

// ------ update the DOM at certain intervals -----
// update the current time, date, and time formatting every second
setInterval(function () {
	// update date
	getDate();

	// update time
	getTime();

	// update time formatting
	getTimeStatus();
}, 1000);

// ----- functions that handle event input and saving -----
// convert the time slot to a text area
var editEvent = function (event) {
	// declare a variable for the .work element
	var eventEl = event.find(".event");

	// get the current event text content
	var text = eventEl.text().trim();

	// create a text input element
	var textInput = $("<textarea>").val(text);

	// swap the existing div with a textarea element
	eventEl.replaceWith(textInput);

	// automatically focus on the textarea
	textInput.trigger("focus");
};

// ----- convert time slot to text area on click -----
$(".row").on("click", function () {
	editEvent($(this));
});
