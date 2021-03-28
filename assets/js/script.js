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
			colEl.removeClass("future past").addClass("present");
		} else if (i > currentHour) {
			colEl.removeClass("past present").addClass("future");
		} else {
			colEl.removeClass("present future").addClass("past");
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

var loadEvents = function () {
	events = JSON.parse(localStorage.getItem("events"));

	var date = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
	var prevDate = localStorage.getItem("date");

	// if there is nothing in localstorage OR the day has changed, create a new array to hold event objects
	if (!events || date !== prevDate) {
		events = [];

		for (var i = 0; i < 13; i++) {
			events[i] = {};
		}
	}

	// iterate through events array objects
	for (var event of events) {
		if (!event.id) {
			continue;
		}

		// set the event value to the one in localstorage
		$(`.row[id=${event.id}] .event`).text(event.details);
	}
};

loadEvents();

// convert the time slot to a text area
var editEvent = function (event) {
	// declare a variable for the .work element
	var eventEl = event;

	// get the current event text content
	var text = eventEl.text().trim();

	// create a text input element
	var textInput = $("<textarea>").val(text);

	// swap the existing div with a textarea element
	eventEl.replaceWith(textInput);

	// automatically focus on the textarea
	textInput.trigger("focus");
};

// convert textarea to p element
var saveEvent = function (event) {
	// get the associated id (time) for the blurred textarea element
	var row = event.closest(".row");
	var id = row.attr("id");
	var lock = row.find(".fas");

	// get the current text in the textarea
	var text = event.val().trim();

	//create a p element and replace the textarea with it
	var eventEl = $("<p class='event'>").text(text);
	event.replaceWith(eventEl);

	// change the lock icon to unlocked with change to text
	if (!events[id - 7].details || events[id - 7].details !== eventEl.text()) {
		lock.removeClass("fa-lock").addClass("fa-unlock");
	}

	// update the events array with the new information
	event = {
		id: id,
		details: text,
	};

	events[id - 7] = event;
};

// save event to local storage when the save button is clicked
var pushLocalStorage = function (event) {
	// get the associated id (time) and text for the clicked save button
	var row = event.closest(".row");
	var id = row.attr("id");
	var text = row.find(".event").text().trim();
	var lock = row.find(".fas");

	// add the event as an object to the local storage array
	event = {
		id: id,
		details: text,
	};

	events[id - 7] = event;

	localStorage.setItem("events", JSON.stringify(events));

	// push the current date to local storage
	localStorage.setItem(
		"date",
		DateTime.now().toLocaleString(DateTime.DATE_SHORT)
	);

	// change unlocked icon to locked with push to localStorage
	lock.removeClass("fa-unlock").addClass("fa-lock");
};

// ----- event listeners -----
// convert p element to text area on click
$(".row").on("click", ".event", function () {
	editEvent($(this));
});

// convert textarea to time slot on blur
$(".row").on("blur", "textarea", function () {
	saveEvent($(this));
});

// save contents to localstorage
$(".row").on("click", ".saveBtn", function () {
	pushLocalStorage($(this));
});
