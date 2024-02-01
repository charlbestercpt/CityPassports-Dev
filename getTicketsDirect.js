localStorage.setItem("offerType", offerType);
localStorage.setItem("offerSubType", offerSubType);
console.log("Book With Calendar", bookCalendar);

if (
  offerSubType === "[Travel] Direct - Free Sell Activities" &&
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
    localStorage.setItem("discountData", JSON.stringify(filteredDiscountData));
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
      "SPECIAL_REQUIREMENTS",
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
  localStorage.setItem("booking_questions", JSON.stringify(booking_questions));
} else if (
  offerSubType === "[Travel] Direct - Free Sell Activities" &&
  bookCalendar === "true"
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
    localStorage.setItem("discountData", JSON.stringify(filteredDiscountData));
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
      "SPECIAL_REQUIREMENTS",
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
  localStorage.setItem("booking_questions", JSON.stringify(booking_questions));
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
    localStorage.setItem("pickup_locationsObj", JSON.stringify(decodedJson));
  } else {
    console.error("NOTE: Pick Up Not Applicable");
  }
});

// Get button element
const getTicketsButtonDirect = document.getElementById(
  "button-get_tickets_direct"
);

// Add a click event listener to that element
getTicketsButtonDirect.addEventListener("click", function () {
  // Here you can include your if-else logic
  if (
    offerSubType === "[Travel] Direct - Free Sell Activities" &&
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
          unavailableDates.length > 0 ? unavailableDates : [unavailableDates],
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
                    detail.price.original.recommendedRetailPrice = parseFloat(
                      detail.price.original.recommendedRetailPrice.toFixed(2)
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
                    detail.price.original.recommendedRetailPrice = parseFloat(
                      detail.price.original.recommendedRetailPrice.toFixed(2)
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

    var button = document.querySelector(".button_availability");
    button.classList.add("spinner");

    // make your AJAX request here, and when you get a response, remove the spinner class:
    setTimeout(function () {
      button.classList.remove("spinner");

      if (offerSubType === "[Travel] Direct - Free Sell Activities") {
        window.location.href = "/app/select-tickets";
      } else {
        window.location.href = "/app/availability-schedule";
      }
    }, 5000);
  } else if (
    offerSubType === "[Travel] Direct - Free Sell Activities" &&
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
          unavailableDates.length > 0 ? unavailableDates : [unavailableDates],
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
                    detail.price.original.recommendedRetailPrice = parseFloat(
                      detail.price.original.recommendedRetailPrice.toFixed(2)
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
                    detail.price.original.recommendedRetailPrice = parseFloat(
                      detail.price.original.recommendedRetailPrice.toFixed(2)
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

    var button = document.querySelector(".button_availability");
    button.classList.add("spinner");

    // make your AJAX request here, and when you get a response, remove the spinner class:
    setTimeout(function () {
      button.classList.remove("spinner");

      if (
        offerSubType === "[Travel] Direct - Free Sell Activities" &&
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
