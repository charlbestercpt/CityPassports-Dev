const data = JSON.parse(localStorage.getItem("data"));

//set variables

const getProductOptionCode = (data) => {
  return data.bookableItems[0].productOptionCode || "No Product Option Code";
};
const productOptionCode = getProductOptionCode(data);
let seasons = data.bookableItems[0].seasons;
const startDate = seasons[0].startDate;
const endDate = seasons[0].endDate;
const daysOfWeek = seasons[0].pricingRecords[0].daysOfWeek;
const pricingRecords = seasons[0].pricingRecords;
let timedEntries = seasons[0].pricingRecords[0].timedEntries;
const firstDate = new Date(); // gets the current date and time
const lastDate = new Date();
lastDate.setFullYear(firstDate.getFullYear() + 1); // Set the end date to one year from the current date

//set empty variables
let availableDates = [];
let filteredSeasonDates = [];
let filteredAvailableDates = [];
let availableDays = [];

while (firstDate < lastDate) {
  const year = firstDate.getFullYear(); // Extract the last two digits of the year
  const month = (firstDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = firstDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  availableDates.push(formattedDate);

  firstDate.setDate(firstDate.getDate() + 1); // Move to the next day
}

console.log("Available Dates: Next 366 Days", availableDates);

// ALL FUNCTIONS //

// FUNCTION - to build unavailable date array when no timed entires are available
function processUnavailableDates(seasons) {
  let unavailableDates =
    data.bookableItems[0].seasons[0]?.pricingRecords[0]?.timedEntries[0]
      ?.unavailableDates;

  if (unavailableDates === undefined) {
    console.log("No Unavailable Dates");
    return "No Unavailable Dates";
  } else {
    const numberOfUnavailableDates = unavailableDates.length;
    console.log(`Number of Unavailable Dates: ${numberOfUnavailableDates}`);
    return unavailableDates;
  }
}
// FUNCTION - to build unavailable date array when timed entires ARE available
function processUnavailableDates2(seasons) {
  // Ensure that seasons, pricingRecords, and timedEntries exist
  if (
    !data.bookableItems[0].seasons[0]?.pricingRecords[0]?.timedEntries[0]
      ?.unavailableDates
  ) {
    console.log("Required data is missing");
    return "Required data is missing";
  }
  // Extract all available dates (assuming you have this data)
  let availableDates = [filteredAvailableDates]; // Populate this with your available dates
  // Filter unavailable dates that are unavailable for all start times
  let unavailableDates = availableDates.filter((date) => {
    return seasons[0].pricingRecords[0].timedEntries.every((entry) => {
      return entry.unavailableDates.some(
        (dateEntry) => dateEntry.date === date
      );
    });
  });

  if (unavailableDates.length === 0) {
    console.log("No Unavailable Dates");
    return "No Unavailable Dates";
  } else {
    console.log(`Number of Unavailable Dates: ${unavailableDates.length}`);
    return unavailableDates;
  }
}
// FUNCTION - Builds Season Start & End Date
function buildSeasonRange(seasons) {
  // Iterate through each season and log its start and end dates
  for (const season of seasons) {
    const startDate = season.startDate || "No Start Date";
    const endDate = season.endDate || "No End Date";
    console.log(`Season Start Date: ${startDate}, End Date: ${endDate}`);
  }
}
// Example usage:
// buildSeasonRange(yourSeasonsArray);

// FUNCTION - Build all Days Within 1 Season
function buildDayInSeason(data, availableDates) {
  // Extract start & end dates from each season and log dates within season
  data.bookableItems[0].seasons.forEach((season) => {
    const startDate = new Date(season.startDate);
    // Set the end date to the last available date if it's not provided
    if (!season.endDate) {
      season.endDate = availableDates[availableDates.length - 1];
    }
    const seasonDates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(season.endDate)) {
      seasonDates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("All dates within the seasons", seasonDates);
  });
}
// Example usage:
// buildDayInSeason(data, availableDates);

// FUNCTION - Build all Days within more than one Season
function buildDayInSeason2(data, availableDates) {
  let allSeasonDates = []; // Array to accumulate dates from all seasons

  data.bookableItems[0].seasons.forEach((season) => {
    const startDate = new Date(season.startDate);

    // Set the end date to the last available date if it's not provided
    if (!season.endDate) {
      season.endDate = availableDates[availableDates.length - 1];
    }

    const currentDate = new Date(startDate);
    while (currentDate <= new Date(season.endDate)) {
      allSeasonDates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  console.log("All dates within all seasons", allSeasonDates);
  return allSeasonDates; // Return the combined array
}
// Example usage:
// buildDayInSeason2(data, availableDates);

// FUNCTION - Filter Season Dates With Available Dates
function filterSeasonDates(availableDates, data) {
  // Iterate through the available dates and check if each date falls within any season
  let filteredSeasonDates = availableDates.filter((date) => {
    const currentDate = new Date(date);
    // Check if the date falls within any season
    return data.bookableItems[0].seasons.some(
      (season) =>
        currentDate >= new Date(season.startDate) &&
        currentDate <= new Date(season.endDate)
    );
  });

  console.log("Dates within season and next 366 days", filteredSeasonDates);
  return filteredSeasonDates;
}
// Example usage:
// filteredSeasonDates = filterSeasonDates(availableDates, data);

// FUNCTION - Common Unavailable Dates for Time Entries
function getCommonUnavailableDates(data) {
  const timedEntries =
    data.bookableItems[0].seasons[0].pricingRecords[0].timedEntries;
  // Create a map of unavailable dates for each start time
  const unavailableDatesMap = {};
  timedEntries.forEach((entry) => {
    if (entry.unavailableDates) {
      // Check if unavailableDates is defined
      unavailableDatesMap[entry.startTime] = entry.unavailableDates.map(
        (date) => date.date
      );
    }
  });
  // Find common dates across all start times
  const allStartTimes = Object.keys(unavailableDatesMap);
  const commonUnavailableDates = allStartTimes.reduce(
    (commonDates, startTime) => {
      if (commonDates === null) return new Set(unavailableDatesMap[startTime]);
      return new Set(
        [...commonDates].filter((date) =>
          unavailableDatesMap[startTime].includes(date)
        )
      );
    },
    null
  );
  console.log("Common Unvailable Dates", commonUnavailableDates);
  return [...commonUnavailableDates];
}
// Example usage:
// let commonUnavailableDates = getCommonUnavailableDates(data);

//FUNCTION - Filter Season Dates with Common Unavailable Dates
function filterSeasonWithCommonUnavailableDates(
  filteredSeasonDates,
  commonUnavailableDates
) {
  const unavailableDateSet = new Set(commonUnavailableDates);
  const filteredAvailableDates = filteredSeasonDates.filter(
    (date) => !unavailableDateSet.has(date)
  );
  console.log(
    "Filtered Season dates with no common unavailable dates ",
    filteredAvailableDates
  );
  return filteredAvailableDates;
}
// Example usage:
// filteredAvailableDates = filterSeasonWithCommonUnavailableDates(filteredSeasonDates,commonUnavailableDates);

// FUNCTION - Filter by days of the week
function filterDatesByDayOfWeek(filteredSeasonDates, daysOfWeek) {
  const filteredAvailableDates = filteredSeasonDates.filter((dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();
    return daysOfWeek.includes(dayOfWeek);
  });
  console.log("Filtered dates by days of the week:", filteredAvailableDates);
  return filteredAvailableDates;
}
// Example usage:
//let filteredAvailableDates = filterDatesByDayOfWeek(filteredSeasonDates, daysOfWeek);

// FUNCTION - Get the first available date for calendar
function getFirstAvailableDate() {
  // Assuming filteredAvailableDates is an array of "yyyy-mm-dd" strings
  // Check if the array is not empty
  if (filteredAvailableDates && filteredAvailableDates.length > 0) {
    // Return a new Date object created from the first element in the array
    return new Date(filteredAvailableDates[0]);
  } else {
    // Return today's date or any other default value if no dates are available
    return new Date();
  }
}
// Example usage:
// getFirstAvailableDate()

// Function to get all unavailable dates from all bookable items
function getAllUnavailableDates(data) {
  let allUnavailableDates = [];

  data.bookableItems.forEach((item) => {
    item.seasons.forEach((season) => {
      season.pricingRecords.forEach((pricingRecord) => {
        allUnavailableDates = allUnavailableDates.concat(
          pricingRecord.unavailableDates.map((dateEntry) => dateEntry.date)
        );
      });
    });
  });

  // Remove duplicate dates
  return [...new Set(allUnavailableDates)];
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
if (productOptionCode) {
  console.log("Has Product Option Code. 1/5");
  if (Array.isArray(productOptionCode) && productOptionCode.length > 1) {
    console.log("More than one Product Option Code. 2/5");
    console.log("Number of Product Option Codes:", productOptionCode.length);
    console.log("Array of Product Option Codes:", productOptionCode);
  } else {
    console.log("Has 1 Product Option Code. 2/5");
    console.log(`Product Option Code: ${productOptionCode}`);

    if (seasons.length === 1) {
      console.log("Has 1 Season. 2/5");
      // FUNCTION - Builds Season Start & End Date
      buildSeasonRange(seasons);
      // FUNCTION - Build all Days Within 1 Season
      buildDayInSeason(data, availableDates);
      // FUNCTION - Filter Season Dates With Available Dates
      filteredSeasonDates = filterSeasonDates(availableDates, data);
      if (startDate && endDate) {
        console.log("Has Start and End Date. 3/5");
        console.log(`Season Start Date: ${startDate}, End Date: ${endDate}`);

        if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
          console.log("Runs Every Day.");
          console.log(daysOfWeek);

          if (Array.isArray(timedEntries) && timedEntries.length > 0) {
            console.log("Has Timed Entries");
            const numberOfTimedEntries = timedEntries.length;
            let hasUnavailableDates = timedEntries.some((entry) => {
              return (
                Array.isArray(entry.unavailableDates) &&
                entry.unavailableDates.length > 0
              );
            });

            if (hasUnavailableDates) {
              console.log("Has Unavailable Dates");
              // FUNCTION - Common Unavailable Dates for Time Entries
              let commonUnavailableDates = getCommonUnavailableDates(data);
              const numberOfCommonDates = commonUnavailableDates.length;
              console.log(
                `Number of Common Unavailable Dates: ${numberOfCommonDates}`
              );
              filterSeasonDates = filterSeasonDates(availableDates, data);
              console.log(filteredSeasonDates);
              filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
                filteredSeasonDates,
                commonUnavailableDates
              );
            } else {
              console.log("No UnDates");
            } //Has No Unavailable Dates
          } else {
            console.log("No TE");
            let hasUnavailableDates = pricingRecords.some((entry) => {
              return (
                Array.isArray(entry.unavailableDates) &&
                entry.unavailableDates.length > 0
              );
            });
            if (hasUnavailableDates) {
              console.log("Has UnDates");
              const allUnavailableDates = getAllUnavailableDates(data);

              const unavailableDates = availableDates.filter((date) => {
                return allUnavailableDates.includes(date);
              });
              console.log("unDates", unavailableDates);

              // Filter UnDates that are unavailable for all start times
              const unavailableDateSet = new Set(unavailableDates);
              filteredAvailableDates = filteredSeasonDates.filter(
                (date) => !unavailableDateSet.has(date)
              );
              console.log("Fil Dates", filteredAvailableDates);
            } else {
              console.log("No UnDates");
            }
          } //Has No Timed Entries
        } else {
          console.log("Runs on: " + daysOfWeek.join(", ") + "4/5");

          if (Array.isArray(timedEntries) && timedEntries.length > 0) {
            console.log("Has Timed Entries.");
            const numberOfTimedEntries = timedEntries.length;
            console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
            console.log(timedEntries);

            let hasUnavailableDates = timedEntries.some((entry) => {
              return (
                Array.isArray(entry.unavailableDates) &&
                entry.unavailableDates.length > 0
              );
            });

            if (hasUnavailableDates) {
              console.log("Has Unavaiable Dates. 6/6");

              // FUNCTION - Common Unavailable Dates for Time Entries
              let commonUnavailableDates = getCommonUnavailableDates(data);
              console.log(
                "Number of Common Unavailable Dates:",
                filteredSeasonDates
              );
              const numberOfCommonDates = commonUnavailableDates.length;
              console.log(
                `Number of Common Unavailable Dates: ${numberOfCommonDates}`
              );
              let filteredSeasonDates = filterSeasonDates(availableDates, data);

              console.log(
                "Common Unavailable Dates for all times:",
                commonUnavailableDates
              );

              // FUNCTION - Common Unavailable Dates for Time Entries
              filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
                filteredSeasonDates,
                commonUnavailableDates
              );
              // FUNCTION - Filter by days of the week
              filteredAvailableDates = filterDatesByDayOfWeek(
                filteredAvailableDates,
                daysOfWeek
              );
            } else {
              console.log("Has No Unavalable Dates. 6/6");
            } //Has No Unavailable Dates
          }
        } //else Runs on the following days
      } else if (startDate) {
        console.log("Has Start Date Only. 3/5");

        if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
          console.log("Runs Every Day. 4/5");

          if (Array.isArray(timedEntries) && timedEntries.length > 0) {
            console.log("Has Timed Entries.");
            const numberOfTimedEntries = timedEntries.length;
            console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
            console.log(timedEntries);

            let hasUnavailableDates = timedEntries.some((entry) => {
              return (
                Array.isArray(entry.unavailableDates) &&
                entry.unavailableDates.length > 0
              );
            });

            if (hasUnavailableDates) {
              console.log("Has Unavaiable Dates. 6/6");
              // FUNCTION - Common Unavailable Dates for Time Entries
              const commonUnavailableDates = getCommonUnavailableDates(data);
              const filteredSeasonDates = filterSeasonDates(
                availableDates,
                data
              );
              const numberOfCommonDates = commonUnavailableDates.length;
              console.log(
                `Number of Common Unavailable Dates: ${numberOfCommonDates}`
              );
              console.log(
                "Common Unavailable Dates for all times:",
                commonUnavailableDates
              );

              // FUNCTION - Common Unavailable Dates for Time Entries
              filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
                filteredSeasonDates,
                commonUnavailableDates
              );
            } else {
              console.log("Has No Unavalable Dates. 6/6");
              filteredAvailableDates = filteredSeasonDates;
            } //Has No Unavailable Dates
          } else {
            console.log("No TE");
            let hasUnavailableDates = pricingRecords.some((entry) => {
              return (
                Array.isArray(entry.unavailableDates) &&
                entry.unavailableDates.length > 0
              );
            });

            if (hasUnavailableDates) {
              console.log("Has UnDates");

              // Filter UnDates that are unavailable for all start times
              unavailableDates = availableDates.filter((date) => {
                return data.bookableItems[0].seasons[0].pricingRecords.every(
                  (entry) => {
                    return entry.unavailableDates.some(
                      (dateEntry) => dateEntry.date === date
                    );
                  }
                );
              });
              console.log("unDates", unavailableDates);
              // filterAvDatesByUnDates func
              filteredAvailableDates = filterAvDatesByUnDates(
                filteredSeasonDates,
                unavailableDates
              );
            } else {
              console.log("No UnDates");
            } //Has No UnDates
          } //Has No Timed Entries
        } else {
          console.log("Runs on: " + daysOfWeek.join(", "));
          filteredAvailableDates = filterDatesByDayOfWeek(
            filteredSeasonDates,
            daysOfWeek
          );
        } //else Runs on the following days
      } else {
        console.log("Has No Start Date. 3/5");
      } //else has no start date
    } // 1 season
    else {
      console.log("Has more than one season. ");
      console.log("Number of seasons: " + seasons.length);
      console.log(seasons);
      // FUNCTION - Builds Season Start & End Date
      buildSeasonRange(seasons);
    }
    // FUNCTION - Build all Days Within all Season
    buildDayInSeason2(data, availableDates);
    // FUNCTION - Filter Season Dates With Available Dates
    filteredSeasonDates = filterSeasonDates(availableDates, data);

    if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
      console.log("Runs Every Day. 4/5");
      console.log(daysOfWeek);

      if (Array.isArray(timedEntries) && timedEntries.length > 0) {
        console.log("Has Timed Entries");
        const numberOfTimedEntries = timedEntries.length;
        let hasUnavailableDates = timedEntries.some((entry) => {
          return (
            Array.isArray(entry.unavailableDates) &&
            entry.unavailableDates.length > 0
          );
        });

        if (hasUnavailableDates) {
          console.log("Has Unavailable Dates");

          // FUNCTION - Common Unavailable Dates for Time Entries
          let commonUnavailableDates = getCommonUnavailableDates(data);
          const numberOfCommonDates = commonUnavailableDates.length;
          console.log(
            `Number of Common Unavailable Dates: ${numberOfCommonDates}`
          );
          filterSeasonDates = filterSeasonDates(availableDates, data);
          console.log(filteredSeasonDates);
          filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
            filteredSeasonDates,
            commonUnavailableDates
          );
        } else {
          console.log("No UnDates");
        } //Has No Unavailable Dates
      } else {
        console.log("No TE");
        let hasUnavailableDates = pricingRecords.some((entry) => {
          return (
            Array.isArray(entry.unavailableDates) &&
            entry.unavailableDates.length > 0
          );
        });
        if (hasUnavailableDates) {
          console.log("Has UnDates");
          const allUnavailableDates = getAllUnavailableDates(data);

          const unavailableDates = availableDates.filter((date) => {
            return allUnavailableDates.includes(date);
          });
          console.log("unDates", unavailableDates);

          // Filter UnDates that are unavailable for all start times
          const unavailableDateSet = new Set(unavailableDates);
          filteredAvailableDates = filteredSeasonDates.filter(
            (date) => !unavailableDateSet.has(date)
          );
          console.log("Fil Dates", filteredAvailableDates);
        } else {
          console.log("No UnDates");
        }
      } //Has No Timed Entries
    } else {
      console.log("Runs on: " + daysOfWeek.join(", ") + "4/5");

      if (Array.isArray(timedEntries) && timedEntries.length > 0) {
        console.log("Has Timed Entries.");
        const numberOfTimedEntries = timedEntries.length;
        console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
        console.log(timedEntries);

        let hasUnavailableDates = timedEntries.some((entry) => {
          return (
            Array.isArray(entry.unavailableDates) &&
            entry.unavailableDates.length > 0
          );
        });

        if (hasUnavailableDates) {
          console.log("Has Unavaiable Dates. 6/6");

          // FUNCTION - Common Unavailable Dates for Time Entries
          let commonUnavailableDates = getCommonUnavailableDates(data);
          console.log(
            "Number of Common Unavailable Dates:",
            filteredSeasonDates
          );
          const numberOfCommonDates = commonUnavailableDates.length;
          console.log(
            `Number of Common Unavailable Dates: ${numberOfCommonDates}`
          );
          let filteredSeasonDates = filterSeasonDates(availableDates, data);

          console.log(
            "Common Unavailable Dates for all times:",
            commonUnavailableDates
          );

          // FUNCTION - Common Unavailable Dates for Time Entries
          filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
            filteredSeasonDates,
            commonUnavailableDates
          );
          // FUNCTION - Filter by days of the week
          filteredAvailableDates = filterDatesByDayOfWeek(
            filteredAvailableDates,
            daysOfWeek
          );
        } else {
          console.log("Has No Unavalable Dates. 6/6");
          filteredAvailableDates = filterDatesByDayOfWeek(
            filteredSeasonDates,
            daysOfWeek
          );
        } //Has No Unavailable Dates
      }
    } //else Runs on the following days
  } // 1 PC
} else {
  console.log("Has No Product Option Code. 1/5");

  if (startDate && endDate) {
    console.log("Has S&E Date");
    if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
      console.log("Every Day");
      if (Array.isArray(timedEntries) && timedEntries.length > 0) {
        console.log("Has TE");
        let hasUnavailableDates = timedEntries.some((entry) => {
          return (
            Array.isArray(entry.unavailableDates) &&
            entry.unavailableDates.length > 0
          );
        });
        if (hasUnavailableDates) {
          console.log("Has UnDates");
          // Filter UnDates that are un for all start times
          unavailableDates = availableDates.filter((date) => {
            return timedEntries.every((entry) => {
              return entry.unavailableDates.some(
                (dateEntry) => dateEntry.date === date
              );
            });
          });
          console.log("unDates", unavailableDates);
          // Filter UnDates that are un for all start times
          const unavailableDateSet = new Set(unavailableDates);
          filteredAvailableDates = filteredSeasonDates.filter(
            (date) => !unavailableDateSet.has(date)
          );
          console.log("Fil Dates", filteredAvailableDates);
        } else {
          console.log("No UnDates");
        } //Has No Unavailable Dates
      } else {
        console.log("No TE");
        let hasUnavailableDates = pricingRecords.some((entry) => {
          return (
            Array.isArray(entry.unavailableDates) &&
            entry.unavailableDates.length > 0
          );
        });

        if (hasUnavailableDates) {
          console.log("Has UnDates");

          // Filter UnDates that are un for all start times
          unavailableDates = availableDates.filter((date) => {
            return data.bookableItems[0].seasons[0].pricingRecords.every(
              (entry) => {
                return entry.unavailableDates.some(
                  (dateEntry) => dateEntry.date === date
                );
              }
            );
          });
          console.log("unDates", unavailableDates);
          //filterAvDatesByUnDates func
          filteredAvailableDates = filterAvDatesByUnDates(
            filteredSeasonDates,
            unavailableDates
          );
        } else {
          console.log("No UnDates");
        } //No Unavailable Dates
      } //No Timed Entries
    } else {
      console.log("Runs on: " + daysOfWeek.join(", "));
    } //following days
  } else if (startDate) {
    console.log("Has S Date");
  } else {
    console.log("No S Date");
  } //no start date
} //if product option code
//++++++++++++++++++++++

$("#datepicker").datepicker({
  defaultDate: getFirstAvailableDate(),

  minDate: new Date(),
  dateFormat: "yy-mm-dd",
  beforeShow: function (input, inst) {
    var currentDate = new Date();
    var maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 1); // Set max date
    inst.settings.maxDate = maxDate; // Update maxDate
  },
  onSelect: function (dateText) {
    $("#selected_date").val(dateText);
    localStorage.setItem("currentDate", dateText);
    $(".button_options.next").attr("disabled", false);
    console.log(dateText);
  },
  beforeShowDay: function (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = year + "-" + month + "-" + day;

    let isAvailable = filteredAvailableDates.includes(formattedDate);

    return [isAvailable, isAvailable ? "" : "unavailable-date", ""];
  },
  onChangeMonthYear: function (year, month, inst) {
    setTimeout(function () {
      var nextMonth = month + 1;
      var nextYear = year;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }

      var hasAvailableDays = filteredAvailableDates.some(function (date) {
        return date.startsWith(
          nextYear + "-" + nextMonth.toString().padStart(2, "0")
        );
      });

      if (!hasAvailableDays) {
        $(".ui-datepicker-next").addClass("ui-state-disabled");
      } else {
        $(".ui-datepicker-next").removeClass("ui-state-disabled");
      }
    }, 1);
  },
});
