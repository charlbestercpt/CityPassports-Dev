const offerSubType = localStorage.getItem("offerSubType");
const offerType = localStorage.getItem("offerType");
const redeemStartDate = localStorage.getItem("redeemStartDate");
const redeemEndDate = localStorage.getItem("redeemEndDate");
const pipedriveId = localStorage.getItem("pipedriveId");
const ms_data = localStorage.getItem("_ms-mem");
console.log(redeemStartDate);

const ageBandOrder = ["adult", "senior", "youth", "child", "infant"];
paxMixObj.sort(
  (a, b) => ageBandOrder.indexOf(a.ageBand) - ageBandOrder.indexOf(b.ageBand)
);
const count = paxMixObj.reduce((a, b) => ({
  numberOfTravelers: a.numberOfTravelers + b.numberOfTravelers,
}));
if (count.numberOfTravelers > 0) {
  for (var i = 1; i < count.numberOfTravelers; i++) {
    $(".booking-question-list:first")
      .clone(true)
      .insertAfter(".booking-question-list:first");
  }
  let paxMixIndex = 0;
  let travelerIndex = 1;
  $(".booking-question-list").each(function (index) {
    let travelerName;
    if (index === 0) {
      const leadIndex = paxMixObj.findIndex(
        (p) => p.ageBand === "adult" && p.numberOfTravelers > 0
      );
      paxMixIndex = leadIndex !== -1 ? leadIndex : paxMixIndex;
    }
    while (paxMixObj[paxMixIndex].numberOfTravelers === 0) {
      paxMixIndex += 1;
    }
    const ageBand = paxMixObj[paxMixIndex].ageBand;
    if (index === 0) {
      travelerName = "Lead Traveler";
    } else if (index === 1) {
      const indexForTraveler2 =
        paxMixObj.findIndex(
          (p) => p.ageBand === "adult" && p.numberOfTravelers > 0
        ) === -1
          ? paxMixIndex
          : paxMixObj.findIndex(
              (p) => p.ageBand === "adult" && p.numberOfTravelers > 0
            );
      paxMixIndex = indexForTraveler2;
      const ageBand2 = paxMixObj[paxMixIndex].ageBand;
      travelerName = "Traveler " + travelerIndex;
    } else {
      travelerName = "Traveler " + travelerIndex;
    }
    //Add name
    $(this).prepend(`<h5 class="heading-xsmall">${travelerName}</h5>`);
    $(this)
      .find(":input")
      .each(function () {
        $(this).attr("name", $(this).attr("name") + " traveller" + (index + 1));
        $(this).attr("traveller", index + 1);
        // Set age band
        if ($(this).attr("id") === "AGEBAND") {
          let ageBand = paxMixObj[paxMixIndex].ageBand;
          const capitalizedAgeBand =
            ageBand.charAt(0).toUpperCase() + ageBand.slice(1).toLowerCase();
          ageBand = capitalizedAgeBand.toUpperCase();
          paxMixObj[paxMixIndex].ageBand = ageBand;
          $(this).val(capitalizedAgeBand);
        }
      });
    paxMixObj[paxMixIndex].numberOfTravelers -= 1;
    travelerIndex++;
  });
}

//display booking questions
const booking_ques = JSON.parse(localStorage.getItem("booking_questions"));

$(".viator-id-hidden").each(function () {
  if (
    $.inArray($(this).attr("viator_id"), booking_ques.bookingQuestions) !== -1
  ) {
    $(this).parent().parent().css("display", "block");
    if ($(this).attr("viator_id") === "AGEBAND") {
      $(this).parent().parent().find("input").prop("required", true);
    } else {
      $(this).parent().parent().find("input").prop("required", true);
    }
  } else {
    $(this).parent().parent().remove();
  }
});

const additionalQuestions = document.querySelector("#additional-questions");
const perBookingQuestions = document.querySelector(".per_booking_questions");
const headingAdditional = document.querySelector(".heading_additional");

if (additionalQuestions) {
  additionalQuestions.parentNode.insertBefore(
    perBookingQuestions,
    additionalQuestions.nextSibling
  );

  additionalQuestions.parentNode.insertBefore(
    headingAdditional,
    perBookingQuestions
  );
} else {
  const formWrapper = document.querySelector(".form_wrapper");
  formWrapper.appendChild(perBookingQuestions);
  formWrapper.appendChild(headingAdditional);
}

$(document).ready(function () {
  $(".booking_question input_field").each(function () {
    $(this).prop("required", true);
  });
  //<submit>
  $("#checkout-submit").click(async function (e) {
    // Adding the spinner class to the button
    e.preventDefault();
    $(this).addClass("spinner");

    setTimeout(function () {
      this.classList.remove("spinner");
    }, 10000);

    let unit = 0;
    const unitSelect = document.getElementById("unitSelect");
    if (unitSelect) {
      unit = unitSelect.value;
    }
    console.log(unit);
    const bookingQuestion = [];
    const perTravelerQuestions = [];
    const perBookingQuestions = [];
    const applicableBookingQuestions = bookingQuestionsStorage.bookingQuestions;
    //Loop
    $(".input_field_2, .pickup-label").each(function (index) {
      const bookingGroup = $(this).attr("booking_group");
      const QuestionID = $(this).attr("id");
      const question = $(this).attr("id");
      const answer = $(this).val();
      let travelerNum = 1;

      if (QuestionID === "WEIGHT" || QuestionID === "HEIGHT") {
        travelerNum =
          parseInt(
            $(this).parent().parent().parent().find("select").attr("traveller")
          ) || 1;
      } else {
        travelerNum =
          parseInt(
            $(this).parent().parent().find("select").attr("traveller")
          ) || 1;
      }

      let questionAnswer;
      if (QuestionID === "WEIGHT" || QuestionID === "HEIGHT") {
        questionAnswer = {
          question: question,
          answer: answer,
          unit: unit,
          travelerNum: travelerNum,
        };
      } else if (QuestionID === "PICKUP_POINT") {
        questionAnswer = {
          question: question,
          answer: answer,
          unit: "LOCATION_REFERENCE",
        };
      } else if (bookingGroup === "PER_BOOKING") {
        questionAnswer = {
          question: question,
          answer: answer,
        };
      } else if (bookingGroup === "PER_TRAVELER") {
        questionAnswer = {
          question: question,
          answer: answer,
          travelerNum: travelerNum,
        };
      }
      if (bookingGroup === "PER_BOOKING") {
        perBookingQuestions.push(questionAnswer);
      } else if (bookingGroup === "PER_TRAVELER") {
        perTravelerQuestions.push(questionAnswer);
      }
    });

    const bQAnswersJoin = perTravelerQuestions.concat(perBookingQuestions);
    const bQJoint = bQAnswersJoin;
    console.log("bQAns:", bQJoint);
    for (let i = 0; i < bQJoint.length; i++) {
      const question = bQJoint[i].question;
      if (question === "AGEBAND") {
        bQJoint[i].answer = bQJoint[i].answer.toUpperCase();
      }
    }
    //Store time value
    let time = "No-time";
    let productOptions = booking_ques.productOptions;
    let option = productOptions?.find((opt) => {
      return opt.productOptionCode === selected_option_code;
    });
    if (!response.bookableItems[0].startTime) {
      $('input[name="time"]').val(time);
    } else {
      time = localStorage.getItem("selected_time");
      $('input[name="time"]').val(time);
    }
    const final_product = {
      experienceName: localStorage.getItem("name"),
    };
    if (typeof selected_option_code === "undefined") {
      delete final_product.productOptionCode;
    } else {
      final_product.productOptionCode = selected_option_code;
    }

    window.localStorage.setItem("final_product", JSON.stringify(final_product));
    console.log(final_product);
    //Post to Make
    const booking_info = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify(final_product),
    };

    window.localStorage.setItem("bookingInfo", JSON.stringify(booking_info));

    const data = JSON.parse(localStorage.getItem("data"));
    const xeroID = localStorage.getItem("xeroID");
    const pricingData =
      data?.bookableItems[0]?.seasons[0].pricingRecords[0]?.pricingDetails ??
      null;

    let priceDataForStripe = [];

    //stripe
    paxMixStripe.forEach((pax) => {
      if (pricingData && pax.numberOfTravelers > 0) {
        let price = pricingData.find(
          (priceData) => priceData.ageBand === pax.ageBand
        );
        if (price) {
          priceDataForStripe.push({
            price_data: {
              currency: data.currency,
              product_data: {
                name:
                  pax.ageBand.charAt(0).toUpperCase() +
                  pax.ageBand.slice(1).toLowerCase(),
              },
              unit_amount:
                price.price.original.recommendedRetailPrice * 100 ?? 0,
            },
            quantity: pax.numberOfTravelers,
          });
        }
      }
    });

    if (offerSubType === "[Travel] Direct - Free Sell Activities") {
      const bookingHold = JSON.parse(localStorage.getItem("booking_hold"));
      let bookingHold2 = bookingHold;

      const ageBandInfo = {};
      const discountValue = parseFloat(
        localStorage.getItem("ADULT_Disc_Value")
      );

      if (discountValue > 0) {
        console.log("Discount value more than 0");

        // Initialize a variable to store the total recommended retail price
        let totalRecommendedRetailPrice = 0;

        bookingHold2.lineItems.forEach((lineItem) => {
          const ageBand = lineItem.ageBand;

          // switch (ageBand) {
          //   case "ADULT":
          //   case "SENIOR":
          //   case "YOUTH":
          //   case "CHILD":
          //   case "INFANT":
          //   case "TRAVELER":
          //     lineItem.subtotalPrice.price.recommendedRetailPrice -=
          //       discountValue;
          //     lineItem.subtotalPrice.price.recommendedRetailPrice =
          //       Math.ceil(
          //         lineItem.subtotalPrice.price.recommendedRetailPrice / 0.05
          //       ) * 0.05;
          //     break;
          //   // Add additional cases if needed for other ageBands

          //   default:
          //     // Handle the default case here if necessary
          //     break;
          // }

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
    }

    const airtable_id = localStorage.getItem(
      "ms_data.customFields.airtable-id"
    );
    const booking_hold2 = JSON.parse(localStorage.getItem("booking_hold2"));
    const stripeBodyForRequest = {
      event_image: eventImage,
      event_title: name,
      productCode: response.productCode,
      event_description: option?.description,
      event_date: response.travelDate,
      event_time: time,
      wholesalePricing: booking_ref,
      sellPricing: booking_hold2,
      xeroID: xeroID,
      xeroItemId: itemId,
      xeroSupplierId: supplierId,
      airtableId: airtable_id,
      offerType: offerType,
      offerSubType: offerSubType,
      stripe_customer_id: stripeCustomerId,
      booking_hold_id: booking_ref.bookingRef,
      bookingQuestionAnswers: bQJoint,
      langaugeGuides: languageGuidesObj,
      productOptionCode: selected_option_code,
      paxMix: paxMixStore,
      ageBandInfo: ageBandInfo,
      productCode: data.productCode,
      pickupAddress: localStorage.getItem("selectedLocationDetails"),
      redeemStartDate: localStorage.getItem("redeemStartDate"),
      redeemEndDate: localStorage.getItem("redeemEndDate"),
      pipedriveID: localStorage.getItem("pipedriveId"),
    };

    const stripeData = JSON.stringify(stripeBodyForRequest);

    fetch("https://hook.us1.make.com/wvytrpf0k2evm6pdlevaaqa3luvtltau", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stripeData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location = data.checkout_url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

$(document).ready(function () {
  function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = "none";
    }
  }

  const perTVisible = $("#perT:visible").length > 0;
  const perBVisible = $("#perB:visible").length > 0;

  if (!perTVisible) {
    hideElementById("traveler-questions");
  }
  if (!perBVisible) {
    hideElementById("additional-questions");
  }

  // Hide questions with an ID that contains "TRANSFER"
  $(".input_field_2").each(function () {
    const questionId = $(this).attr("id");
    if (questionId && questionId.includes("TRANSFER")) {
      $(this).parent().parent().remove();
    }
  });
});
