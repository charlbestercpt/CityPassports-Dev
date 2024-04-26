document.addEventListener("DOMContentLoaded", function () {
  // Get the item from local storage

  const bookingQuestionsString = localStorage.getItem("booking_questions");

  if (bookingQuestionsString) {
    // Parse the JSON data from local storage
    const parsedQuestions = JSON.parse(bookingQuestionsString);

    // Access the languageGuides property or set it to "No-languageguides"
    const languageGuides =
      parsedQuestions.languageGuides || "No-languageguides";

    // Save the languageGuides to local storage
    localStorage.setItem("languageGuides", JSON.stringify(languageGuides));

    // Use the languageGuides constant as needed
    console.log(languageGuides);
  } else {
    console.log("No booking questions found in local storage.");
  }
});

const buttonNext = document.getElementById("button_next");
const buttonPrev = document.getElementById("button_prev");
const buttonOptions2 = document.getElementById("see_options2");
const selectTickets = document.getElementById("select-tickets");
const selectTickets2 = document.getElementById("select-tickets2");
const calendar = document.getElementById("Div_Calendar");
const buttonOptions = document.getElementById("see_options");
const dateSelection = document.getElementById("date_selection");
const spacerDate = document.getElementById("spacer-date");
const bookCalendar = localStorage.getItem("bookCalendar");
const noBookCalendar = document.getElementById("see-options_no-cal");
const bookCalendarshow = document.getElementById("see-options_cal");

if (bookCalendar === true) {
  console.log("bookCalendar is true");
} else {
  console.log("bookCalendar is false");
}
buttonNext.addEventListener("click", () => {
  // Check if 'currentDate' exists in localStorage
  if (localStorage.getItem("currentDate") !== null) {
    selectTickets.style.display = "block";
    calendar.style.display = "none";
    buttonNext.style.display = "none"; // hide the next button
    buttonPrev.style.display = "block";
    buttonOptions.style.display = "block";
    dateSelection.style.display = "flex";
    spacerDate.style.display = "block";
  } else {
    // Handle the case where 'currentDate' is not available
    console.log("currentDate not found in localStorage");
    // You can add any additional code here to handle this scenario
  }
});

buttonPrev.addEventListener("click", () => {
  selectTickets.style.display = "none";
  calendar.style.display = "block";
  buttonNext.style.display = "block"; // show the next button
  buttonPrev.style.display = "none";
  buttonOptions.style.display = "none";
  dateSelection.style.display = "none";
  spacerDate.style.display = "none";
});

// Retrieve the string value from local storage
let str = localStorage.getItem("name");
console.log(str);
// Update the text content of the element with ID "exp-name"
document.getElementById("exp-name").textContent = str;
document.getElementById("exp-name2").textContent = str;

$(".button_options.next").attr("disabled", true);
var incrementPlus;
var incrementMinus;

var buttonPlus = $(".hack17-counter-button.hack17-up");
var buttonMinus = $(".hack17-counter-button.hack17-down");

var incrementPlus = buttonPlus.click(function () {
  var $n = $(this)
    .parent(".hack17-counter-row")
    .find(".hack17-counter-input.w-input");
  $n.val(Number($n.val()) + 1);
});

var incrementMinus = buttonMinus.click(function () {
  var $n = $(this)
    .parent(".hack17-counter-row")
    .find(".hack17-counter-input.w-input");
  var amount = Number($n.val());
  if (amount > 0) {
    $n.val(amount - 1);
  }
});

$(".alert_button").on("click", function () {
  $(".dark-overlay__availability").toggleClass("active");
});

$(function () {
  $("#TRAVELER").css("display", "none");
  $("#SENIOR").css("display", "none");
  $("#ADULT").css("display", "none");
  $("#YOUTH").css("display", "none");
  $("#CHILD").css("display", "none");
  $("#INFANT").css("display", "none");
  const new_data = JSON.parse(localStorage.getItem("data"));
  let ageBand = [];

  //getting max-min from bookingquestion call
  const travellers = JSON.parse(localStorage.getItem("booking_questions"));

  $("#max-min-travellers").text(
    `A minimum of ${travellers.bookingRequirements.minTravelersPerBooking} travellers and a maximum of ${travellers.bookingRequirements.maxTravelersPerBooking} travellers are allowed per booking.`
  );

  function displayAgeBandsDesc() {
    var ageBands = travellers.pricingInfo.ageBands;
    ageBands.forEach(function (band) {
      var description = band.description;
      if (description === null) {
        description = ""; // handle null descriptions
      }
      switch (band.ageBand) {
        case "CHILD":
          document.getElementById("child_age").innerHTML += description;
          break;
        case "YOUTH":
          document.getElementById("youth_age").innerHTML += description;
          break;
        case "ADULT":
          document.getElementById("adult_age").innerHTML += description;
          break;
        case "SENIOR":
          document.getElementById("senior_age").innerHTML += description;
          break;
        case "INFANT":
          // Handle null description for infants specially if needed
          document.getElementById("infant_age").innerHTML += description;
          break;
        // Add cases for other age bands if necessary
      }
    });
  }

  function displayAgeBandsRange() {
    var ageBands = travellers.pricingInfo.ageBands;
    ageBands.forEach(function (band) {
      var ageRange = "(ages " + band.startAge + " - " + band.endAge + ")";
      switch (band.ageBand) {
        case "CHILD":
          document.getElementById("child_age").innerHTML += ageRange;
          break;
        case "YOUTH":
          document.getElementById("youth_age").innerHTML += ageRange;
          break;
        case "ADULT":
          document.getElementById("adult_age").innerHTML += ageRange;
          break;
        case "SENIOR":
          document.getElementById("senior_age").innerHTML += ageRange;
          break;
        case "INFANT":
          document.getElementById("infant_age").innerHTML += ageRange;
          break;
        // Add cases for other age bands if necessary
      }
    });
  }

  // Call the function to update the page
  const offerSubType = localStorage.getItem("offerSubType");
  const offerType = localStorage.getItem("offerType");
  if (offerSubType === "Travel - Direct Contact") {
    displayAgeBandsDesc();
  } else {
    displayAgeBandsRange();
  }

  for (
    i = 0;
    i <
    new_data.bookableItems[0].seasons[0].pricingRecords[0].pricingDetails
      .length;
    ++i
  ) {
    ageBand.push(
      new_data.bookableItems[0].seasons[0].pricingRecords[0].pricingDetails[i]
        .ageBand
    );
  }
  $.each(ageBand, function (index, value) {
    $("#" + value).css("display", "flex");
    $("#" + value).css("opacity", "1");
  });
});

$(".button_options").on("click", function () {
  $(this).addClass("spinning");
  $(this).text("");
});
