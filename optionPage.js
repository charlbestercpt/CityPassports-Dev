// when the document is loaded
$(document).ready(function () {
  const response = JSON.parse(localStorage.getItem("see_option2"));

  // when no availability is found
  if (response.code === "NOT_FOUND" || response.code === "BAD_REQUEST") {
    $(".options--container--wrapper").addClass("hidden");
    $(".div_close-heading").addClass("hidden");
    $(".options--container--wrapper").addClass("hidden");
    $(".comp-date_tickets").addClass("full-width");
    $(".div_selection").addClass("hidden");
    $(".available-options").addClass("hidden");
    $(".section-book_now").addClass("hidden");
    $(".not_found_box").removeClass("hide");
  }
  // when availability is found
  else {
    if (localStorage.getItem("priceData")) {
      console.log("Price data is set");
    } else {
      console.log("Price data is not set");
    }

    const filteredItems = response.bookableItems.filter(
      (item) => item.available !== false
    );
    console.log(filteredItems);
    const items = filteredItems.length;
    $(".number-of-options").text(items);
    $("#exp-date").text(localStorage.getItem("currentDate"));
    $("#exp-name").text(localStorage.getItem("name"));
    $("#exp-date2").text(localStorage.getItem("currentDate"));
    $("#exp-name2").text(localStorage.getItem("name"));
    const name = localStorage.getItem("name");
    const product_data = JSON.parse(localStorage.getItem("booking_questions"));
    const product_options = product_data.productOptions ?? null;

    //creating the option box
    function createOptionBox(item, index) {
      const divOptionBox = $("<div>").addClass(
        index === 0 ? "div_option-box selected" : "div_option-box"
      );
      const divOptionInfo = $("<div>").addClass("div_option-info");
      const divOptionPrice = $("<div>").addClass("div_option-price");
      const textOption = $("<span>")
        .addClass("text_option")
        .text(items > 1 ? `Option ${index + 1}` : "Available Option");
      const optionName = $("<span>").addClass("option-name").text(item.title);
      const optionDescription = $("<span>")
        .addClass("option-description")
        .html(item.description || "");
      const startTime = $("<span>")
        .addClass("text_time")
        .text(formatTime(item.startTime) || "Available from opening hours.");
      const totalPriceValue = item.totalPrice.price.recommendedRetailPrice;
      const lineItems = item.lineItems;
      const currency = response.currency || "CAD"; // Default to CAD if not present
      const totalPrice = $("<span>")
        .addClass("option-price")
        .text("Total:" + " " + currency + " " + totalPriceValue.toFixed(2));

      // Include total savings next to the total price
      const totalSavingsAmount =
        response.bookableItems[0].totalPrice.price.savings || 0;
      let totalPriceTextWithSavings = ``;
      if (totalSavingsAmount > 0) {
        totalPriceTextWithSavings += ` (You Save ${currency} ${totalSavingsAmount.toFixed(
          2
        )})`;
      }

      totalPriceTextWithSavings = `${totalPriceTextWithSavings}`;

      // Create the custom sorting order
      const sortingOrder = [
        "ADULT",
        "SENIOR",
        "YOUTH",
        "CHILD",
        "INFANT",
        "TRAVELER",
      ];

      // Sort the lineItems array based on the custom sorting order
      const sortedLineItems = lineItems.sort((a, b) => {
        const indexA = sortingOrder.indexOf(a.ageBand);
        const indexB = sortingOrder.indexOf(b.ageBand);

        // Compare based on index order
        return indexA - indexB;
      });
      let savingsText = "";
      // Create an array to store line item texts with savings
      const lineItemsWithSavings = sortedLineItems.map((lineItem) => {
        const ageBand =
          lineItem.ageBand.charAt(0).toUpperCase() +
          lineItem.ageBand.slice(1).toLowerCase();
        const pricePerPassenger =
          lineItem.subtotalPrice.price.recommendedRetailPrice /
          lineItem.numberOfTravelers;
        const totalPriceText = `CAD ${pricePerPassenger.toFixed(2)}`;

        // Check if the savings property exists and is not null or undefined
        const savingsAmount = lineItem.subtotalPrice.price.savings;
        const hasSavings =
          typeof savingsAmount !== "undefined" && savingsAmount !== null;

        // Include savings information only if there are savings
        savingsText =
          hasSavings && savingsAmount > 0
            ? ` (${currency} ${savingsAmount.toFixed(2)} off)`
            : "";

        return `${lineItem.numberOfTravelers} ${ageBand} x ${totalPriceText}${savingsText}`;
      });

      // Combine line item texts with line breaks
      const optionTicketsText = lineItemsWithSavings.join("<br>");

      // Create an element to hold the combined line item texts
      const optionTickets = $("<span>")
        .addClass("option-tickets")
        .html(optionTicketsText);

      // Create an element for totalPriceTextWithSavings and apply the style
      const totalPriceWithSavings = $("<span>")
        .addClass("option-price")
        .text(totalPriceTextWithSavings)
        .css({
          color: "#ef4672",
          "margin-top": "0.5rem", // Add margin-top
        });

      // Create an element for optionSavings and apply the style
      const optionSavings = $("<span>")
        .addClass("option-savings")
        .text(savingsText);

      divOptionInfo.append(
        textOption,
        optionName,
        optionDescription,
        startTime
      );
      divOptionBox.attr("id", item.productOptionCode);
      divOptionBox.attr("descrip", item.description);
      divOptionBox.attr("price", item.totalPrice.price.recommendedRetailPrice);
      divOptionBox.attr("time", item.startTime);
      divOptionBox.append(divOptionInfo, divOptionPrice);
      divOptionPrice.append(totalPrice, optionTickets, totalPriceWithSavings);

      divOptionBox.click(function () {
        $(".div_option-box").removeClass("selected"); // Remove selected class from all options
        $(this).addClass("selected"); // Add selected class to the clicked option

        // Update the selected_option_code variable
        let selected_option_code = $(this).attr("id");
        let selected_descrip = $(this).attr("descrip");
        let selected_price = $(this).attr("price");
        let selected_time = $(this).attr("time");

        // Check if selected_option_code is null or undefined
        if (
          selected_option_code === null ||
          selected_option_code === undefined
        ) {
          selected_option_code = "No-option";
        }

        // Check if selected_time is null or undefined
        if (selected_time === null || selected_time === undefined) {
          selected_time = "No-time";
        }

        localStorage.setItem("selected_option_code", selected_option_code);
        localStorage.setItem("selected_price", selected_price);
        localStorage.setItem("selected_time", selected_time);
      });

      $(".all_options").append(divOptionBox);
    }

    function formatTime(time) {
      if (!time) return "";

      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const suffix = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${formattedHour}:${minutes} ${suffix}`;
    }

    // when availability with multiple options is found
    if (items > 1) {
      if (product_data.productOptions) {
        for (var i = 0; i < response.bookableItems.length; i++) {
          for (var j = 0; j < product_data.productOptions.length; j++) {
            if (
              response.bookableItems[i].productOptionCode ===
              product_data.productOptions[j].productOptionCode
            ) {
              response.bookableItems[i]["title"] =
                product_data.productOptions[j].title;
              response.bookableItems[i]["description"] =
                product_data.productOptions[j].description;
            }
          }
        }
      } else {
        // product_data.productOptions does not exist
        console.log("No Product Options");
        response.bookableItems.forEach((item) => {
          item.title = localStorage.getItem("name");
        });
      }

      // sorting the available option by start time
      if (filteredItems.some((item) => item.startTime)) {
        filteredItems.sort((a, b) => {
          if (a.startTime && b.startTime) {
            let fa = a.startTime.toLowerCase();
            let fb = b.startTime.toLowerCase();
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          } else if (a.startTime) {
            return -1;
          } else if (b.startTime) {
            return 1;
          }
          return 0;
        });
      }

      console.log("multiple options");
      const clonedFilterItems = filteredItems.slice();
      const titles = clonedFilterItems.map((item) => item.title);
      console.log("Cloned Titles:", titles);

      // Create div_option-box for each item
      clonedFilterItems.forEach((item, index) => {
        createOptionBox(item, index);
      });

      // Trigger click event on initially selected item
      $(".div_option-box.selected").click();
    } // end of else statement
    else if (filteredItems.length === 1) {
      response.bookableItems[0]["title"] = product_data.title;
      console.log("one option");
      const clonedBookableItems = response.bookableItems.slice();
      const titles = clonedBookableItems.map((item) => item.title);
      console.log("Cloned Titles:", titles);
      createOptionBox(clonedBookableItems[0], 0);
      $(".div_option-box.selected").click();
    }
  }
}); //function
