document.addEventListener("DOMContentLoaded", async function () {
  const { createClient } = supabase;

  const _supabase = createClient(
    "https://impecimchocfsfsdgrvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
  );

  console.log("Supabase Initialized");

  //defining varibales
  const memberDataString = localStorage.getItem("_ms-mem");
  const memberData = JSON.parse(memberDataString);
  const memberID = memberData.id;
  const memberStripeId = memberData.customFields["stripe-customer-id"];
  const memberAirtableId = memberData.customFields["airtable-id"];
  const memberXeroId = memberData.customFields["xero-contact-id"];

  console.log("Member ID:", memberID);
  console.log("Stripe Customer ID:", memberStripeId);
  console.log("Xero Contact ID:", memberXeroId);

  // Function to log the offer type
  function runOfferType(offerType) {
    if (offerType === "[Travel] Wholesale - Viator") {
      console.log("[Travel] Wholesale - Viator Offer");

      localStorage.setItem("offerType", offerType);
      localStorage.setItem("offerSubType", offerSubType);

      if (offerType === "Travel Experiences") {
        // Code to execute if the condition is true
        console.log("The offer type is Viator Wholesale.");

        const priceData = {
          adultPrice: localStorage.getItem("ADULT_Price"),
          seniorPrice: localStorage.getItem("SENIOR_Price"),
          youthPrice: localStorage.getItem("YOUTH_Price"),
          childPrice: localStorage.getItem("CHILD_Price"),
          infantPrice: localStorage.getItem("INFANT_Price"),
          travelerPrice: localStorage.getItem("TRAVELLER_Price"),
        };
        const filteredPriceData = {};
        for (const key in priceData) {
          const value = priceData[key];
          if (value !== null && value !== undefined && value !== "") {
            filteredPriceData[key] = value;
          }
        }

        if (Object.keys(filteredPriceData).length !== 0) {
          localStorage.setItem("priceData", JSON.stringify(filteredPriceData));
          console.log(filteredPriceData);
        }
        const discountData = {
          adultDiscType: localStorage.getItem("ADULT_Disc_Type"),
          seniorDiscType: localStorage.getItem("SENIOR_Disc_Type"),
          youthDiscType: localStorage.getItem("YOUTH_Disc_Type"),
          childDiscType: localStorage.getItem("CHILD_Disc_Type"),
          infantDiscType: localStorage.getItem("INFANT_Disc_Type"),
          travelerDiscType: localStorage.getItem("TRAVELLER_Disc_Type"),
        };
        const filteredDiscountData = {};
        for (const key in discountData) {
          if (discountData[key] !== null && discountData[key] !== undefined) {
            filteredDiscountData[key] = discountData[key];
          }
        }

        if (Object.keys(filteredDiscountData).length > 0) {
          localStorage.setItem(
            "discountData",
            JSON.stringify(filteredDiscountData)
          );
          console.log(filteredDiscountData);
        }
        const discountValue = {
          adultDiscValue: localStorage.getItem("ADULT_Disc_Value"),
          seniorDiscValue: localStorage.getItem("SENIOR_Disc_Value"),
          youthDiscValue: localStorage.getItem("YOUTH_Disc_Value"),
          childDiscValue: localStorage.getItem("CHILD_Disc_Value"),
          infantDiscValue: localStorage.getItem("INFANT_Disc_Value"),
          travelerDiscValue: localStorage.getItem("TRAVELLER_Disc_Value"),
        };

        const filteredDiscountValue = {};
        for (const key in discountValue) {
          if (discountValue[key] !== null && discountValue[key] !== undefined) {
            filteredDiscountValue[key] = discountValue[key];
          }
        }

        if (Object.keys(filteredDiscountValue).length > 0) {
          localStorage.setItem(
            "discountValue",
            JSON.stringify(filteredDiscountValue)
          );
          console.log(filteredDiscountValue);
        }
      } else {
        console.log("Sub Type Not Viator");
      }

      document.addEventListener("DOMContentLoaded", function () {
        if (xeroSupplierId) {
          localStorage.setItem("xeroSupplierId", xeroSupplierId);
        } else {
          console.error("Error: Suplier ID not available");
        }

        if (
          pickup_locations !== "Not Applicable" &&
          pickup_locations !== null &&
          pickup_locations !== ""
        ) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(pickup_locations, "text/html");
          const decodedJsonStr = doc.documentElement.textContent;
          const decodedJson = JSON.parse(decodedJsonStr);
          console.log(decodedJson);
          localStorage.setItem(
            "pickup_locationsObj",
            JSON.stringify(decodedJson)
          );
        } else {
          console.error("NOTE: Pick Up Not Applicable");
        }
      });

      // Get button element
      const getTicketsButtonViator = document.getElementById(
        "button-get_tickets_viator"
      );

      // Add a click event listener to that element

      getTicketsButtonViator.addEventListener(
        "click",
        function (event) {
          event.preventDefault(); // This will now work as expected
          // Your additional logic here

          // Here you can include your if-else logic
          if (offerType === "Travel Experiences") {
            const key = "experienceImage";
            localStorage.setItem(key, experience_image);

            const requestOptions = {
              method: "GET",
              redirect: "follow",
            };

            // Viator Product Call

            fetch(
              `https://hook.us1.make.com/g6t9pxvv5h7hf7a9ftb7qcl975caz54x?product_code=${productCode}`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                localStorage.setItem("booking_questions", result);
                console.log("Updated local storage");
              })
              .catch((error) => console.log("error", error));

            fetch(
              `https://hook.us1.make.com/6to1i7agoi3k956b5pde9flbgzbrms3b/?product_code=${productCode}`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                localStorage.setItem("data", result);

                // Parse the result to a JSON object
                var resultObj = JSON.parse(result);

                // Check if the code is NOT_FOUND
                if (resultObj.code === "NOT_FOUND") {
                  // Set the display of the element with id 'notActive' to flex
                  document.getElementById("notActive").style.display = "flex";

                  // Stop further execution
                  return;
                }

                const storedData = localStorage.getItem("data");
                let data = JSON.parse(storedData);

                const storedDiscountValue =
                  localStorage.getItem("discountValue");
                const discountValue = JSON.parse(storedDiscountValue);

                const ageBands = [
                  "ADULT",
                  "SENIOR",
                  "CHILD",
                  "YOUTH",
                  "INFANT",
                  "TRAVELER",
                ];

                const isAdultDiscountType =
                  localStorage.getItem("ADULT_Disc_Type");

                if (isAdultDiscountType === "true" && discountValue) {
                  ageBands.forEach((ageBand) => {
                    const discountKey = `${ageBand.toLowerCase()}DiscValue`;
                    const discountPercentage = parseFloat(
                      discountValue[discountKey]
                    );

                    if (discountPercentage) {
                      data.bookableItems.forEach((product) => {
                        product.seasons.forEach((season) => {
                          season.pricingRecords.forEach((record) => {
                            record.pricingDetails.forEach((detail) => {
                              if (detail.ageBand === ageBand) {
                                detail.price.original.recommendedRetailPrice -=
                                  (detail.price.original
                                    .recommendedRetailPrice *
                                    discountPercentage) /
                                  100;

                                // Ensure two decimal places for all numbers
                                detail.price.original.recommendedRetailPrice =
                                  parseFloat(
                                    detail.price.original.recommendedRetailPrice.toFixed(
                                      2
                                    )
                                  );
                              }
                            });
                          });
                        });
                      });
                    }
                  });
                } else if (isAdultDiscountType === "false") {
                  // Additional logic for when ADULT_Disc_Type is false
                  ageBands.forEach((ageBand) => {
                    const discountKey = `${ageBand.toLowerCase()}DiscValue`;
                    const discountValueSet = parseFloat(
                      discountValue[discountKey]
                    );

                    if (!isNaN(discountValueSet)) {
                      data.bookableItems.forEach((product) => {
                        product.seasons.forEach((season) => {
                          season.pricingRecords.forEach((record) => {
                            record.pricingDetails.forEach((detail) => {
                              if (detail.ageBand === ageBand) {
                                detail.price.original.recommendedRetailPrice -=
                                  discountValueSet;

                                // Ensure two decimal places for all numbers
                                detail.price.original.recommendedRetailPrice =
                                  parseFloat(
                                    detail.price.original.recommendedRetailPrice.toFixed(
                                      2
                                    )
                                  );
                              }
                            });
                          });
                        });
                      });
                    }
                  });
                }

                localStorage.setItem("data", JSON.stringify(data));

                // Decode the HTML entities before saving to local storage
                const decodedValue = document.createElement("textarea");
                decodedValue.innerHTML = cmsFieldValue;
                const decodedText = decodedValue.value;

                // Save the decoded value to local storage
                localStorage.setItem("name", decodedText);

                console.log("Updated local storage");

                var availButton = document.querySelector(
                  ".button_availability"
                );
                availButton.classList.add("spinner");

                // make your AJAX request here, and when you get a response, remove the spinner class:
                setTimeout(function () {
                  availButton.classList.remove("spinner");
                  window.location.href = "/app/availability-schedule";
                }, 5000);
              })
              .catch((error) => console.log("error", error));
          } else if (
            offerSubType === "[Travel] Direct - Free Sell Activities"
          ) {
            const key = "experienceImage";
            localStorage.setItem(key, experience_image);

            function createDateRange(startDate, endDate) {
              let start = new Date(startDate);
              let end = new Date(endDate);
              let dateRange = [];

              while (start <= end) {
                // This line adds the date in 'YYYY-MM-DD' format to the array
                dateRange.push(start.toISOString().split("T")[0]);
                start.setDate(start.getDate() + 1);
              }

              return dateRange;
            }

            // Usage function
            let startDate = redeemStartDate;
            let endDate = redeemEndDate;
            let range = createDateRange(startDate, endDate);

            console.log(range); // This will log the array of date strings in 'YYYY-MM-DD' format

            const storedDiscountValue = localStorage.getItem("discountValue");
            const discountValue = JSON.parse(storedDiscountValue);

            const ageBands = [
              "ADULT",
              "SENIOR",
              "CHILD",
              "YOUTH",
              "INFANT",
              "TRAVELER",
            ];

            let adultPricingDetail;
            let youthPricingDetail;
            let infantPricingDetail;
            let childPricingDetail;
            let seniorPricingDetail;
            let travelerPricingDetail;

            if (typeof ADULT_recommendedRetailPrice !== "undefined") {
              console.log("Adult RRP", ADULT_recommendedRetailPrice);

              adultPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 1,
                ageBand: "ADULT",
                price: {
                  original: {
                    recommendedRetailPrice: ADULT_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                    partnerNetPrice: 0.0,
                    bookingFee: 0.0,
                    partnerTotalPrice: 0.0,
                  },
                },
              };
            }

            if (typeof SENIOR_recommendedRetailPrice !== "undefined") {
              console.log("Senior RRP", SENIOR_recommendedRetailPrice);
              seniorPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "SENIOR",
                price: {
                  original: {
                    recommendedRetailPrice: SENIOR_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                    partnerNetPrice: 0.0,
                    bookingFee: 0.0,
                    partnerTotalPrice: 0.0,
                  },
                },
              };
            }

            if (typeof CHILD_recommendedRetailPrice !== "undefined") {
              console.log("Child RRP", CHILD_recommendedRetailPrice);
              childPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "CHILD",
                price: {
                  original: {
                    recommendedRetailPrice: CHILD_recommendedRetailPrice, // Define or calculate the child price
                    partnerNetPrice: 0.0, // Adjust as needed
                    bookingFee: 0.0, // Adjust as needed
                    partnerTotalPrice: 0.0, // Adjust as needed
                  },
                },
              };
            }

            if (typeof YOUTH_recommendedRetailPrice !== "undefined") {
              console.log("Youth RRP", YOUTH_recommendedRetailPrice);
              youthPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "YOUTH",
                price: {
                  original: {
                    recommendedRetailPrice: YOUTH_recommendedRetailPrice, // Define or calculate the child price
                    partnerNetPrice: 0.0, // Adjust as needed
                    bookingFee: 0.0, // Adjust as needed
                    partnerTotalPrice: 0.0, // Adjust as needed
                  },
                },
              };
            }

            if (typeof INFANT_recommendedRetailPrice !== "undefined") {
              infantPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "INFANT",
                price: {
                  original: {
                    recommendedRetailPrice: INFANT_recommendedRetailPrice, // Define or calculate the child price
                    partnerNetPrice: 0.0, // Adjust as needed
                    bookingFee: 0.0, // Adjust as needed
                    partnerTotalPrice: 0.0, // Adjust as needed
                  },
                },
              };

              if (
                typeof TRAVELER_recommendedRetailPrice !== "undefined" ||
                TRAVELER_recommendedRetailPrice
              ) {
                travelerPricingDetail = {
                  pricingPackageType: "PER_PERSON",
                  minTravelers: 0,
                  ageBand: "TRAVELER",
                  price: {
                    original: {
                      recommendedRetailPrice: TRAVELER_recommendedRetailPrice, // Define or calculate the child price
                      partnerNetPrice: 0.0, // Adjust as needed
                      bookingFee: 0.0, // Adjust as needed
                      partnerTotalPrice: 0.0, // Adjust as needed
                    },
                  },
                };
              }
            }
            const pricingRecord = {
              daysOfWeek: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
              ],
              pricingDetails: [
                adultPricingDetail,
                childPricingDetail,
                seniorPricingDetail,
                infantPricingDetail,
                travelerPricingDetail,
                youthPricingDetail,
              ].filter((detail) => detail !== undefined),
            };

            // Define pricingRecords here
            const pricingRecords = [pricingRecord]; // This is an array of pricingRecord objects
            let unavailableDates = [];
            const seasons = [
              {
                startDate: startDate,
                endDate: endDate,
                pricingRecords:
                  pricingRecords.length > 0 ? pricingRecords : [pricingRecord],
                unavailableDates:
                  unavailableDates.length > 0
                    ? unavailableDates
                    : [unavailableDates],
              },
            ];
            let operatingHours = [];

            // Constructing the bookableItems object
            const bookableItems = [
              {
                seasons: seasons,
                operatingHours: operatingHours,
              },
            ];

            // Constructing the object
            const dataObject = {
              productCode: productCode,
              bookableItems: bookableItems,
              currency: currency,
              summary: summary,
            };
            let data = dataObject;
            console.log(dataObject);

            const isAdultDiscountType = localStorage.getItem("ADULT_Disc_Type");

            if (isAdultDiscountType === "true" && discountValue) {
              ageBands.forEach((ageBand) => {
                const discountKey = `${ageBand.toLowerCase()}DiscValue`;
                const discountPercentage = parseFloat(
                  discountValue[discountKey]
                );

                if (discountPercentage) {
                  data.bookableItems.forEach((product) => {
                    product.seasons.forEach((season) => {
                      season.pricingRecords.forEach((record) => {
                        record.pricingDetails.forEach((detail) => {
                          if (detail.ageBand === ageBand) {
                            detail.price.original.recommendedRetailPrice -=
                              (detail.price.original.recommendedRetailPrice *
                                discountPercentage) /
                              100;

                            // Ensure two decimal places for all numbers
                            detail.price.original.recommendedRetailPrice =
                              parseFloat(
                                detail.price.original.recommendedRetailPrice.toFixed(
                                  2
                                )
                              );
                          }
                        });
                      });
                    });
                  });
                }
              });
            } else if (isAdultDiscountType === "false") {
              // Additional logic for when ADULT_Disc_Type is false
              ageBands.forEach((ageBand) => {
                const discountKey = `${ageBand.toLowerCase()}DiscValue`;
                const discountValueSet = parseFloat(discountValue[discountKey]);

                if (!isNaN(discountValueSet)) {
                  data.bookableItems.forEach((product) => {
                    product.seasons.forEach((season) => {
                      season.pricingRecords.forEach((record) => {
                        record.pricingDetails.forEach((detail) => {
                          if (detail.ageBand === ageBand) {
                            detail.price.original.recommendedRetailPrice -=
                              discountValueSet;

                            // Ensure two decimal places for all numbers
                            detail.price.original.recommendedRetailPrice =
                              parseFloat(
                                detail.price.original.recommendedRetailPrice.toFixed(
                                  2
                                )
                              );
                          }
                        });
                      });
                    });
                  });
                }
              });
            }

            localStorage.setItem("data", JSON.stringify(data));

            // Decode the HTML entities before saving to local storage
            const decodedValue = document.createElement("textarea");
            decodedValue.innerHTML = cmsFieldValue;
            const decodedText = decodedValue.value;

            // Save the decoded value to local storage
            localStorage.setItem("name", decodedText);

            console.log("Updated local storage");

            var availButton = document.querySelector(".button_availability");
            availButton.classList.add("spinner");

            // make your AJAX request here, and when you get a response, remove the spinner class:
            setTimeout(function () {
              availButton.classList.remove("spinner");

              if (offerSubType === "[Travel] Direct - Free Sell Activities") {
                window.location.href = "/app/select-tickets";
              } else {
                window.location.href = "/app/availability-schedule";
              }
            }, 5000);
          } else {
            console.log("No Sub Offer Type");
          }
        },
        { passive: false }
      );
    } else if (offerType === "[Travel] Wholesale - LIVN") {
      console.log("[Travel] Wholesale - LIVN Offer");
    } else if (offerType === "[Travel] Direct - Free Sell Activities") {
      console.log("[Travel] Direct - Free Sell Activities Offer");

      const offerInfoElement = document.getElementById("offer-info");

      offerInfoElement.style.display = "block";

      localStorage.setItem("offerType", offerType);
      localStorage.setItem("supplierType", supplierType);
      localStorage.setItem("bookCalendar", bookCalendar);
      console.log("Book With Calendar", bookCalendar);
      console.log("Currency", currency);

      // Split the string into an array of date strings, taking care to trim whitespace
      let dateArray = unavailableDatesRaw.split(",").map((date) => date.trim());

      // Map over the array to create an array of objects
      let unavailableDates = dateArray.map((date) => ({
        date: date,
        reason: "SOLD_OUT",
      }));

      console.log(unavailableDates);

      if (
        offerType === "[Travel] Direct - Free Sell Activities" &&
        bookCalendar === "false"
      ) {
        // Code to execute if the condition is true
        console.log("The offer type is a Direct Contract.");

        //const bookCalendar =

        const priceData = {
          adultPrice: localStorage.getItem("ADULT_Price"),
          seniorPrice: localStorage.getItem("SENIOR_Price"),
          youthPrice: localStorage.getItem("YOUTH_Price"),
          childPrice: localStorage.getItem("CHILD_Price"),
          infantPrice: localStorage.getItem("INFANT_Price"),
          travelerPrice: localStorage.getItem("TRAVELLER_Price"),
        };
        const filteredPriceData = {};
        for (const key in priceData) {
          const value = priceData[key];
          if (value !== null && value !== undefined && value !== "") {
            filteredPriceData[key] = value;
          }
        }

        if (Object.keys(filteredPriceData).length !== 0) {
          localStorage.setItem("priceData", JSON.stringify(filteredPriceData));
          console.log(filteredPriceData);
        }
        const discountData = {
          adultDiscType: localStorage.getItem("ADULT_Disc_Type"),
          seniorDiscType: localStorage.getItem("SENIOR_Disc_Type"),
          youthDiscType: localStorage.getItem("YOUTH_Disc_Type"),
          childDiscType: localStorage.getItem("CHILD_Disc_Type"),
          infantDiscType: localStorage.getItem("INFANT_Disc_Type"),
          travelerDiscType: localStorage.getItem("TRAVELLER_Disc_Type"),
        };
        const filteredDiscountData = {};
        for (const key in discountData) {
          if (discountData[key] !== null && discountData[key] !== undefined) {
            filteredDiscountData[key] = discountData[key];
          }
        }

        if (Object.keys(filteredDiscountData).length > 0) {
          localStorage.setItem(
            "discountData",
            JSON.stringify(filteredDiscountData)
          );
          console.log(filteredDiscountData);
        }
        const discountValue = {
          adultDiscValue: localStorage.getItem("ADULT_Disc_Value"),
          seniorDiscValue: localStorage.getItem("SENIOR_Disc_Value"),
          youthDiscValue: localStorage.getItem("YOUTH_Disc_Value"),
          childDiscValue: localStorage.getItem("CHILD_Disc_Value"),
          infantDiscValue: localStorage.getItem("INFANT_Disc_Value"),
          travelerDiscValue: localStorage.getItem("TRAVELLER_Disc_Value"),
        };

        const filteredDiscountValue = {};
        for (const key in discountValue) {
          if (discountValue[key] !== null && discountValue[key] !== undefined) {
            filteredDiscountValue[key] = discountValue[key];
          }
        }

        if (Object.keys(filteredDiscountValue).length > 0) {
          localStorage.setItem(
            "discountValue",
            JSON.stringify(filteredDiscountValue)
          );
          console.log(filteredDiscountValue);
        }
        //Create the Booking Questions Variable
        let booking_questions = {
          status: "ACTIVE",

          bookingRequirements: {
            minTravelersPerBooking: 1,
            maxTravelersPerBooking: 10,
            requiresAdultForBooking: false,
          },

          bookingQuestions: [
            "AGEBAND",
            "FULL_NAMES_FIRST",
            "FULL_NAMES_LAST",
            // "SPECIAL_REQUIREMENTS",
          ],

          pricingInfo: {
            type: "PER_PERSON",
            ageBands: [
              {
                ageBand: "CHILD",
                startAge: 5,
                endAge: 12,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("CHILD_description"),
              },
              {
                ageBand: "YOUTH",
                startAge: 13,
                endAge: 18,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("YOUTH_description"),
              },
              {
                ageBand: "ADULT",
                startAge: 19,
                endAge: 64,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("ADULT_description"),
              },
              {
                ageBand: "SENIOR",
                startAge: 65,
                endAge: 99,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("SENIOR_description"),
              },
              {
                ageBand: "INFANT",
                startAge: 5,
                endAge: 12,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("INFANT_description"),
              },
            ],
          },
        };

        // Save booking_questions to localStorage
        localStorage.setItem(
          "booking_questions",
          JSON.stringify(booking_questions)
        );
      } else if (
        offerType === "[Travel] Direct - Free Sell Activities" &&
        bookCalendar === "true"
      ) {
        // Code to execute if the condition is true
        console.log("The offer type is a Direct Contract.");

        const priceData = {
          adultPrice: localStorage.getItem("ADULT_Price"),
          seniorPrice: localStorage.getItem("SENIOR_Price"),
          youthPrice: localStorage.getItem("YOUTH_Price"),
          childPrice: localStorage.getItem("CHILD_Price"),
          infantPrice: localStorage.getItem("INFANT_Price"),
          travelerPrice: localStorage.getItem("TRAVELLER_Price"),
        };
        const filteredPriceData = {};
        for (const key in priceData) {
          const value = priceData[key];
          if (value !== null && value !== undefined && value !== "") {
            filteredPriceData[key] = value;
          }
        }

        if (Object.keys(filteredPriceData).length !== 0) {
          localStorage.setItem("priceData", JSON.stringify(filteredPriceData));
          console.log(filteredPriceData);
        }
        const discountData = {
          adultDiscType: localStorage.getItem("ADULT_Disc_Type"),
          seniorDiscType: localStorage.getItem("SENIOR_Disc_Type"),
          youthDiscType: localStorage.getItem("YOUTH_Disc_Type"),
          childDiscType: localStorage.getItem("CHILD_Disc_Type"),
          infantDiscType: localStorage.getItem("INFANT_Disc_Type"),
          travelerDiscType: localStorage.getItem("TRAVELLER_Disc_Type"),
        };
        const filteredDiscountData = {};
        for (const key in discountData) {
          if (discountData[key] !== null && discountData[key] !== undefined) {
            filteredDiscountData[key] = discountData[key];
          }
        }

        if (Object.keys(filteredDiscountData).length > 0) {
          localStorage.setItem(
            "discountData",
            JSON.stringify(filteredDiscountData)
          );
          console.log(filteredDiscountData);
        }
        const discountValue = {
          adultDiscValue: localStorage.getItem("ADULT_Disc_Value"),
          seniorDiscValue: localStorage.getItem("SENIOR_Disc_Value"),
          youthDiscValue: localStorage.getItem("YOUTH_Disc_Value"),
          childDiscValue: localStorage.getItem("CHILD_Disc_Value"),
          infantDiscValue: localStorage.getItem("INFANT_Disc_Value"),
          travelerDiscValue: localStorage.getItem("TRAVELLER_Disc_Value"),
        };

        const filteredDiscountValue = {};
        for (const key in discountValue) {
          if (discountValue[key] !== null && discountValue[key] !== undefined) {
            filteredDiscountValue[key] = discountValue[key];
          }
        }

        if (Object.keys(filteredDiscountValue).length > 0) {
          localStorage.setItem(
            "discountValue",
            JSON.stringify(filteredDiscountValue)
          );
          console.log(filteredDiscountValue);
        }
        //Create the Booking Questions Variable
        let booking_questions = {
          status: "ACTIVE",

          bookingRequirements: {
            minTravelersPerBooking: 1,
            maxTravelersPerBooking: 10,
            requiresAdultForBooking: false,
          },

          bookingQuestions: [
            "AGEBAND",
            "FULL_NAMES_FIRST",
            "FULL_NAMES_LAST",
            //  "SPECIAL_REQUIREMENTS",
          ],

          pricingInfo: {
            type: "PER_PERSON",
            ageBands: [
              {
                ageBand: "CHILD",
                startAge: 5,
                endAge: 12,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("CHILD_description"),
              },
              {
                ageBand: "YOUTH",
                startAge: 13,
                endAge: 18,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("YOUTH_description"),
              },
              {
                ageBand: "ADULT",
                startAge: 19,
                endAge: 64,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("ADULT_description"),
              },
              {
                ageBand: "SENIOR",
                startAge: 65,
                endAge: 99,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("SENIOR_description"),
              },
              {
                ageBand: "INFANT",
                startAge: 5,
                endAge: 12,
                minTravelersPerBooking: 0,
                maxTravelersPerBooking: 9,
                description: localStorage.getItem("INFANT_description"),
              },
            ],
          },
        };

        // Save booking_questions to localStorage
        localStorage.setItem(
          "booking_questions",
          JSON.stringify(booking_questions)
        );
      } else {
        console.log("Sub Type Not Direct");
      }

      document.addEventListener("DOMContentLoaded", function () {
        if (xeroSupplierId) {
          localStorage.setItem("xeroSupplierId", xeroSupplierId);
        } else {
          console.error("Error: Suplier ID not available");
        }

        if (
          pickup_locations !== "Not Applicable" &&
          pickup_locations !== null &&
          pickup_locations !== ""
        ) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(pickup_locations, "text/html");
          const decodedJsonStr = doc.documentElement.textContent;
          const decodedJson = JSON.parse(decodedJsonStr);
          console.log(decodedJson);
          localStorage.setItem(
            "pickup_locationsObj",
            JSON.stringify(decodedJson)
          );
        } else {
          console.error("NOTE: Pick Up Not Applicable");
        }
      });

      const getTicketsButtonDirect = document.getElementById(
        "button-get_tickets_direct"
      );

      // Add a click event listener to that element
      getTicketsButtonDirect.addEventListener("click", function () {
        const button = this;
        button.classList.add("spinner");

        // make your AJAX request here, and when you get a response, remove the spinner class:
        setTimeout(() => {
          button.classList.remove("spinner");
        }, 10000);

        // Here you can include your if-else logic
        if (
          offerType === "[Travel] Direct - Free Sell Activities" &&
          bookCalendar === "false"
        ) {
          const key = "experienceImage";
          localStorage.setItem(key, experience_image);

          function createDateRange(startDate, endDate) {
            let start = new Date(startDate);
            let end = new Date(endDate);
            let dateRange = [];

            while (start <= end) {
              // This line adds the date in 'YYYY-MM-DD' format to the array
              dateRange.push(start.toISOString().split("T")[0]);
              start.setDate(start.getDate() + 1);
            }

            return dateRange;
          }

          // Usage function
          let startDate = redeemStartDate;
          let endDate = redeemEndDate;
          let range = createDateRange(startDate, endDate);

          console.log(range); // This will log the array of date strings in 'YYYY-MM-DD' format

          const storedDiscountValue = localStorage.getItem("discountValue");
          const discountValue = JSON.parse(storedDiscountValue);

          const ageBands = [
            "ADULT",
            "SENIOR",
            "CHILD",
            "YOUTH",
            "INFANT",
            "TRAVELER",
          ];

          let adultPricingDetail;
          let youthPricingDetail;
          let infantPricingDetail;
          let childPricingDetail;
          let seniorPricingDetail;
          let travelerPricingDetail;

          if (typeof ADULT_recommendedRetailPrice !== "undefined") {
            console.log("Adult RRP", ADULT_recommendedRetailPrice);

            adultPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 1,
              ageBand: "ADULT",
              price: {
                original: {
                  recommendedRetailPrice: ADULT_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                  partnerNetPrice: 0.0,
                  bookingFee: 0.0,
                  partnerTotalPrice: 0.0,
                },
              },
            };
          }

          if (typeof SENIOR_recommendedRetailPrice !== "undefined") {
            console.log("Senior RRP", SENIOR_recommendedRetailPrice);
            seniorPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "SENIOR",
              price: {
                original: {
                  recommendedRetailPrice: SENIOR_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                  partnerNetPrice: 0.0,
                  bookingFee: 0.0,
                  partnerTotalPrice: 0.0,
                },
              },
            };
          }

          if (typeof CHILD_recommendedRetailPrice !== "undefined") {
            console.log("Child RRP", CHILD_recommendedRetailPrice);
            childPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "CHILD",
              price: {
                original: {
                  recommendedRetailPrice: CHILD_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };
          }

          if (typeof YOUTH_recommendedRetailPrice !== "undefined") {
            console.log("Youth RRP", YOUTH_recommendedRetailPrice);
            youthPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "YOUTH",
              price: {
                original: {
                  recommendedRetailPrice: YOUTH_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };
          }

          if (typeof INFANT_recommendedRetailPrice !== "undefined") {
            infantPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "INFANT",
              price: {
                original: {
                  recommendedRetailPrice: INFANT_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };

            if (
              typeof TRAVELER_recommendedRetailPrice !== "undefined" ||
              TRAVELER_recommendedRetailPrice
            ) {
              travelerPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "TRAVELER",
                price: {
                  original: {
                    recommendedRetailPrice: TRAVELER_recommendedRetailPrice, // Define or calculate the child price
                    partnerNetPrice: 0.0, // Adjust as needed
                    bookingFee: 0.0, // Adjust as needed
                    partnerTotalPrice: 0.0, // Adjust as needed
                  },
                },
              };
            }
          }

          function convertToDaysOfWeek(dayOfWeekDirect) {
            const daysOfWeekMap = [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ];

            // Convert to array of days based on the input
            const daysOfWeek = dayOfWeekDirect
              .split(",")
              .map((value, index) => {
                if (value === "true") {
                  return daysOfWeekMap[index];
                }
              })
              .filter(Boolean); // This removes any undefined values from the array

            // Convert array to a string to store in localStorage
            const daysOfWeekString = JSON.stringify(daysOfWeek);

            // Save to localStorage
            localStorage.setItem("daysOfWeek", daysOfWeekString);

            return daysOfWeek;
          }

          // Example usage:
          const daysOfWeek = convertToDaysOfWeek(daysOfWeekDirect);
          console.log(daysOfWeek);

          const pricingRecord = {
            daysOfWeek,
            pricingDetails: [
              adultPricingDetail,
              childPricingDetail,
              seniorPricingDetail,
              infantPricingDetail,
              travelerPricingDetail,
              youthPricingDetail,
            ].filter((detail) => detail !== undefined),
            unavailableDates: unavailableDates,
          };

          // Define pricingRecords here
          const pricingRecords = [pricingRecord]; // This is an array of pricingRecord objects

          const seasons = [
            {
              startDate: startDate,
              endDate: endDate,
              pricingRecords:
                pricingRecords.length > 0 ? pricingRecords : [pricingRecord],
            },
          ];
          let operatingHours = [];

          // Constructing the bookableItems object
          const bookableItems = [
            {
              productCode: productCode,
              seasons: seasons,
              operatingHours: operatingHours,
            },
          ];

          // Constructing the object
          const dataObject = {
            productCode: productCode,
            bookableItems: bookableItems,
            currency: currency,
            summary: summary,
          };
          let data = dataObject;
          console.log(dataObject);

          const isAdultDiscountType = localStorage.getItem("ADULT_Disc_Type");

          if (isAdultDiscountType === "true" && discountValue) {
            ageBands.forEach((ageBand) => {
              const discountKey = `${ageBand.toLowerCase()}DiscValue`;
              const discountPercentage = parseFloat(discountValue[discountKey]);

              if (discountPercentage) {
                data.bookableItems.forEach((product) => {
                  product.seasons.forEach((season) => {
                    season.pricingRecords.forEach((record) => {
                      record.pricingDetails.forEach((detail) => {
                        if (detail.ageBand === ageBand) {
                          detail.price.original.recommendedRetailPrice -=
                            (detail.price.original.recommendedRetailPrice *
                              discountPercentage) /
                            100;

                          // Ensure two decimal places for all numbers
                          detail.price.original.recommendedRetailPrice =
                            parseFloat(
                              detail.price.original.recommendedRetailPrice.toFixed(
                                2
                              )
                            );
                        }
                      });
                    });
                  });
                });
              }
            });
          } else if (isAdultDiscountType === "false") {
            // Additional logic for when ADULT_Disc_Type is false
            ageBands.forEach((ageBand) => {
              const discountKey = `${ageBand.toLowerCase()}DiscValue`;
              const discountValueSet = parseFloat(discountValue[discountKey]);

              if (!isNaN(discountValueSet)) {
                data.bookableItems.forEach((product) => {
                  product.seasons.forEach((season) => {
                    season.pricingRecords.forEach((record) => {
                      record.pricingDetails.forEach((detail) => {
                        if (detail.ageBand === ageBand) {
                          detail.price.original.recommendedRetailPrice -=
                            discountValueSet;

                          // Ensure two decimal places for all numbers
                          detail.price.original.recommendedRetailPrice =
                            parseFloat(
                              detail.price.original.recommendedRetailPrice.toFixed(
                                2
                              )
                            );
                        }
                      });
                    });
                  });
                });
              }
            });
          }

          localStorage.setItem("data", JSON.stringify(data));

          // Decode the HTML entities before saving to local storage
          const decodedValue = document.createElement("textarea");
          decodedValue.innerHTML = cmsFieldValue;
          const decodedText = decodedValue.value;

          // Save the decoded value to local storage
          localStorage.setItem("name", decodedText);

          console.log("Updated local storage");

          var availButton = document.querySelector(".button_availability");
          availButton.classList.add("spinner");

          // make your AJAX request here, and when you get a response, remove the spinner class:
          setTimeout(function () {
            availButton.classList.remove("spinner");

            if (offerType === "[Travel] Direct - Free Sell Activities") {
              window.location.href = "/app/select-tickets";
            } else {
              window.location.href = "/app/availability-schedule";
            }
          }, 5000);
        } else if (
          offerType === "[Travel] Direct - Free Sell Activities" &&
          bookCalendar === "true"
        ) {
          console.log("Book With Cal");
          const key = "experienceImage";
          localStorage.setItem(key, experience_image);

          function createDateRange(startDate, endDate) {
            let start = new Date(startDate);
            let end = new Date(endDate);
            let dateRange = [];

            while (start <= end) {
              // This line adds the date in 'YYYY-MM-DD' format to the array
              dateRange.push(start.toISOString().split("T")[0]);
              start.setDate(start.getDate() + 1);
            }

            return dateRange;
          }

          // Usage function
          let startDate = redeemStartDate;
          let endDate = redeemEndDate;
          let range = createDateRange(startDate, endDate);

          console.log(range); // This will log the array of date strings in 'YYYY-MM-DD' format

          const storedDiscountValue = localStorage.getItem("discountValue");
          const discountValue = JSON.parse(storedDiscountValue);

          const ageBands = [
            "ADULT",
            "SENIOR",
            "CHILD",
            "YOUTH",
            "INFANT",
            "TRAVELER",
          ];

          let adultPricingDetail;
          let youthPricingDetail;
          let infantPricingDetail;
          let childPricingDetail;
          let seniorPricingDetail;
          let travelerPricingDetail;

          if (typeof ADULT_recommendedRetailPrice !== "undefined") {
            console.log("Adult RRP", ADULT_recommendedRetailPrice);

            adultPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 1,
              ageBand: "ADULT",
              price: {
                original: {
                  recommendedRetailPrice: ADULT_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                  partnerNetPrice: 0.0,
                  bookingFee: 0.0,
                  partnerTotalPrice: 0.0,
                },
              },
            };
          }

          if (typeof SENIOR_recommendedRetailPrice !== "undefined") {
            console.log("Senior RRP", SENIOR_recommendedRetailPrice);
            seniorPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "SENIOR",
              price: {
                original: {
                  recommendedRetailPrice: SENIOR_recommendedRetailPrice, // Assuming this is a variable defined elsewhere
                  partnerNetPrice: 0.0,
                  bookingFee: 0.0,
                  partnerTotalPrice: 0.0,
                },
              },
            };
          }

          if (typeof CHILD_recommendedRetailPrice !== "undefined") {
            console.log("Child RRP", CHILD_recommendedRetailPrice);
            childPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "CHILD",
              price: {
                original: {
                  recommendedRetailPrice: CHILD_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };
          }

          if (typeof YOUTH_recommendedRetailPrice !== "undefined") {
            console.log("Youth RRP", YOUTH_recommendedRetailPrice);
            youthPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "YOUTH",
              price: {
                original: {
                  recommendedRetailPrice: YOUTH_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };
          }

          if (typeof INFANT_recommendedRetailPrice !== "undefined") {
            infantPricingDetail = {
              pricingPackageType: "PER_PERSON",
              minTravelers: 0,
              ageBand: "INFANT",
              price: {
                original: {
                  recommendedRetailPrice: INFANT_recommendedRetailPrice, // Define or calculate the child price
                  partnerNetPrice: 0.0, // Adjust as needed
                  bookingFee: 0.0, // Adjust as needed
                  partnerTotalPrice: 0.0, // Adjust as needed
                },
              },
            };

            if (
              typeof TRAVELER_recommendedRetailPrice !== "undefined" ||
              TRAVELER_recommendedRetailPrice
            ) {
              travelerPricingDetail = {
                pricingPackageType: "PER_PERSON",
                minTravelers: 0,
                ageBand: "TRAVELER",
                price: {
                  original: {
                    recommendedRetailPrice: TRAVELER_recommendedRetailPrice, // Define or calculate the child price
                    partnerNetPrice: 0.0, // Adjust as needed
                    bookingFee: 0.0, // Adjust as needed
                    partnerTotalPrice: 0.0, // Adjust as needed
                  },
                },
              };
            }
          }

          function convertToDaysOfWeek(dayOfWeekDirect) {
            const daysOfWeekMap = [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ];

            // Convert to array of days based on the input
            const daysOfWeek = dayOfWeekDirect
              .split(",")
              .map((value, index) => {
                if (value === "true") {
                  return daysOfWeekMap[index];
                }
              })
              .filter(Boolean); // This removes any undefined values from the array

            // Convert array to a string to store in localStorage
            const daysOfWeekString = JSON.stringify(daysOfWeek);

            // Save to localStorage
            localStorage.setItem("daysOfWeek", daysOfWeekString);

            return daysOfWeek;
          }

          const daysOfWeek = convertToDaysOfWeek(daysOfWeekDirect);
          console.log(daysOfWeek);

          const pricingRecord = {
            daysOfWeek,
            pricingDetails: [
              adultPricingDetail,
              childPricingDetail,
              seniorPricingDetail,
              infantPricingDetail,
              travelerPricingDetail,
              youthPricingDetail,
            ].filter((detail) => detail !== undefined),
            unavailableDates: unavailableDates,
          };

          // Define pricingRecords here
          const pricingRecords = [pricingRecord]; // This is an array of pricingRecord objects

          const seasons = [
            {
              startDate: startDate,
              endDate: endDate,
              pricingRecords:
                pricingRecords.length > 0 ? pricingRecords : [pricingRecord],
            },
          ];
          let operatingHours = [];

          // Constructing the bookableItems object
          const bookableItems = [
            {
              productOptionCode: "No Product Option Codes",
              seasons: seasons,
              operatingHours: operatingHours,
            },
          ];

          // Constructing the object
          const dataObject = {
            productCode: productCode,
            bookableItems: bookableItems,
            currency: currency,
            summary: summary,
          };
          let data = dataObject;
          console.log(dataObject);

          const isAdultDiscountType = localStorage.getItem("ADULT_Disc_Type");

          if (isAdultDiscountType === "true" && discountValue) {
            ageBands.forEach((ageBand) => {
              const discountKey = `${ageBand.toLowerCase()}DiscValue`;
              const discountPercentage = parseFloat(discountValue[discountKey]);

              if (discountPercentage) {
                data.bookableItems.forEach((product) => {
                  product.seasons.forEach((season) => {
                    season.pricingRecords.forEach((record) => {
                      record.pricingDetails.forEach((detail) => {
                        if (detail.ageBand === ageBand) {
                          detail.price.original.recommendedRetailPrice -=
                            (detail.price.original.recommendedRetailPrice *
                              discountPercentage) /
                            100;

                          // Ensure two decimal places for all numbers
                          detail.price.original.recommendedRetailPrice =
                            parseFloat(
                              detail.price.original.recommendedRetailPrice.toFixed(
                                2
                              )
                            );
                        }
                      });
                    });
                  });
                });
              }
            });
          } else if (isAdultDiscountType === "false") {
            // Additional logic for when ADULT_Disc_Type is false
            ageBands.forEach((ageBand) => {
              const discountKey = `${ageBand.toLowerCase()}DiscValue`;
              const discountValueSet = parseFloat(discountValue[discountKey]);

              if (!isNaN(discountValueSet)) {
                data.bookableItems.forEach((product) => {
                  product.seasons.forEach((season) => {
                    season.pricingRecords.forEach((record) => {
                      record.pricingDetails.forEach((detail) => {
                        if (detail.ageBand === ageBand) {
                          detail.price.original.recommendedRetailPrice -=
                            discountValueSet;

                          // Ensure two decimal places for all numbers
                          detail.price.original.recommendedRetailPrice =
                            parseFloat(
                              detail.price.original.recommendedRetailPrice.toFixed(
                                2
                              )
                            );
                        }
                      });
                    });
                  });
                });
              }
            });
          }

          localStorage.setItem("data", JSON.stringify(data));

          // Decode the HTML entities before saving to local storage
          const decodedValue = document.createElement("textarea");
          decodedValue.innerHTML = cmsFieldValue;
          const decodedText = decodedValue.value;

          // Save the decoded value to local storage
          localStorage.setItem("name", decodedText);

          console.log("Updated local storage");

          var availButton = document.querySelector(".button_availability");
          availButton.classList.add("spinner");

          // make your AJAX request here, and when you get a response, remove the spinner class:
          setTimeout(function () {
            availButton.classList.remove("spinner");

            if (
              offerType === "[Travel] Direct - Free Sell Activities" &&
              bookCalendar === "true"
            ) {
              window.location.href = "/app/availability-schedule-direct-sale";
            } else {
              console.log("ERROR");
            }
          }, 5000);
        } else {
          console.log("No Sub Offer Type");
        }
      });

      const loadingSpinnerElement = document.getElementById("loading-spinner");

      loadingSpinnerElement.style.display = "none";
    } else if (offerType === "[Travel] Direct - Scan QR Code") {
      console.log("[Travel] Direct - Scan QR Code Offer");
    } else if (offerType === "[Travel] Direct - Referral URL") {
      console.log("[Travel] Direct - Referral URL Offer");
    } else if (offerType === "[Travel] Direct -  LIVN Direct") {
      console.log("[Travel] Direct -  LIVN Direct Offer");
    } else if (
      offerType === "[F&B] Direct - Referral URL" ||
      offerType === "[F&B] Direct - Prepaid Voucher"
    ) {
      console.log(offerType);

      async function getOfferInfo(experienceName) {
        const offerInfoElement = document.getElementById("offer-info");
        const loadingSpinnerElement =
          document.getElementById("loading-spinner");

        // Hide offer info and show loading spinner
        if (loadingSpinnerElement) {
          loadingSpinnerElement.style.display = "block";
        }

        try {
          // Make a call to Supabase to get booking info
          const { data, error } = await _supabase
            .from("Offers")
            .select("*")
            .eq("offer_name", experienceName);

          console.log("Offer data from Supabase:", data);

          // Check for errors
          if (error) {
            throw error;
          }

          // Check if data exists
          if (data && data.length > 0) {
            const offer = data[0];

            ///Offer Type Prepaid Voucher///
            if (offer.offer_type === "[F&B] Direct - Prepaid Voucher") {
              // Set Experience Name
              const titleElement = document.getElementById("offer-title");
              if (titleElement) {
                titleElement.textContent = `${offer.offer_name}`;
              } else {
                console.error("title element not found");
              }

              // Set Suppplier Name
              const supplierElement = document.getElementById("offer-supplier");
              if (supplierElement) {
                supplierElement.textContent = supplierName;
              } else {
                console.error("supplier element not found");
              }

              // Set Image
              if (offer.image_featured) {
                const imageUrl = `https://app.cityrewards.io/storage/v1/object/public/${offer.image_featured}?width=500&height=600`;

                const imgElement = document.getElementById(
                  "offer-image-prepaid"
                );
                if (imgElement) {
                  imgElement.src = imageUrl;
                } else {
                  console.error("Image element not found");
                }
              } else {
                console.error("No image_featured field found");
              }

              // Calculate the savings based on the discount type
              let savings;
              if (offer.discount_type === "$") {
                savings = offer.discount_amount;
              } else if (offer.discount_type === "%") {
                savings = (offer.discount_amount / 100) * offer.from_price;
              } else {
                savings = 0; // Default to 0 if discount type is unknown
              }

              const discountPrice = offer.from_price - savings;

              console.log(discountPrice);
              // Set discount
              const discountElement = document.getElementById(
                "offer-price-discount-prepaid"
              );
              if (discountElement) {
                discountElement.textContent = `Get ${offer.discount_amount}${offer.discount_type} Off`;
              } else {
                console.error("Discount element not found");
              }

              // Set price
              const priceElement =
                document.getElementById("fb-offer-fromPrice");
              if (priceElement) {
                if (offer.from_price !== undefined) {
                  priceElement.textContent = `$${offer.from_price.toFixed(2)}`;
                } else {
                  console.error("from_price is undefined in the offer object");
                }
              } else {
                console.error("Price element not found");
              }

              // Set disocunted price
              const priceDiscElement = document.getElementById(
                "fb-offer-price-discounted"
              );
              if (priceDiscElement) {
                if (offer.from_price !== undefined) {
                  priceDiscElement.textContent = `$${discountPrice.toFixed(2)}`;
                } else {
                  console.error("savings is undefined in the offer object");
                }
              } else {
                console.error("Discount element not found");
              }

              // Set savings
              const savingsElement = document.getElementById(
                "offer-price-savings-prepaid"
              );
              if (savingsElement) {
                savingsElement.textContent = `Save ${savings.toFixed(2)} ${
                  offer.currency
                } Per Person`;
              } else {
                console.error("savings element not found");
              }

              // Set Get Offer Button
              const buttonGetOffer = document.getElementById(
                "button-get-offer-fb"
              );

              if (buttonGetOffer) {
                console.log("found");
                const imageUrl = `https://app.cityrewards.io/storage/v1/object/public/${offer.image_featured}?width=500&height=600`;
                buttonGetOffer.addEventListener("click", function () {
                  const stripeBodyForRequest = {
                    event_image: imageUrl,
                    event_title: offer.offer_name,
                    productCode: offer.product_code,
                    event_description: offer.description,
                    event_date: "no date",
                    event_time: "no time",
                    wholesalePricing: offer.from_price,
                    sellPricing: discountPrice,
                    xeroID: memberXeroId,
                    xeroItemId: offer.cr_xero_item_id,
                    xeroSupplierId: "no date",
                    airtableId: offer.airtable_id,
                    userAirtableId: memberAirtableId,
                    offerType: offer.offer_type,
                    offerSubType: "no offerSubType",
                    stripe_customer_id: memberStripeId,
                    booking_hold_id: "no booking_hold_id",
                    bookingQuestionAnswers: "no bookingQuestionAnswers",
                    langaugeGuides: "no langaugeGuides",
                    productOptionCode: "no productOptionCode",
                    paxMix: "no paxMix",
                    ageBandInfo: "no ageBandInfo",
                    productCode: offer.product_code,
                    pickupAddress: "no pickupAddress",
                    redeemStartDate: offer.redeem_start_date,
                    redeemEndDate: offer.redeem_end_date,
                    pipedriveID: offer.pipedriveId,
                    cuurency: offer.currency,
                  };

                  const stripeData = JSON.stringify(stripeBodyForRequest);

                  fetch(
                    "https://hook.us1.make.com/wvytrpf0k2evm6pdlevaaqa3luvtltau",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: stripeData,
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      window.location = data.checkout_url;
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                });
              } else {
                console.error(
                  "Element with ID 'button-get-offer-fb' not found"
                );
              }

              // Set description
              const descriptionElement = document.getElementById(
                "offer-description-prepaid"
              );
              if (descriptionElement) {
                descriptionElement.textContent = `${offer.description}`;
              } else {
                console.error("Description element not found");
              }

              // Set menu link and send webhook
              const menuElement = document.getElementById(
                "button-view-menu-prepaid"
              );
              if (menuElement) {
                const menuUrl = offer.menu_url;
                if (menuUrl) {
                  menuElement.setAttribute("data-url", menuUrl);
                  menuElement.addEventListener("click", async function () {
                    const url = menuElement.getAttribute("data-url");
                    window.open(url, "_blank", "width=800,height=600");

                    // Prepare the webhook payload
                    const webhookPayload = {
                      memberstack_Id: memberID,
                      product_code: offer.product_code, // Fill this out as needed
                      offer_type: "[F&B] Direct - Referral URL",
                      user_supabase_id: userSupabaseID, // Fill this out as needed
                      type: "Menu",
                      timestamp: new Date().toISOString(),
                    };

                    // Send the webhook
                    try {
                      const response = await fetch(
                        "https://hook.us1.make.com/rxi6k7hbnvnyg5f4p9srf0k3h85be12z",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(webhookPayload),
                        }
                      );
                      if (!response.ok) {
                        throw new Error(
                          `Webhook request failed with status ${response.status}`
                        );
                      }
                      console.log("Webhook sent successfully");
                    } catch (error) {
                      console.error(
                        "Failed to send menu webhook:",
                        error.message
                      );
                    }
                  });
                } else {
                  console.error("Menu URL not defined in offer");
                }
              } else {
                console.error("Menu link element not found");
              }

              // Set booking link and send webhook
              const bookingElement = document.getElementById(
                "button-referral-prepaid"
              );
              if (bookingElement) {
                const bookingUrl = offer.redeem_url; //
                if (bookingUrl) {
                  bookingElement.setAttribute("booking-url", bookingUrl);
                  bookingElement.addEventListener("click", async function () {
                    const bookingUrl =
                      bookingElement.getAttribute("booking-url");
                    window.open(bookingUrl, "_blank", "width=800,height=600");

                    // Prepare the webhook payload
                    const webhookPayload = {
                      memberstack_Id: memberID,
                      product_code: offer.product_code, // Fill this out as needed
                      offer_type: "[F&B] Direct - Prepaid Voucher",
                      user_supabase_id: userSupabaseID, // Fill this out as needed
                      type: "Prepaid Voucher",
                      timestamp: new Date().toISOString(),
                    };

                    // Send the webhook
                    try {
                      const response = await fetch(
                        "https://hook.us1.make.com/rxi6k7hbnvnyg5f4p9srf0k3h85be12z",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(webhookPayload),
                        }
                      );
                      if (!response.ok) {
                        throw new Error(
                          `Webhook request failed with status ${response.status}`
                        );
                      }
                      console.log("Webhook sent successfully");
                    } catch (error) {
                      console.error(
                        "Failed to send booking webhook:",
                        error.message
                      );
                    }
                  });
                } else {
                  console.error("Booking URL not defined in offer");
                }
              } else {
                console.error("Booking link element not found");
              }

              // Set redemption instructions
              const redemptionElement = document.getElementById(
                "offer-redemption-intruct-prepaid"
              );
              if (redemptionElement) {
                redemptionElement.textContent = `${offer.redeem_instructions}`;
              } else {
                console.error("Redemption element not found");
              }

              // Assuming these values are defined somewhere in your code
              const totalRedemptions = offer.total_redemptions; // Example value
              const maxRedemptionsPerUser = offer.max_redemptions_per_user; // Example value

              // Calculate the remaining redemptions
              const redemptionsRemaining =
                maxRedemptionsPerUser - totalRedemptions;

              // Set redemption remaining
              const redemptionRemainElement = document.getElementById(
                "offer-redemption-remain"
              );
              if (redemptionRemainElement) {
                redemptionRemainElement.textContent = `${redemptionsRemaining}/${maxRedemptionsPerUser} Redemptions Left`;
              } else {
                console.error("Redemption Remain element not found");
              }

              // Set inclusions
              const inclusionsElement = document.getElementById(
                "offer-inclusions-prepaid"
              );
              if (inclusionsElement) {
                inclusionsElement.textContent = `${offer.inclusions}`;
              } else {
                console.error("Inclusions element not found");
              }

              // Set exclusions
              const exclusionsElement = document.getElementById(
                "offer-exclusions-prepaid"
              );
              if (exclusionsElement) {
                // Clear any existing content
                exclusionsElement.textContent = "";

                // Get the exclusions string and split it into an array
                const exclusionsArray = offer.exclusions
                  .split("\n")
                  .filter((exclusion) => exclusion.trim() !== "");

                if (exclusionsArray.length > 0) {
                  // Create a <ul> element
                  const ul = document.createElement("ul");

                  // Iterate over the exclusions array and create <li> elements
                  exclusionsArray.forEach((exclusion) => {
                    const li = document.createElement("li");
                    li.textContent = exclusion;
                    ul.appendChild(li);
                  });

                  // Append the <ul> to the exclusionsElement
                  exclusionsElement.appendChild(ul);
                } else {
                  exclusionsElement.textContent = "No exclusions available.";
                }
              } else {
                console.error("exclusions element not found");
              }

              // Set additional info
              const infoElement = document.getElementById(
                "offer-additional-info"
              );
              if (infoElement) {
                infoElement.textContent = `${offer.additional_information}`;
              } else {
                console.error("additional info element not found");
              }

              // Set offer address
              const addressElement = document.getElementById(
                "offer-address-prepaid"
              );
              if (addressElement) {
                // Clear any existing content in the element
                addressElement.textContent = "";

                const placeId = offer.google_places_id_supplier;
                const addressLink = document.createElement("a");
                addressLink.href = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
                addressLink.textContent = offer.redeem_address;
                addressLink.target = "_blank";
                addressLink.classList.add("address-link"); // Add the class to the link
                addressElement.appendChild(addressLink);
              } else {
                console.error("address info element not found");
              }

              // Set offer phone
              const phoneElement = document.getElementById(
                "offer-phone-prepaid"
              );
              if (phoneElement) {
                const phoneLink = document.createElement("a");
                phoneLink.href = `tel:${offer.redeem_phone}`;
                phoneLink.textContent = offer.redeem_phone;
                phoneElement.textContent = ""; // Clear any existing content in the element
                phoneElement.appendChild(phoneLink);
              } else {
                console.error("phone info element not found");
              }

              ///Offer Type Referral URL///
            } else if (offer.offer_type === "[F&B] Direct - Referral URL") {
              console.log("Offer Type Is [F&B] Direct - Discount");
              // Set Experience Name
              const titleElement = document.getElementById(
                "offer-title-instore"
              );
              if (titleElement) {
                titleElement.textContent = `${offer.offer_name}`;
              } else {
                console.error("title element not found");
              }

              // Set Suppplier Name
              const supplierElement = document.getElementById(
                "offer-supplier-instore"
              );
              if (supplierElement) {
                supplierElement.textContent = supplierName;
              } else {
                console.error("supplier element not found");
              }

              // Set Image
              if (offer.image_featured) {
                const imageUrl = `https://app.cityrewards.io/storage/v1/object/public/${offer.image_featured}?width=500&height=600`;

                const imgElement = document.getElementById(
                  "offer-image-instore"
                );
                if (imgElement) {
                  imgElement.src = imageUrl;
                } else {
                  console.error("Image element not found");
                }
              } else {
                console.error("No image_featured field found");
              }

              // Set price/discount
              const discountPriceElement = document.getElementById(
                "fb-offer-price-voucher"
              );
              if (discountPriceElement) {
                discountPriceElement.textContent = `Buy One Get One ${offer.discount_amount}${offer.discount_type} Off`;
              } else {
                console.error("Discount element not found");
              }

              // Set discount callout
              const discountElement = document.getElementById(
                "offer-price-discount"
              );
              if (discountElement) {
                discountElement.textContent = `Get ${offer.discount_amount}${offer.discount_type} Off`;
              } else {
                console.error("Discount element not found");
              }

              const buttonRedeemOffer =
                document.getElementById("button-redeem-fb");

              if (buttonRedeemOffer) {
                buttonRedeemOffer.addEventListener("click", function () {
                  // Remove the 'hide' class from the element with ID 'fs-modal-1-popup'
                  const modalElement =
                    document.getElementById("fs-modal-1-popup");
                  if (modalElement) {
                    modalElement.classList.remove("hide");
                  } else {
                    console.error(
                      "Element with ID 'fs-modal-1-popup' not found"
                    );
                  }

                  const offerNameElement =
                    document.getElementById("fs-modal-2-heading");
                  if (offerNameElement) {
                    offerNameElement.textContent = `${offer.offer_name}`;
                  } else {
                    console.error("Offer Name element not found");
                  }
                });
              } else {
                console.error(
                  "Element with ID 'button-get-offer-fb' not found"
                );
              }

              // Set description
              const descriptionElement = document.getElementById(
                "offer-description-instore"
              );
              if (descriptionElement) {
                descriptionElement.textContent = `${offer.description}`;
              } else {
                console.error("Description element not found");
              }

              // Set menu link and send webhook
              const menuElement = document.getElementById(
                "button-view-menu-instore"
              );
              if (menuElement) {
                const menuUrl = offer.menu_url;
                if (menuUrl) {
                  menuElement.setAttribute("data-url", menuUrl);
                  menuElement.addEventListener("click", async function () {
                    const url = menuElement.getAttribute("data-url");
                    window.open(url, "_blank", "width=800,height=600");

                    // Prepare the webhook payload
                    const webhookPayload = {
                      memberstack_Id: memberID,
                      product_code: offer.product_code, // Fill this out as needed
                      offer_type: "[F&B] Direct - Referral URL",
                      user_supabase_id: userSupabaseID, // Fill this out as needed
                      type: "Menu",
                      timestamp: new Date().toISOString(),
                    };

                    // Send the webhook
                    try {
                      const response = await fetch(
                        "https://hook.us1.make.com/rxi6k7hbnvnyg5f4p9srf0k3h85be12z",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(webhookPayload),
                        }
                      );
                      if (!response.ok) {
                        throw new Error(
                          `Webhook request failed with status ${response.status}`
                        );
                      }
                      console.log("Webhook sent successfully");
                    } catch (error) {
                      console.error(
                        "Failed to send menu webhook:",
                        error.message
                      );
                    }
                  });
                } else {
                  console.error("Menu URL not defined in offer");
                }
              } else {
                console.error("Menu link element not found");
              }

              // Set booking link and send webhook
              const bookingElement = document.getElementById(
                "button-book-table-instore"
              );
              if (bookingElement) {
                const bookingUrl = offer.redeem_url; //
                if (bookingUrl) {
                  bookingElement.setAttribute("booking-url", bookingUrl);
                  bookingElement.addEventListener("click", async function () {
                    const bookingUrl =
                      bookingElement.getAttribute("booking-url");
                    window.open(bookingUrl, "_blank", "width=800,height=600");

                    // Prepare the webhook payload
                    const webhookPayload = {
                      memberstack_Id: memberID,
                      product_code: offer.product_code, // Fill this out as needed
                      offer_type: "[F&B] Direct - Referral URL",
                      user_supabase_id: userSupabaseID, // Fill this out as needed
                      type: "Referral",
                      timestamp: new Date().toISOString(),
                    };

                    // Send the webhook
                    try {
                      const response = await fetch(
                        "https://hook.us1.make.com/rxi6k7hbnvnyg5f4p9srf0k3h85be12z",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(webhookPayload),
                        }
                      );
                      if (!response.ok) {
                        throw new Error(
                          `Webhook request failed with status ${response.status}`
                        );
                      }
                      console.log("Webhook sent successfully");
                    } catch (error) {
                      console.error(
                        "Failed to send booking webhook:",
                        error.message
                      );
                    }
                  });
                } else {
                  console.error("Booking URL not defined in offer");
                }
              } else {
                console.error("Booking link element not found");
              }

              // Set redemption instructions
              const redemptionElement = document.getElementById(
                "offer-redemption-instruc-instore"
              );
              if (redemptionElement) {
                redemptionElement.textContent = `${offer.redeem_instructions}`;
              } else {
                console.error("Redemption element not found");
              }

              // Set inclusions
              const inclusionsElement = document.getElementById(
                "offer-inclusions-voucher"
              );
              if (inclusionsElement) {
                inclusionsElement.textContent = `${offer.inclusions}`;
              } else {
                console.error("Inclusions element not found");
              }

              // Set exclusions
              const exclusionsElement = document.getElementById(
                "offer-exclusions-voucher"
              );
              if (exclusionsElement) {
                // Clear any existing content
                exclusionsElement.textContent = "";

                // Get the exclusions string and split it into an array
                const exclusionsArray = offer.exclusions
                  .split("\n")
                  .filter((exclusion) => exclusion.trim() !== "");

                if (exclusionsArray.length > 0) {
                  // Create a <ul> element
                  const ul = document.createElement("ul");

                  // Iterate over the exclusions array and create <li> elements
                  exclusionsArray.forEach((exclusion) => {
                    const li = document.createElement("li");
                    li.textContent = exclusion;
                    ul.appendChild(li);
                  });

                  // Append the <ul> to the exclusionsElement
                  exclusionsElement.appendChild(ul);
                } else {
                  exclusionsElement.textContent = "No exclusions available.";
                }
              } else {
                console.error("exclusions element not found");
              }

              // Set additional info
              const infoElement = document.getElementById(
                "offer-additional-info"
              );
              if (infoElement) {
                infoElement.textContent = `${offer.additional_information}`;
              } else {
                console.error("additional info element not found");
              }

              // Set offer address
              const addressElement = document.getElementById("offer-address");
              if (addressElement) {
                // Clear any existing content in the element
                addressElement.textContent = "";

                const placeId = offer.google_places_id_supplier;
                const addressLink = document.createElement("a");
                addressLink.href = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
                addressLink.textContent = offer.redeem_address;
                addressLink.target = "_blank";
                addressLink.classList.add("address-link"); // Add the class to the link
                addressElement.appendChild(addressLink);
              } else {
                console.error("address info element not found");
              }

              // Assuming these values are defined somewhere in your code
              const totalRedemptions = offer.total_redemptions; // Example value
              const maxRedemptionsPerUser = offer.max_redemptions_per_user; // Example value

              // Calculate the remaining redemptions
              const redemptionsRemaining =
                maxRedemptionsPerUser - totalRedemptions;

              // Set redemption remaining
              const redemptionRemainElement = document.getElementById(
                "offer-redemption-instore"
              );
              if (redemptionRemainElement) {
                redemptionRemainElement.textContent = `${redemptionsRemaining}/${maxRedemptionsPerUser} Redemptions Left`;
              } else {
                console.error("Redemption Remain element not found");
              }

              // Set offer phone
              const phoneElement = document.getElementById("offer-phone");
              if (phoneElement) {
                const phoneLink = document.createElement("a");
                phoneLink.href = `tel:${offer.redeem_phone}`;
                phoneLink.textContent = offer.redeem_phone;
                phoneElement.textContent = ""; // Clear any existing content in the element
                phoneElement.appendChild(phoneLink);
              } else {
                console.error("phone info element not found");
              }
            } else {
              console.log("Offer Type is not recognized");
            }
          } else {
            console.error("No offer data found in Supbase");
          }

          // Optionally, save experienceName to local storage
          localStorage.setItem("experienceName", experienceName);
        } catch (err) {
          // Handle the error here
          console.error("An error occurred:", err.message);
          // Optionally, save an error message to local storage or perform other actions
          localStorage.setItem("experienceError", err.message);
        } finally {
          // Hide loading spinner and show offer info
          if (loadingSpinnerElement) {
            loadingSpinnerElement.style.display = "none";
          }
          if (offerInfoElement) {
            offerInfoElement.style.display = "block";
          }
        }
      }

      // Ensure experienceName is defined or passed to the function
      // const experienceName = "Cantina Norte Dining Offer"; // Replace with actual experience name
      getOfferInfo(experienceName);
    } else if (offerType === "[Retail] Direct - Referral URL") {
      console.log("[Retail] Direct - Referral URL Offer");
    } else if (offerType === "[Retail] Direct - Prepay") {
      console.log("[Retail] Direct - Prepay Offer");
    } else if (offerType === "[Supplier] New Platform Offer") {
      console.log("[Supplier] New Pattform Offer");
    } else {
      console.log("Unknown Offer Type");
    }
  }

  // Example usage
  runOfferType(offerType);
});
