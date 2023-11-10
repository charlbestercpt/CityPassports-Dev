const firstDate = new Date(); // gets the current date and time
const lastDate = new Date();
lastDate.setFullYear(firstDate.getFullYear() + 1); // Set the end date to one year from the current date

while (firstDate < lastDate) {
  const year = firstDate.getFullYear(); // Extract the last two digits of the year
  const month = (firstDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = firstDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  availableDates.push(formattedDate);

  firstDate.setDate(firstDate.getDate() + 1); // Move to the next day
}

console.log("Next 366 Days", availableDates);

// Extract s&e dates of each season and log dates within each season
data.bookableItems[0].seasons.forEach((season) => {
  const startDate = new Date(season.startDate);

  // Check if season.endDate is defined, if not, assign it the last date from availDates
  if (!season.endDate) {
    season.endDate = availableDates[availableDates.length - 1];
  }

  console.log(`Season: ${season.startDate} to ${season.endDate}`);

  const seasonDates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(season.endDate)) {
    seasonDates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log("All dates within seasons", seasonDates);
});

// Iterate through the available dates and check if each date falls within any season
filteredSeasonDates = availableDates.filter((date) => {
  const currentDate = new Date(date);
  // Check if the date falls within any season
  return data.bookableItems[0].seasons.some(
    (season) =>
      currentDate >= new Date(season.startDate) &&
      currentDate <= new Date(season.endDate)
  );
});

console.log("Dates within season and next 366 days", filteredSeasonDates);

//functions
//filter by unavail func
function filterAvDatesByUnDates(filteredSeasonDates, unavailableDates) {
  const unavailableDateSet = new Set(unavailableDates);
  const filteredAvailableDates = filteredSeasonDates.filter(
    (date) => !unavailableDateSet.has(date)
  );
  console.log("FilDates", filteredAvailableDates);
  return filteredAvailableDates;
}
// filter days of the week
function filterDatesByDayOfWeek(filteredSeasonDates, daysOfWeek) {
  const filteredAvailableDates = filteredSeasonDates.filter((dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();
    return daysOfWeek.includes(dayOfWeek);
  });

  console.log("daysfil", filteredAvailableDates);
  return filteredAvailableDates;
}
