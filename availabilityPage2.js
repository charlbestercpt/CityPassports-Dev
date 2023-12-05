async function seeOption() {
  console.log("button clicked");

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  let ageBand = {
    SENIOR: 0,
    ADULT: 0,
    YOUTH: 0,
    CHILD: 0,
    INFANT: 0,
  };

  ageBand.TRAVELER =
    parseInt($("#TRAVELER > .hack17-counter-row > input").val(), 10) || 0;
  ageBand.SENIOR =
    parseInt($("#SENIOR > .hack17-counter-row > input").val(), 10) || 0;
  ageBand.ADULT =
    parseInt($("#ADULT > .hack17-counter-row > input").val(), 10) || 0;
  ageBand.YOUTH =
    parseInt($("#YOUTH > .hack17-counter-row > input").val(), 10) || 0;
  ageBand.CHILD =
    parseInt($("#CHILD > .hack17-counter-row > input").val(), 10) || 0;
  ageBand.INFANT =
    parseInt($("#INFANT > .hack17-counter-row > input").val(), 10) || 0;

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
  const new_data = JSON.parse(localStorage.getItem("data"));
  const travellers = JSON.parse(localStorage.getItem("booking_questions"));

  if (
    sumValues(ageBand) < travellers.bookingRequirements.minTravelersPerBooking
  ) {
    $("#alert-text").text(
      `A minimum of ${travellers.bookingRequirements.minTravelersPerBooking} travellers are required per booking.`
    );
    $(".dark-overlay__availability").toggleClass("active");
  } else if (
    sumValues(ageBand) > travellers.bookingRequirements.maxTravelersPerBooking
  ) {
    $("#alert-text").text(
      `A maximum of ${travellers.bookingRequirements.maxTravelersPerBooking} travellers allowed per booking. `
    );
    $(".dark-overlay__availability").toggleClass("active");
  } else {
    let product_code = new_data.productCode;
    const currency = new_data.currency;
    const travel_date = localStorage.getItem("currentDate");

    const desiredOrder = [
      "ADULT",
      "SENIOR",
      "YOUTH",
      "CHILD",
      "INFANT",
      "TRAVELER",
    ];
    const ageBandData = {
      SENIOR: ageBand.SENIOR || 0,
      ADULT: ageBand.ADULT || 0,
      YOUTH: ageBand.YOUTH || 0,
      CHILD: ageBand.CHILD || 0,
      INFANT: ageBand.INFANT || 0,
      TRAVELER: ageBand.TRAVELER || 0,
    };

    const paxMix = [];

    // Iterate through the desired order and add available age bands to paxMix in that order
    for (const ageBand of desiredOrder) {
      const numberOfTravelers = ageBandData[ageBand] || 0;
      if (numberOfTravelers > 0) {
        paxMix.push({
          ageBand: ageBand,
          numberOfTravelers: numberOfTravelers,
        });
      }
    }

    localStorage.setItem("paxMix", JSON.stringify(paxMix));
    var requestOptions = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        productCode: product_code,
        currency: currency,
        travelDate: travel_date,
        paxMix: paxMix,
      }),
    };
    console.log(requestOptions);

    fetch(
      "https://hook.us1.make.com/hap9if05quo9l24cbvxfm74w5sfzuws1",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        localStorage.setItem("see_option", result);
        const see_option = result;
        console.log("see_option", see_option);
        const see_option2 = see_option;
        console.log("see_option2", see_option2);

        const discountValue = localStorage.getItem("ADULT_Disc_Value");
        console.log("discValue", discountValue);
        const ageBands = [
          "ADULT",
          "SENIOR",
          "CHILD",
          "YOUTH",
          "INFANT",
          "TRAVELER",
        ];
        const isAdultDiscountType = localStorage.getItem("ADULT_Disc_Type");
        console.log("discType", isAdultDiscountType);

        if (isAdultDiscountType === "true" && discountValue) {
          console.log(discountValue + "%");
          return; // Exit the function
        } else if (isAdultDiscountType === "false" && discountValue > 0) {
          console.log(discountValue + "CAD");

          // Deduct the discountValue from recommendedRetailPrice for all age bands
          const see_option2 = JSON.parse(see_option);
          see_option2.bookableItems.forEach((item) => {
            item.lineItems.forEach((lineItem) => {
              // Calculate the total discount for the age band
              const totalDiscount = discountValue * lineItem.numberOfTravelers;
              switch (lineItem.ageBand) {
                case "ADULT":
                case "SENIOR":
                case "YOUTH":
                case "CHILD":
                case "INFANT":
                case "TRAVELER":
                  lineItem.subtotalPrice.price.recommendedRetailPrice -=
                    totalDiscount;
                  lineItem.subtotalPrice.price.recommendedRetailPrice =
                    Math.ceil(
                      lineItem.subtotalPrice.price.recommendedRetailPrice / 0.05
                    ) * 0.05;
                  break;
              }
            });

            // Calculate the sum of recommendedRetailPrice for this item's lineItems
            const sumRecommendedRetailPrice = item.lineItems.reduce(
              (sum, lineItem) =>
                sum + lineItem.subtotalPrice.price.recommendedRetailPrice,
              0
            );

            // Update the totalPrice's recommendedRetailPrice
            item.totalPrice.price.recommendedRetailPrice =
              sumRecommendedRetailPrice;
          });

          console.log("Updated see_option2", see_option2);
          localStorage.setItem("see_option2", JSON.stringify(see_option2));

          // return; // Exit the function
        } else {
          //No Disocunt
          console.log("no discount");
          console.log(discountValue);
        }
        console.log("Updated local storage");
        location.href = "/app/experience-options";
      })
      .catch((error) => console.log("error", error));
  }
  const button = document.querySelector(".button_options");
  button.classList.add("spinner");

  // make your AJAX request here, and when you get a response, remove the spinner class:
  setTimeout(function () {
    button.classList.remove("spinner");
  }, 10000);
}

<button class="button_options" id="see_options" onclick="seeOption()">
  See Options
</button>;
