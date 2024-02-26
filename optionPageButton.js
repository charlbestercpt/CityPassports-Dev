async function bookingHold() {
  console.log("button clicked");

  //inside the click event
  var button = document.querySelector(".button_book");
  button.classList.add("spinner");

  setTimeout(function () {
    button.classList.remove("spinner");
  }, 10000);

  const new_data = JSON.parse(localStorage.getItem("data"));
  let product_code = new_data.productCode;
  const currency = "CAD";
  const memberData = localStorage.getItem("_ms-mem");
  const memberDataObj = JSON.parse(memberData);
  const xeroID = memberDataObj.metaData.xeroID;
  localStorage.setItem("xeroID", xeroID);
  const selected_time = localStorage.getItem("selected_time");
  const travel_date = localStorage.getItem("currentDate");
  const paxMix = JSON.parse(localStorage.getItem("paxMix"));
  const product_OptionCode = localStorage.getItem("selected_option_code");
  let requestOptions;

  if (product_OptionCode != "No-option" && selected_time != "No-time") {
    requestOptions = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        productCode: product_code,
        productOptionCode: product_OptionCode,
        currency: currency,
        travelDate: travel_date,
        startTime: selected_time,
        paxMix: paxMix,
      }),
    };
  } else if (
    product_OptionCode === "No-option" &&
    selected_time === "No-time"
  ) {
    requestOptions = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        productCode: product_code,
        currency: currency,
        travelDate: travel_date,
        paxMix: paxMix,
      }),
    };
  } else if (selected_time === "No-time") {
    requestOptions = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        productCode: product_code,
        productOptionCode: product_OptionCode,
        currency: currency,
        travelDate: travel_date,
        paxMix: paxMix,
      }),
    };
  } else {
    requestOptions = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        productCode: product_code,
        currency: currency,
        travelDate: travel_date,
        startTime: selected_time,
        paxMix: paxMix,
      }),
    };
  }

  const response = await fetch(
    "https://hook.us1.make.com/695wx4oyt8l5vvqhrjqk16ux23ig1k2l",
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.text();
  const parsedData = JSON.parse(result);
  console.log(parsedData);
  // Define the desired order of age bands
  const desiredOrder = [
    "ADULT",
    "SENIOR",
    "YOUTH",
    "CHILD",
    "INFANT",
    "TRAVELER",
  ];

  // Sort the lineItems based on the desired order
  parsedData.lineItems.sort(
    (a, b) => desiredOrder.indexOf(a.ageBand) - desiredOrder.indexOf(b.ageBand)
  );

  // Convert the updated data back to JSON
  const updatedDataJson = JSON.stringify(parsedData, null, 2);
  localStorage.setItem("booking_hold", updatedDataJson);
  const bookingHold = JSON.parse(localStorage.getItem("booking_hold"));
  let bookingHold2 = bookingHold;
  const ageBandInfo = {};
  const discountValue = parseFloat(localStorage.getItem("ADULT_Disc_Value"));

  if (discountValue > 0) {
    console.log("Discount value more than 0");

    // Initialize a variable to store the total recommended retail price
    let totalRecommendedRetailPrice = 0;

    bookingHold2.lineItems.forEach((lineItem) => {
      const ageBand = lineItem.ageBand;

      switch (ageBand) {
        case "ADULT":
        case "SENIOR":
        case "YOUTH":
        case "CHILD":
        case "INFANT":
        case "TRAVELER":
          lineItem.subtotalPrice.price.recommendedRetailPrice -= discountValue;
          lineItem.subtotalPrice.price.recommendedRetailPrice =
            Math.ceil(
              lineItem.subtotalPrice.price.recommendedRetailPrice / 0.05
            ) * 0.05;
          break;
        // Add additional cases if needed for other ageBands

        default:
          // Handle the default case here if necessary
          break;
      }

      // Add the updated recommendedRetailPrice to the total
      totalRecommendedRetailPrice +=
        lineItem.subtotalPrice.price.recommendedRetailPrice;
    });

    // Update the totalPrice's recommendedRetailPrice with the total
    bookingHold2.totalPrice.price.recommendedRetailPrice =
      totalRecommendedRetailPrice;

    console.log(bookingHold2);
    const updatedDataJson2 = JSON.stringify(bookingHold2);
    localStorage.setItem("booking_hold2", updatedDataJson2);
    bookingHold2.lineItems.forEach((lineItem) => {
      const ageBand = lineItem.ageBand;
      const numberOfTravelers = lineItem.numberOfTravelers;
      const price = lineItem.subtotalPrice.price.recommendedRetailPrice;
      ageBandInfo[ageBand] = { numberOfTravelers, price };
    });
  } else {
    bookingHold.lineItems.forEach((lineItem) => {
      const ageBand = lineItem.ageBand;
      const numberOfTravelers = lineItem.numberOfTravelers;
      const price = lineItem.subtotalPrice.price.recommendedRetailPrice;
      ageBandInfo[ageBand] = { numberOfTravelers, price };
    });
  }

  //change booking_hold2 structure
  bookingHold2.lineItems.forEach((lineItem) => {
    lineItem.subtotalPrice.price = {
      sellPrice: lineItem.subtotalPrice.price.recommendedRetailPrice,
    };
  });

  // Modify the total price
  bookingHold2.totalPrice.price = {
    sellPrice: bookingHold2.totalPrice.price.recommendedRetailPrice,
  };

  // Remove unnecessary fields if they exist
  if (bookingHold2.bookingRef) delete bookingHold2.bookingRef;
  if (bookingHold2.bookingHoldInfo) delete bookingHold2.bookingHoldInfo;

  // Convert the updated data back to JSON
  const updatedDataJson2 = JSON.stringify(bookingHold2);
  localStorage.setItem("booking_hold2", updatedDataJson2);

  const ageBandInfoString = JSON.stringify(ageBandInfo);
  localStorage.setItem("age_band_info", ageBandInfoString);
  console.log("Updated local storage");
  location.href = "/app/booking-questions";
}
