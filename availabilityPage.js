const data = JSON.parse(localStorage.getItem("data"));

//set variables

const getProductOptionCodes = (data) => {
  // Check if bookableItems is an array and it's not empty
  if (!Array.isArray(data.bookableItems) || data.bookableItems.length === 0) {
    return ["No Product Option Codes"];
  }

  // Return an array of productOptionCodes
  return data.bookableItems.map((item) => item.productOptionCode);
};

const productOptionCode = getProductOptionCodes(data);
const bookableItems = data.bookableItems;
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

// ALL FUNCTIONS //

// FUNCTION - Create next 365 days
function generateDateRange(firstDate) {
  let availableDates = [];
  let currentDate = new Date(); // Today's Date
  for (let i = 0; i < 365; i++) {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    availableDates.push(formattedDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log("Dates of the next 365 days:", availableDates);
  return availableDates;
}
// Example Usage:
//

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
  let allSeasonDates = []; // Array to store dates from all seasons
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
    allSeasonDates = allSeasonDates.concat(seasonDates); // Combine dates from this season with the main array
  });
  console.log("All dates within the seasons", allSeasonDates);
  return allSeasonDates; // Return the combined list of dates from all seasons
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

  console.log("All dates within all seasons:", allSeasonDates);
  return allSeasonDates; // Return the combined array
}
// Example usage:
// buildDayInSeason2(data, availableDates);

//TEST FUNCTION
function buildDayInSeasonForAllBookableItemsWithoutDuplicates(
  data,
  availableDates
) {
  let allSeasonDates = new Set(); // Using a Set to automatically handle duplicates

  data.bookableItems.forEach((bookableItem) => {
    bookableItem.seasons.forEach((season) => {
      const startDate = new Date(season.startDate);
      const endDate = season.endDate
        ? new Date(season.endDate)
        : new Date(availableDates[availableDates.length - 1]);

      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        allSeasonDates.add(currentDate.toISOString().split("T")[0]);
      }
    });
  });

  console.log(
    "Unique dates within all seasons of all bookable items:",
    Array.from(allSeasonDates)
  );
  return Array.from(allSeasonDates); // Convert the Set back to an array before returning
}

//FUNCTION - Check if all bookable items have one season
function checkIfAllBookableItemsHaveOneSeason(data) {
  for (const bookableItem of data.bookableItems) {
    if (!bookableItem.seasons || bookableItem.seasons.length !== 1) {
      console.log("Not all bookable items have one season");
      return false; // Return false as soon as one bookable item does not meet the condition
    }
    console.log("All bookable items have one season");
    return true; // Return true if all bookable items meet the condition
  }

  if (allHaveOneSeason) {
    console.log("All bookable items have 1 season.");
  } else {
    console.log("Not all bookable items have one season.");
  }
}

//FUNCTION - Define all bookable item's number of seasons and season start and end dates.
function logAllSeasonsForEachBookableItemWithRange(data) {
  data.bookableItems.forEach((bookableItem, itemIndex) => {
    if (bookableItem.seasons && bookableItem.seasons.length > 0) {
      console.log(
        `Bookable Item ${itemIndex + 1} - Number of seasons: ${
          bookableItem.seasons.length
        }`
      );

      bookableItem.seasons.forEach((season, seasonIndex) => {
        const startDate = season.startDate || "No Start Date";
        const endDate = season.endDate || "No End Date";
        console.log(
          `Season ${
            seasonIndex + 1
          } Start Date: ${startDate}, End Date: ${endDate}`
        );
      });
    } else {
      console.log(
        `Bookable Item ${itemIndex + 1} does not have any seasons defined.`
      );
    }
  });
}

//FUNCTION - Build array of available dates within all the seasons.
function buildDayInSeasonForAllBookableItems(data, availableDates) {
  let allSeasonDates = []; // Array to accumulate dates from all seasons

  data.bookableItems.forEach((bookableItem) => {
    bookableItem.seasons.forEach((season) => {
      const startDate = new Date(season.startDate);

      // Set the end date to the last available date if it's not provided
      let endDate = season.endDate
        ? new Date(season.endDate)
        : new Date(availableDates[availableDates.length - 1]);

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        allSeasonDates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  });

  // Remove duplicates from allSeasonDates
  let uniqueSeasonDates = [...new Set(allSeasonDates)];

  console.log("All dates within all seasons:", uniqueSeasonDates);
  return uniqueSeasonDates; // Return the combined array
}

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

  console.log("Season dates within next 365:", filteredSeasonDates);
  return filteredSeasonDates;
}
// Example usage:
// filteredSeasonDates = filterSeasonDates(availableDates, data);

// FUNCTIONtest - Filter Season Dates With Available Dates

function filterAvailableDatesByBookableItemSeasons(availableDates, data) {
  if (
    !Array.isArray(availableDates) ||
    !data ||
    !Array.isArray(data.bookableItems)
  ) {
    console.error("Invalid input");
    return [];
  }

  // Filter available dates based on all bookable items' seasons
  let filteredSeasonDates = availableDates.filter((date) => {
    const currentDate = new Date(date);
    return data.bookableItems.some((item) =>
      item.seasons.some((season) => {
        const startDate = new Date(season.startDate);
        const endDate = season.endDate
          ? new Date(season.endDate)
          : new Date(8640000000000000); // Max date value if endDate is undefined
        return currentDate >= startDate && currentDate <= endDate;
      })
    );
  });

  console.log(
    "Filtered available dates within the seasons:",
    filteredSeasonDates
  );
  return filteredSeasonDates;
}

// FUNCTION - Common Unavailable Dates for Time Entries
function getCommonUnavailableDates(data) {
  // Collect all unavailable dates for each timed entry
  const unavailableDatesPerTimedEntry = data.bookableItems.flatMap((item) =>
    item.seasons.flatMap((season) =>
      season.pricingRecords.flatMap((record) =>
        record.timedEntries.map((entry) => ({
          startTime: entry.startTime,
          unavailableDates: entry.unavailableDates
            ? entry.unavailableDates.map((date) => date.date)
            : [],
        }))
      )
    )
  );

  // Find the intersection of unavailable dates across all timed entries
  const commonUnavailableDates = unavailableDatesPerTimedEntry.reduce(
    (commonDates, currentEntry) => {
      if (commonDates === null) return new Set(currentEntry.unavailableDates);
      return new Set(
        [...commonDates].filter((date) =>
          currentEntry.unavailableDates.includes(date)
        )
      );
    },
    null
  );

  console.log("Common Unavailable Dates:", commonUnavailableDates);
  return [...commonUnavailableDates];
}

// Example usage:
// let commonUnavailableDates = getCommonUnavailableDates(data);

//FUNCTION: getCommonUnavailableDates test

function getCommonUnavailableDates2(data) {
  if (!data || !Array.isArray(data.bookableItems)) {
    console.error("Invalid data format");
    return [];
  }

  let allUnavailableDates = [];

  // Iterate over each bookable item
  data.bookableItems.forEach((item) => {
    item.seasons.forEach((season) => {
      season.pricingRecords.forEach((record) => {
        record.timedEntries.forEach((entry) => {
          if (entry.unavailableDates) {
            const dates = entry.unavailableDates.map((ud) => ud.date);
            allUnavailableDates.push(dates);
          }
        });
      });
    });
  });

  // Find common dates across all timed entries
  const commonUnavailableDates = allUnavailableDates.reduce(
    (commonDates, dates) => {
      if (commonDates === null) return new Set(dates);
      return new Set([...commonDates].filter((date) => dates.includes(date)));
    },
    null
  );

  console.log("Common Unavailable Dates:", commonUnavailableDates);
  return commonUnavailableDates ? [...commonUnavailableDates] : [];
}

// Usage
// const commonDates = getCommonUnavailableDates2(data);
// console.log(commonDates);

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
    "Filtered Season dates with no common unavailable dates:",
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

// FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
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

// FUNCTION - Get product option code
function checkProductOption(productOptionCode, data) {
  // Validate input parameters
  if (!Array.isArray(productOptionCode)) {
    console.error("Invalid input: productOptionCode is not an array.");
    return;
  }
  if (typeof data !== "object" || data === null) {
    console.error("Invalid input: data is not an object.");
    return;
  }

  // Check if the array contains "No Product Option Codes"
  if (!productOptionCode.includes("No Product Option Codes")) {
    if (data.bookableItems) {
      console.log("Bookable Items:", data.bookableItems);
    } else {
      console.log("Data does not have bookableItems");
    }
    console.log("Array of Product Option Codes:", productOptionCode);
  } else {
    console.log("Has No Product Option Code.");
  }
}
// Usage example
// checkProductOption(productOptionCode, data);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
if (bookableItems) {
  // FUNCTION - Create next 365 days
  let availableDates = generateDateRange(startDate, endDate);

  // Check for bookableItems and productOptionCode.
  if (
    (Array.isArray(bookableItems) && bookableItems.length > 1) ||
    bookableItems.length === 1
  ) {
    console.log(`Has Bookable Items (${bookableItems.length})`);
    checkProductOption(productOptionCode, data);
  } else {
    console.log("Has No Bookable Items");
    checkProductOption(productOptionCode, data);
  }
  // Check for bookableItems and productOptionCode.

  //FUNCTION - Check if all bookable items have one season
  allHaveOneSeason = checkIfAllBookableItemsHaveOneSeason(data);

  if (allHaveOneSeason) {
    // FUNCTION - Builds Season Start & End Date
    allSeasonDates = buildDayInSeasonForAllBookableItemsWithoutDuplicates(
      data,
      availableDates
    );

    // FUNCTION - Filter Season Dates With Available Dates
    filteredSeasonDates = filterAvailableDatesByBookableItemSeasons(
      availableDates,
      data
    );

    if (startDate && endDate) {
      console.log("Has Start and End Date.");

      if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
        console.log("Runs Every Day.");

        if (Array.isArray(timedEntries) && timedEntries.length > 0) {
          console.log("Has Timed Entries.");
          const numberOfTimedEntries = timedEntries.length;
          console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          } //Has No Unavailable Dates
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
            const allUnavailableDates = getAllUnavailableDates(data);

            let unavailableDates = availableDates.filter((date) => {
              return allUnavailableDates.includes(date);
            });
            let commonUnavailableDates = unavailableDates;
            console.log("All unavailable dates:", unavailableDates);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } //Has No Timed Entries
      } else {
        console.log("Runs on: " + daysOfWeek.join(", "));

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
            console.log("Has Unavaiable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);

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
            console.log("Has No Unavalable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
            filteredAvailableDates = filterDatesByDayOfWeek(
              filteredSeasonDates,
              daysOfWeek
            );
          } //Has No Unavailable Dates
        }
      } //else Runs on the following days
    } else if (startDate) {
      console.log("Has Start Date Only.");

      if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
        console.log("Runs Every Day.");

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
            console.log("Has Unavaiable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            const commonUnavailableDates = getCommonUnavailableDates(data);

            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
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
            console.log("Has No Unavalable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");

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
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          } //Has No UnDates
        } //Has No Timed Entries
      } else {
        console.log("Runs on: " + daysOfWeek.join(", "));

        if (Array.isArray(timedEntries) && timedEntries.length > 1) {
          console.log("Has Timed Entries.");
          const numberOfTimedEntries = timedEntries.length;
          console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
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
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } else if (Array.isArray(timedEntries) && timedEntries.length === 1) {
          console.log("Has 1 Timed Entry.");

          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates2(data);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
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
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
            const allUnavailableDates = getAllUnavailableDates(data);

            let unavailableDates = availableDates.filter((date) => {
              return allUnavailableDates.includes(date);
            });
            let commonUnavailableDates = unavailableDates;
            console.log("All unavailable dates:", unavailableDates);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filterDatesByDayOfWeek(
              filteredSeasonDates,
              daysOfWeek
            );
          }
        }
      } //else Runs on the following days
    } else {
      console.log("Has No Start Date. 3/5");
    } //else has no start date
  } else {
    //FUNCTION - Define all bookable item's number of seasons and season start and end dates.
    logAllSeasonsForEachBookableItemWithRange(data);
    allSeasonDates = buildDayInSeasonForAllBookableItemsWithoutDuplicates(
      data,
      availableDates
    );
    const filteredSeasonDates = filterAvailableDatesByBookableItemSeasons(
      availableDates,
      data
    );

    if (startDate && endDate) {
      console.log("Has Start and End Date.");

      if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
        console.log("Runs Every Day.");

        if (Array.isArray(timedEntries) && timedEntries.length > 0) {
          console.log("Has Timed Entries.");
          const numberOfTimedEntries = timedEntries.length;
          console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          } //Has No Unavailable Dates
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
            const allUnavailableDates = getAllUnavailableDates(data);

            let unavailableDates = availableDates.filter((date) => {
              return allUnavailableDates.includes(date);
            });
            let commonUnavailableDates = unavailableDates;
            console.log("All unavailable dates:", unavailableDates);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } //Has No Timed Entries
      } else {
        console.log("Runs on: " + daysOfWeek.join(", "));

        if (Array.isArray(timedEntries) && timedEntries.length > 1) {
          console.log(`Has Timed Entries (${timedEntries.length})`);
          console.log(timedEntries);

          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavaiable Dates.");

            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);

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
            console.log("Has No Unavalable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          } //Has No Unavailable Dates
        } else {
          console.log(`Has Timed Entries (${timedEntries.length})`);
          console.log(timedEntries);
          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavaiable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            processUnavailableDates2(seasons);

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
          }
          console.log("Has No Unavaiable Dates.");

          filteredAvailableDates = filteredSeasonDates;
          console.log(
            "Filtered Season dates with no unavailable dates:",
            filteredAvailableDates
          );
        }
      } //else Runs on the following days
    } else if (startDate) {
      console.log("Has Start Date Only.");

      if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
        console.log("Runs Every Day.");

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
            console.log("Has Unavaiable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            const commonUnavailableDates = getCommonUnavailableDates(data);
            const filteredSeasonDates = filterSeasonDates(availableDates, data);
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
            console.log("Has No Unavalable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");

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
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          } //Has No UnDates
        } //Has No Timed Entries
      } else {
        console.log("Runs on: " + daysOfWeek.join(", "));

        if (Array.isArray(timedEntries) && timedEntries.length > 0) {
          console.log("Has Timed Entries.");
          const numberOfTimedEntries = timedEntries.length;
          console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
          let hasUnavailableDates = timedEntries.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Common Unavailable Dates for Time Entries
            let commonUnavailableDates = getCommonUnavailableDates(data);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
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
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filteredSeasonDates;
            console.log(
              "Filtered Season dates with no unavailable dates:",
              filteredAvailableDates
            );
          }
        } else {
          console.log("No Timed Entries.");
          let hasUnavailableDates = pricingRecords.some((entry) => {
            return (
              Array.isArray(entry.unavailableDates) &&
              entry.unavailableDates.length > 0
            );
          });

          if (hasUnavailableDates) {
            console.log("Has Unavailable Dates.");
            // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
            const allUnavailableDates = getAllUnavailableDates(data);

            let unavailableDates = availableDates.filter((date) => {
              return allUnavailableDates.includes(date);
            });
            let commonUnavailableDates = unavailableDates;
            console.log("All unavailable dates:", unavailableDates);
            //FUNCTION - Filter Season Dates with Common Unavailable Dates
            filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
              filteredSeasonDates,
              commonUnavailableDates
            );
          } else {
            console.log("No Unavailable Dates.");
            filteredAvailableDates = filterDatesByDayOfWeek(
              filteredSeasonDates,
              daysOfWeek
            );
          }
        }
      } //else Runs on the following days
    } else {
      console.log("Has No Start Date. 3/5");
    } //else has no start date
  }

  if (seasons.length === 1) {
  } // 1 season
  //else if (Array.isArray(bookableItems) && bookableItems.length === 1) {
  //   console.log("Has 1 bookable Item.");
  //   checkProductOption(productOptionCode, data);
  //   allHaveOneSeason = checkIfAllBookableItemsHaveOneSeason(data);

  //   if (allHaveOneSeason) {
  //     console.log("All bookable items have one season.");
  //     console.log("Has 1 Season.");
  //     // FUNCTION - Builds Season Start & End Date
  //     allSeasonDates = buildDayInSeasonForAllBookableItemsWithoutDuplicates(
  //       data,
  //       availableDates
  //     );
  //     // FUNCTION - Build all Days Within 1 Season
  //     //allSeasonDates = buildDayInSeason2(data, availableDates);
  //     // FUNCTION - Filter Season Dates With Available Dates
  //     filteredSeasonDates = filterSeasonDates(availableDates, data);

  //     if (startDate && endDate) {
  //       console.log("Has Start and End Date.");

  //       if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
  //         console.log("Runs Every Day.");

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             let commonUnavailableDates = getCommonUnavailableDates(data);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("No Unavailable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           } //Has No Unavailable Dates
  //         } else {
  //           console.log("No Timed Entries.");
  //           let hasUnavailableDates = pricingRecords.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");
  //             // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
  //             const allUnavailableDates = getAllUnavailableDates(data);

  //             let unavailableDates = availableDates.filter((date) => {
  //               return allUnavailableDates.includes(date);
  //             });
  //             let commonUnavailableDates = unavailableDates;
  //             console.log("All unavailable dates:", unavailableDates);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("No Unavailable Dates");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           }
  //         } //Has No Timed Entries
  //       } else {
  //         console.log("Runs on: " + daysOfWeek.join(", "));

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           console.log(timedEntries);

  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavaiable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             let commonUnavailableDates = getCommonUnavailableDates(data);

  //             let filteredSeasonDates = filterSeasonDates(availableDates, data);
  //             console.log(
  //               "Common Unavailable Dates for all times:",
  //               commonUnavailableDates
  //             );
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //             // FUNCTION - Filter by days of the week
  //             filteredAvailableDates = filterDatesByDayOfWeek(
  //               filteredAvailableDates,
  //               daysOfWeek
  //             );
  //           } else {
  //             console.log("Has No Unavalable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           } //Has No Unavailable Dates
  //         }
  //       } //else Runs on the following days
  //     } else if (startDate) {
  //       console.log("Has Start Date Only.");

  //       if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
  //         console.log("Runs Every Day.");

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           console.log(timedEntries);

  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavaiable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             const commonUnavailableDates = getCommonUnavailableDates(data);
  //             const filteredSeasonDates = filterSeasonDates(
  //               availableDates,
  //               data
  //             );
  //             const numberOfCommonDates = commonUnavailableDates.length;
  //             console.log(
  //               `Number of Common Unavailable Dates: ${numberOfCommonDates}`
  //             );
  //             console.log(
  //               "Common Unavailable Dates for all times:",
  //               commonUnavailableDates
  //             );

  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("Has No Unavalable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           }
  //         } else {
  //           console.log("No Timed Entries.");
  //           let hasUnavailableDates = pricingRecords.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");

  //             // Filter UnDates that are unavailable for all start times
  //             unavailableDates = availableDates.filter((date) => {
  //               return data.bookableItems[0].seasons[0].pricingRecords.every(
  //                 (entry) => {
  //                   return entry.unavailableDates.some(
  //                     (dateEntry) => dateEntry.date === date
  //                   );
  //                 }
  //               );
  //             });
  //             console.log("unDates", unavailableDates);
  //             // filterAvDatesByUnDates func
  //             filteredAvailableDates = filterAvDatesByUnDates(
  //               filteredSeasonDates,
  //               unavailableDates
  //             );
  //           } else {
  //             console.log("No Unavailable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           } //Has No UnDates
  //         } //Has No Timed Entries
  //       } else {
  //         console.log("Runs on: " + daysOfWeek.join(", "));

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             let commonUnavailableDates = getCommonUnavailableDates(data);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //             // FUNCTION - Filter by days of the week
  //             filteredAvailableDates = filterDatesByDayOfWeek(
  //               filteredAvailableDates,
  //               daysOfWeek
  //             );
  //           } else {
  //             console.log("No Unavailable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           }
  //         } else {
  //           console.log("No Timed Entries.");
  //           let hasUnavailableDates = pricingRecords.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");
  //             // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
  //             const allUnavailableDates = getAllUnavailableDates(data);

  //             let unavailableDates = availableDates.filter((date) => {
  //               return allUnavailableDates.includes(date);
  //             });
  //             let commonUnavailableDates = unavailableDates;
  //             console.log("All unavailable dates:", unavailableDates);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("No Unavailable Dates.");
  //             filteredAvailableDates = filterDatesByDayOfWeek(
  //               filteredSeasonDates,
  //               daysOfWeek
  //             );
  //           }
  //         }
  //       } //else Runs on the following days
  //     } else {
  //       console.log("Has No Start Date. 3/5");
  //     } //else has no start date
  //   } // 1 season
  //   else {
  //     console.log("Has more than one season. ");
  //     console.log("Number of seasons: " + seasons.length);
  //     console.log(seasons);
  //     // FUNCTION - Builds Season Start & End Date
  //     buildSeasonRange(seasons);
  //     buildDayInSeason2(data, availableDates);
  //     filteredSeasonDates = filterSeasonDates(availableDates, data);

  //     if (startDate && endDate) {
  //       console.log("Has Start and End Date.");

  //       if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
  //         console.log("Runs Every Day.");

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavaiable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             let commonUnavailableDates = getCommonUnavailableDates(data);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("Has No Unavailable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           }
  //         } else {
  //           console.log("No Timed Entries.");
  //           let hasUnavailableDates = pricingRecords.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavailable Dates.");
  //             // FUNCTION - Get all unavailable dates from all bookable items whit no timed entries
  //             const allUnavailableDates = getAllUnavailableDates(data);

  //             let unavailableDates = availableDates.filter((date) => {
  //               return allUnavailableDates.includes(date);
  //             });
  //             let commonUnavailableDates = unavailableDates;
  //             console.log("All unavailable dates:", unavailableDates);
  //             //FUNCTION - Filter Season Dates with Common Unavailable Dates
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //           } else {
  //             console.log("No Unavailable Dates");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //           }
  //         }
  //       } else {
  //         console.log("Runs on: " + daysOfWeek.join(", "));

  //         if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //           console.log("Has Timed Entries.");
  //           const numberOfTimedEntries = timedEntries.length;
  //           console.log(`Number of Timed Entries: ${numberOfTimedEntries}`);
  //           console.log(timedEntries);

  //           let hasUnavailableDates = timedEntries.some((entry) => {
  //             return (
  //               Array.isArray(entry.unavailableDates) &&
  //               entry.unavailableDates.length > 0
  //             );
  //           });

  //           if (hasUnavailableDates) {
  //             console.log("Has Unavaiable Dates.");
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             let commonUnavailableDates = getCommonUnavailableDates(data);

  //             let filteredSeasonDates = filterSeasonDates(availableDates, data);
  //             console.log(
  //               "Common Unavailable Dates for all times:",
  //               commonUnavailableDates
  //             );
  //             // FUNCTION - Common Unavailable Dates for Time Entries
  //             filteredAvailableDates = filterSeasonWithCommonUnavailableDates(
  //               filteredSeasonDates,
  //               commonUnavailableDates
  //             );
  //             // FUNCTION - Filter by days of the week
  //             filteredAvailableDates = filterDatesByDayOfWeek(
  //               filteredAvailableDates,
  //               daysOfWeek
  //             );
  //           } else {
  //             console.log("Has No Unavalable Dates.");
  //             filteredAvailableDates = filteredSeasonDates;
  //             console.log(
  //               "Filtered Season dates with no unavailable dates:",
  //               filteredAvailableDates
  //             );
  //             filteredAvailableDates = filterDatesByDayOfWeek(
  //               filteredSeasonDates,
  //               daysOfWeek
  //             );
  //           } //Has No Unavailable Dates
  //         }
  //       }
  //     } else if (startDate) {
  //     } else {
  //       console.log("Has No Bookable Items.");
  //     }
  //   }
  // }
} else {
  console.log("Has No Bookable Items.");

  // if (startDate && endDate) {
  //   console.log("Has S&E Date");
  //   if (Array.isArray(daysOfWeek) && daysOfWeek.length === 7) {
  //     console.log("Every Day");
  //     if (Array.isArray(timedEntries) && timedEntries.length > 0) {
  //       console.log("Has TE");
  //       let hasUnavailableDates = timedEntries.some((entry) => {
  //         return (
  //           Array.isArray(entry.unavailableDates) &&
  //           entry.unavailableDates.length > 0
  //         );
  //       });
  //       if (hasUnavailableDates) {
  //         console.log("Has UnDates");
  //         // Filter UnDates that are un for all start times
  //         unavailableDates = availableDates.filter((date) => {
  //           return timedEntries.every((entry) => {
  //             return entry.unavailableDates.some(
  //               (dateEntry) => dateEntry.date === date
  //             );
  //           });
  //         });
  //         console.log("unDates", unavailableDates);
  //         // Filter UnDates that are un for all start times
  //         const unavailableDateSet = new Set(unavailableDates);
  //         filteredAvailableDates = filteredSeasonDates.filter(
  //           (date) => !unavailableDateSet.has(date)
  //         );
  //         console.log("Fil Dates", filteredAvailableDates);
  //       } else {
  //         console.log("No UnDates");
  //       } //Has No Unavailable Dates
  //     } else {
  //       console.log("No TE");
  //       let hasUnavailableDates = pricingRecords.some((entry) => {
  //         return (
  //           Array.isArray(entry.unavailableDates) &&
  //           entry.unavailableDates.length > 0
  //         );
  //       });

  //       if (hasUnavailableDates) {
  //         console.log("Has UnDates");

  //         // Filter UnDates that are un for all start times
  //         unavailableDates = availableDates.filter((date) => {
  //           return data.bookableItems[0].seasons[0].pricingRecords.every(
  //             (entry) => {
  //               return entry.unavailableDates.some(
  //                 (dateEntry) => dateEntry.date === date
  //               );
  //             }
  //           );
  //         });
  //         console.log("unDates", unavailableDates);
  //         //filterAvDatesByUnDates func
  //         filteredAvailableDates = filterAvDatesByUnDates(
  //           filteredSeasonDates,
  //           unavailableDates
  //         );
  //       } else {
  //         console.log("No UnDates");
  //       } //No Unavailable Dates
  //     } //No Timed Entries
  //   } else {
  //     console.log("Runs on: " + daysOfWeek.join(", "));
  //   } //following days
  // } else if (startDate) {
  //   console.log("Has S Date");
  // } else {
  //   console.log("No S Date");
  // } //no start date
} //if no bookable items
//++++++++++++++++++++++

// Set the currentDate in localStorage when the page loads
var currentDate = getFirstAvailableDate();
var formattedCurrentDate =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  currentDate.getDate().toString().padStart(2, "0");
localStorage.setItem("currentDate", formattedCurrentDate);

$("#datepicker").datepicker({
  defaultDate: currentDate,

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

  // FUNCTION - Deactive next button when no date are available
  onChangeMonthYear: function (year, month, inst) {
    setTimeout(function () {
      var futureDatesAvailable = filteredAvailableDates.some(function (date) {
        var dateParts = date.split("-");
        var dateYear = parseInt(dateParts[0]);
        var dateMonth = parseInt(dateParts[1]);

        return dateYear > year || (dateYear === year && dateMonth > month);
      });

      if (!futureDatesAvailable) {
        $(".ui-datepicker-next").addClass("ui-state-disabled");
      } else {
        $(".ui-datepicker-next").removeClass("ui-state-disabled");
      }
    }, 1);
  },
});
