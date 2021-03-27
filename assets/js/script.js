// initialize luxon variable
var DateTime = luxon.DateTime;

// get the current date and save in variables
var date = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

// render the current date to the DOM
$("#currentDay").html(`It is ${date}`);
