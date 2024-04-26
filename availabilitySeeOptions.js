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

  const totalTravelers = sumValues(ageBand);
  console.log("Total travelers:", totalTravelers);

  if (totalTravelers > travellers.bookingRequirements.maxTravelersPerBooking) {
    console.log("Maximum travelers exceeded.");
    alert(
      `A maximum of ${travellers.bookingRequirements.maxTravelersPerBooking} travellers are allowed per booking.`
    );
  } else if (
    totalTravelers < travellers.bookingRequirements.minTravelersPerBooking
  ) {
    const button = document.querySelector(".button_options");
    button.textContent = "See Options";
    console.log("Minimum travelers not met.");
    alert(
      `A mimimum of ${travellers.bookingRequirements.minTravelersPerBooking} travellers are needed per booking.`
    );
    button.textContent = "See Options";
  } else {
    const button = document.querySelector(".button_options");
    button.classList.add("spinner");
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

    const offerSubType = localStorage.getItem("offerSubType");

    if (offerSubType === "[Travel] Direct - Free Sell Activities") {
      console.log(offerSubType);

      // Function to retrieve paxMix from local storage
      function getPaxMix() {
        const paxMixJson = localStorage.getItem("paxMix");
        return paxMixJson ? JSON.parse(paxMixJson) : [];
      }

      // Function to retrieve pricing details from local storage
      function getPricingDetails() {
        const pricingDetailsJson = localStorage.getItem("data");
        return pricingDetailsJson ? JSON.parse(pricingDetailsJson) : null;
      }

      // Function to calculate subtotal price for an age band
      function calculateSubtotalPrice(
        ageBand,
        numberOfTravelers,
        pricingDetails
      ) {
        const pricingDetail = pricingDetails.find(
          (detail) => detail.ageBand === ageBand
        );
        if (!pricingDetail) {
          console.error(`No pricing details found for age band: ${ageBand}`);
          return { recommendedRetailPrice: 0, partnerNetPrice: 0 };
        }
        return {
          recommendedRetailPrice:
            pricingDetail.price.original.recommendedRetailPrice *
            numberOfTravelers,
          partnerNetPrice:
            pricingDetail.price.original.partnerNetPrice * numberOfTravelers,
        };
      }

      // Function to create the see_options object
      function createSeeOptions() {
        const paxMix = getPaxMix();
        const pricingData = getPricingDetails();

        if (!pricingData || !paxMix.length) {
          console.error(
            "Pricing details or pax mix not found in local storage."
          );
          return;
        }

        const lineItems = paxMix.map((pax) => ({
          ageBand: pax.ageBand,
          numberOfTravelers: pax.numberOfTravelers,
          subtotalPrice: {
            price: calculateSubtotalPrice(
              pax.ageBand,
              pax.numberOfTravelers,
              pricingData.bookableItems[0].seasons[0].pricingRecords[0]
                .pricingDetails
            ),
          },
        }));

        let see_options = {
          currency: pricingData.currency,
          productCode: pricingData.productCode,
          travelDate: travel_date, // Replace with actual travel date
          bookableItems: [
            {
              available: true,
              lineItems: lineItems,
              totalPrice: {
                price: {
                  recommendedRetailPrice: lineItems.reduce(
                    (total, item) =>
                      total + item.subtotalPrice.price.recommendedRetailPrice,
                    0
                  ),
                  partnerNetPrice: lineItems.reduce(
                    (total, item) =>
                      total + item.subtotalPrice.price.partnerNetPrice,
                    0
                  ),
                  bookingFee: 0, // Calculate if applicable
                  partnerTotalPrice: 0, // Calculate if applicable
                },
              },
            },
          ],
        };

        // Additional calculations for total prices if needed

        return see_options;
      }

      // Usage
      let see_options = createSeeOptions();
      {
        localStorage.setItem("see_option", JSON.stringify(see_options));
        console.log("see_option", see_options);
        const see_option = see_options;
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
          let totalDiscountApplied = 0; // Initialize a variable to track the total discount applied
          const see_option2 = see_option;
          see_option2.bookableItems.forEach((item) => {
            item.lineItems.forEach((lineItem) => {
              // Calculate the total discount for the age band
              const totalDiscountForBand =
                discountValue * lineItem.numberOfTravelers;
              totalDiscountApplied += totalDiscountForBand; // Add to total discount applied

              switch (lineItem.ageBand) {
                case "ADULT":
                case "SENIOR":
                case "YOUTH":
                case "CHILD":
                case "INFANT":
                case "TRAVELER":
                  lineItem.subtotalPrice.price.recommendedRetailPrice -=
                    totalDiscountForBand;
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
          localStorage.setItem(
            "totalDiscountApplied",
            totalDiscountApplied.toString()
          ); // Save the total discount applied

          console.log("Total Discount Applied:", totalDiscountApplied);
          //  return; // Exit the function
        } else if (isAdultDiscountType === "false" && discountValue > 0) {
          console.log(discountValue + "CAD");

          let totalDiscountApplied = 0; // Initialize a variable to track the total discount applied

          const see_option2 = JSON.parse(see_option);
          see_option2.bookableItems.forEach((item) => {
            item.lineItems.forEach((lineItem) => {
              // Calculate the total discount for the age band
              const totalDiscountForBand =
                discountValue * lineItem.numberOfTravelers;
              totalDiscountApplied += totalDiscountForBand; // Add to total discount applied

              switch (lineItem.ageBand) {
                case "ADULT":
                case "SENIOR":
                case "YOUTH":
                case "CHILD":
                case "INFANT":
                case "TRAVELER":
                  lineItem.subtotalPrice.price.recommendedRetailPrice -=
                    totalDiscountForBand;
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
          localStorage.setItem("see_option2", see_option2);
          localStorage.setItem(
            "totalDiscountApplied",
            totalDiscountApplied.toString()
          ); // Save the total discount applied

          console.log("Total Discount Applied:", totalDiscountApplied);
          // return; // Exit the function
        } else {
          //No Disocunt
          console.log("no discount");
          console.log(discountValue);
        }

        // Function to create the booking_hold object
        function createBookingHold() {
          const paxMix = getPaxMix();
          const pricingData = getPricingDetails();

          if (!pricingData || !paxMix.length) {
            console.error(
              "Pricing details or pax mix not found in local storage."
            );
            return;
          }

          const lineItems = paxMix.map((pax) => ({
            ageBand: pax.ageBand,
            numberOfTravelers: pax.numberOfTravelers,
            subtotalPrice: {
              price: calculateSubtotalPrice(
                pax.ageBand,
                pax.numberOfTravelers,
                pricingData.bookableItems[0].seasons[0].pricingRecords[0]
                  .pricingDetails
              ),
            },
          }));

          let booking_hold = {
            bookingRef: "TESTING", // Replace with actual booking reference if dynamic
            bookingHoldInfo: {
              availability: {
                status: "HOLD_NOT_PROVIDED",
              },
              pricing: {
                status: "HOLDING",
                validUntil: "2023-12-12T12:11:57.017546Z", // Replace with actual valid until date if dynamic
              },
            },
            currency: pricingData.currency,
            lineItems: lineItems,
            totalPrice: {
              price: {
                recommendedRetailPrice: lineItems.reduce(
                  (total, item) =>
                    total + item.subtotalPrice.price.recommendedRetailPrice,
                  0
                ),
                partnerNetPrice: lineItems.reduce(
                  (total, item) =>
                    total + item.subtotalPrice.price.partnerNetPrice,
                  0
                ),
                bookingFee: 0, // Calculate if applicable
                partnerTotalPrice: 0, // Calculate if applicable
              },
            },
          };

          // Additional calculations for total prices if needed

          return booking_hold;
        }

        // Usage
        let booking_hold = createBookingHold();
        console.log(booking_hold);

        localStorage.setItem("booking_hold", JSON.stringify(booking_hold));
        console.log("Updated local storage");
        location.href = "/app/booking-questions";
      }
    } else {
      console.log(offerSubType);
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
            let totalDiscountApplied = 0; // Initialize a variable to track the total discount applied
            const see_option2 = JSON.parse(see_option);
            see_option2.bookableItems.forEach((item) => {
              item.lineItems.forEach((lineItem) => {
                // Calculate the total discount for the age band
                const totalDiscountForBand =
                  discountValue * lineItem.numberOfTravelers;
                totalDiscountApplied += totalDiscountForBand; // Add to total discount applied

                switch (lineItem.ageBand) {
                  case "ADULT":
                  case "SENIOR":
                  case "YOUTH":
                  case "CHILD":
                  case "INFANT":
                  case "TRAVELER":
                    lineItem.subtotalPrice.price.recommendedRetailPrice -=
                      totalDiscountForBand;
                    lineItem.subtotalPrice.price.recommendedRetailPrice =
                      Math.ceil(
                        lineItem.subtotalPrice.price.recommendedRetailPrice /
                          0.05
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
            localStorage.setItem(
              "totalDiscountApplied",
              totalDiscountApplied.toString()
            ); // Save the total discount applied

            console.log("Total Discount Applied:", totalDiscountApplied);
            //  return; // Exit the function
          } else if (isAdultDiscountType === "false" && discountValue > 0) {
            console.log(discountValue + "CAD");

            let totalDiscountApplied = 0; // Initialize a variable to track the total discount applied

            const see_option2 = JSON.parse(see_option);
            see_option2.bookableItems.forEach((item) => {
              item.lineItems.forEach((lineItem) => {
                // Calculate the total discount for the age band
                const totalDiscountForBand =
                  discountValue * lineItem.numberOfTravelers;
                totalDiscountApplied += totalDiscountForBand; // Add to total discount applied

                switch (lineItem.ageBand) {
                  case "ADULT":
                  case "SENIOR":
                  case "YOUTH":
                  case "CHILD":
                  case "INFANT":
                  case "TRAVELER":
                    lineItem.subtotalPrice.price.recommendedRetailPrice -=
                      totalDiscountForBand;
                    lineItem.subtotalPrice.price.recommendedRetailPrice =
                      Math.ceil(
                        lineItem.subtotalPrice.price.recommendedRetailPrice /
                          0.05
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
            localStorage.setItem(
              "totalDiscountApplied",
              totalDiscountApplied.toString()
            ); // Save the total discount applied

            console.log("Total Discount Applied:", totalDiscountApplied);
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

    // make your AJAX request here, and when you get a response, remove the spinner class:
    setTimeout(function () {
      button.classList.remove("spinner");
    }, 10000);
  }
}
