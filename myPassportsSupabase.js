document.addEventListener("DOMContentLoaded", async function () {
  const { createClient } = supabase;

  const _supabase = createClient(
    "https://impecimchocfsfsdgrvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
  );

  console.log("Supabase Instance: ", _supabase);

  // Function to retrieve email from localStorage
  function getMsEmail() {
    const msDataString = localStorage.getItem("_ms-mem");
    if (msDataString) {
      const msData = JSON.parse(msDataString);
      if (msData.auth && msData.auth["email"]) {
        return msData.auth["email"];
      }
    }
    return null;
  }

  // Function to retrieve msID from localStorage
  function getMsId() {
    const msDataString = localStorage.getItem("_ms-mem");
    if (msDataString) {
      const msData = JSON.parse(msDataString);
      if (msData && msData["id"]) {
        return msData["id"];
      }
    }
    return null;
  }

  const msEmail = getMsEmail();
  const msId = getMsId();

  async function signInAndPrintBookingNumber() {
    if (msEmail && msId) {
      console.log("User Email:", msEmail);
      console.log("User ID:", msId);

      try {
        const response = await _supabase.auth.signInWithPassword({
          email: msEmail,
          password: msId,
        });

        if (response.error) {
          console.error(
            "Supabase authentication failed:",
            response.error.message
          );
        } else {
          console.log("Supabase authentication successful:", response);
          localStorage.setItem("supabaseData", JSON.stringify(response));
        }
      } catch (error) {
        console.error("Supabase authentication error:", error.message);
      }
    } else {
      console.log("Failed to retrieve msEmail or msID");
    }

    //function to print booking number
    async function printBookingNumber() {
      try {
        let { data, error } = await _supabase
          .from("Bookings")
          .select(
            "experience_name,booking_number,activity_start_date,booking_number,is_redeemed"
          )
          .eq("associated_user_memberstack_id", msId);

        // Check for errors
        if (error) {
          throw error;
        }

        data.sort((a, b) => {
          // First, compare by activity start date
          const dateComparison =
            new Date(a.activity_start_date) - new Date(b.activity_start_date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          // If activity dates are the same, compare by experience name alphabetically
          return a.experience_name.localeCompare(b.experience_name);
        });

        // Get the container element
        const fsModalDiv = document.querySelector(".fs_modal-2_component");
        fsModalDiv.innerHTML = "";
        // Loop through the data and create divs for each experience
        data.forEach((item) => {
          // Create a div element with classes 'table-line' and 'booking'
          const tableLineDiv = document.createElement("div");
          tableLineDiv.classList.add("table-line", "booking");

          const tablePDiv = document.createElement("div");
          tablePDiv.classList.add("table-p", "voucher");

          const tableIconDiv = document.createElement("div");
          tableIconDiv.classList.add("table-icon");

          const progressDiv = document.createElement("div");
          progressDiv.classList.add("progress");

          const progressDiv2 = document.createElement("div");
          progressDiv2.classList.add("progress");

          const progressDiv3 = document.createElement("div");
          progressDiv3.classList.add("progress");

          const bookingNumberDiv = document.createElement("div");
          bookingNumberDiv.classList.add("progress");

          const bookingDateDiv = document.createElement("div");
          bookingDateDiv.classList.add("bookings-date");

          const modalButton = document.createElement("button");
          modalButton.classList.add("button");
          modalButton.style.minWidth = "100%";
          const buttonText = document.createTextNode("View Voucher");
          modalButton.appendChild(buttonText);

          // Add event listener to the modal button
          modalButton.addEventListener("click", async () => {
            try {
              // Make a call to Supabase to get more booking info
              const { data, error } = await _supabase
                .from("Bookings")
                .select("*")
                .eq("booking_number", item.booking_number); // Adjust the condition as needed
              console.log(data);
              // Check for errors
              if (error) {
                throw error;
              }

              // Display the data
              if (data && data.length > 0) {
                // Assuming there's only one booking for simplicity
                const bookingInfo = data[0];
                console.log(bookingInfo.associated_supplier);
                console.log("bookingInfo", bookingInfo);
                if (bookingInfo.is_redeemed === false) {
                  console.log("booking not redeemed");

                  const bookingJSON = JSON.parse(bookingInfo.booking_json);
                  console.log(bookingJSON);
                  // Create a new div for the popup/modal
                  const modalBooking = document.createElement("div");
                  modalBooking.classList.add("modal-booking");
                  modalBooking.innerHTML = "";
                  const coverDiv = document.createElement("div");
                  coverDiv.classList.add("fs_modal-2_cover");

                  const wrapperDiv = document.createElement("div");
                  wrapperDiv.classList.add("fs_modal-2_wrapper");

                  const modalContentDiv = document.createElement("div");
                  modalContentDiv.classList.add("fs_modal-2_content");

                  const modalContentDiv2 = document.createElement("div");
                  modalContentDiv2.classList.add(
                    "fs_modal-2_content",
                    "bottom"
                  );

                  const containerNotVerifiedDiv = document.createElement("div");

                  const modalHeading = document.createElement("h1");
                  modalHeading.classList.add("heading-medium");
                  modalHeading.textContent = item.experience_name;
                  modalContentDiv.appendChild(modalHeading);

                  function formatOrderTotal(total, currency) {
                    let formattedTotal = total.toFixed(2); // Round total to 2 decimal places

                    // Add currency symbol based on currency
                    switch (currency.toLowerCase()) {
                      case "usd":
                      case "cad":
                        formattedTotal = "$" + formattedTotal;
                        break;
                      // Add cases for other currencies as needed
                      default:
                      // If currency is not USD or CAD, do nothing with the symbol
                    }

                    return formattedTotal;
                  }

                  // Get the order total and currency from the bookingInfo object
                  const orderTotal = bookingInfo.order_total;
                  const currency = bookingInfo.currency;

                  // Create a paragraph element for the order total
                  const orderTotalPara = document.createElement("p");
                  orderTotalPara.classList.add("text-ticket");

                  // Format the order total with currency symbol
                  const formattedTotal = formatOrderTotal(orderTotal, currency);

                  // Set the content of the paragraph element
                  orderTotalPara.textContent = `Order Total: ${formattedTotal} ${currency}`;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(orderTotalPara);

                  // Parse the booking JSON string to extract pax mix information
                  const bookingJson = JSON.parse(bookingInfo.booking_json);
                  const paxMix = bookingJson.paxMix;

                  // Create a paragraph element for the pax mix
                  const paxMixPara = document.createElement("p");
                  paxMixPara.classList.add("text-ticket");

                  // Format the pax mix information
                  let paxMixText = "Tickets: ";
                  paxMix.forEach((ageBand, index) => {
                    const capitalizedAgeBand =
                      ageBand.ageBand.charAt(0).toUpperCase() +
                      ageBand.ageBand.slice(1).toLowerCase();
                    paxMixText += `${ageBand.numberOfTravelers} x ${capitalizedAgeBand}`;
                    if (index < paxMix.length - 1) {
                      paxMixText += ", "; // Add comma if there are more age bands
                    }
                  });

                  // Set the content of the paragraph element
                  paxMixPara.textContent = paxMixText;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(paxMixPara);

                  const bookingNumberPara = document.createElement("p");
                  bookingNumberPara.classList.add("text-ticket");
                  bookingNumberPara.textContent = `Booking Number: ${bookingInfo.booking_number}`;
                  modalContentDiv.appendChild(bookingNumberPara);

                  const bookingDatePara = document.createElement("p");
                  bookingDatePara.classList.add("text-ticket");
                  bookingDatePara.textContent = `Experience Date: ${bookingInfo.activity_start_date}`;
                  modalContentDiv.appendChild(bookingDatePara);

                  const addressPara = document.createElement("p");
                  addressPara.classList.add("text-ticket");
                  addressPara.textContent = "Add Address";
                  modalContentDiv.appendChild(addressPara);

                  // Create the form element
                  const modalForm = document.createElement("form");
                  modalForm.classList.add("modal-form");

                  // Create the input field
                  const inputField = document.createElement("input");
                  inputField.classList.add("input_field", "align-center");
                  inputField.type = "text"; // Set input type to text
                  inputField.placeholder = "Supplier Redemption Code"; // Set placeholder text

                  const modalFormPara = document.createElement("p");
                  modalFormPara.classList.add(
                    "text-ticket",
                    "text-align-center",
                    "para-small"
                  );
                  modalFormPara.textContent =
                    "Provided by the experience host.";

                  // Create the button
                  const button = document.createElement("button");
                  button.classList.add("button", "full-width");
                  button.type = "submit"; // Set button type to submit
                  button.textContent = "Redeem"; // Set button text

                  const supplierID = bookingInfo.associated_supplier;
                  console.log("Supplier ID:", supplierID);
                  // Fetch supplier redemption code based on associated_supplier

                  const { data: supplierData, error: supplierError } =
                    await _supabase
                      .from("Suppliers")
                      .select("*")
                      .eq("airtable_id", supplierID)
                      .single();

                  if (supplierError) {
                    throw supplierError;
                  }
                  console.log(supplierData);
                  const supplierRedemptionCode =
                    supplierData.supplier_redemption_code;
                  console.log(
                    "Supplier Redemption Code:",
                    supplierRedemptionCode
                  );

                  // Add an event listener to the form submission
                  modalForm.addEventListener("submit", async function (event) {
                    event.preventDefault(); // Prevent the default form submission behavior
                    const inputValue = inputField.value; // Get the value from the input field
                    const booking_number = bookingInfo.booking_number; // Assuming booking number is available here
                    console.log(inputValue);
                    const inputValueAsNumber = parseInt(inputValue);
                    if (inputValueAsNumber === supplierRedemptionCode) {
                      containerNotVerifiedDiv.innerHTML = "";
                      // Check if the input value matches the supplier redemption code
                      // Update the booking status to redeemed and set the redemption timestamp
                      const { data, error } = await _supabase
                        .from("Bookings")
                        .update({
                          is_redeemed: true,
                          redemption_timestamp: new Date().toISOString(), // Set the redemption timestamp to the current time
                        })
                        .eq("booking_number", booking_number);

                      if (error) {
                        console.error(
                          "Error updating booking status:",
                          error.message
                        );
                      } else {
                        console.log("Booking status updated successfully");

                        containerModal.style.display = "none";

                        const containerVerifiedDiv =
                          document.createElement("div");
                        containerVerifiedDiv.classList.add(
                          "container-verified"
                        );
                        containerVerifiedDiv.style.display = "flex";
                        modalContentDiv2.appendChild(containerVerifiedDiv);

                        const headingVerifiedDiv = document.createElement("p");
                        headingVerifiedDiv.classList.add(
                          "heading-medium",
                          "text-weight-medium"
                        );
                        headingVerifiedDiv.textContent = "Succesfully Redeemed";
                        headingVerifiedDiv.style.display = "flex";
                        containerVerifiedDiv.appendChild(headingVerifiedDiv);
                      }

                      const verifiedSVG = document.createElement("div");
                      verifiedSVG.classList.add("verified-svg");
                      verifiedSVG.style.display = "flex";
                      modalContentDiv2.appendChild(verifiedSVG);

                      // Create the SVG element
                      const svgElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                      );
                      svgElement.setAttribute(
                        "xmlns",
                        "http://www.w3.org/2000/svg"
                      );
                      svgElement.setAttribute("viewBox", "0 0 512 512");
                      svgElement.setAttribute("fill", "#00aeef");
                      svgElement.setAttribute("width", "10rem");
                      svgElement.setAttribute("height", "10rem");
                      svgElement.style.marginLeft = "auto";
                      svgElement.style.marginRight = "auto";

                      // Create the path element inside the SVG
                      const pathElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                      );
                      pathElement.setAttribute(
                        "d",
                        "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      );

                      // Append the path element to the SVG element
                      svgElement.appendChild(pathElement);
                      verifiedSVG.appendChild(svgElement);
                    } else {
                      // Log an error if the input value does not match the supplier redemption code
                      console.error(
                        "Error: The redemption code does not match"
                      );
                      (containerNotVerifiedDiv.innerHTML = ""),
                        containerNotVerifiedDiv.classList.add(
                          "container-verified"
                        );
                      containerNotVerifiedDiv.style.display = "flex";
                      modalContentDiv2.appendChild(containerNotVerifiedDiv);

                      const headingNotVerifiedDiv = document.createElement("p");
                      headingNotVerifiedDiv.classList.add(
                        "heading-medium",
                        "text-weight-medium"
                      );
                      headingNotVerifiedDiv.textContent = "Error: Invalid Code";
                      headingNotVerifiedDiv.style.display = "flex";
                      containerNotVerifiedDiv.appendChild(
                        headingNotVerifiedDiv
                      );
                      headingNotVerifiedDiv.style.color = "red";
                    }
                  });

                  // Append the input field and button to the form
                  modalForm.appendChild(inputField);
                  modalForm.appendChild(modalFormPara);
                  modalForm.appendChild(button);

                  // Append the form to a container element in your HTML
                  const containerModal = document.createElement("div");
                  containerModal.classList.add("modal-form-block");

                  const modalCloseDiv = document.createElement("div");
                  modalCloseDiv.classList.add("fs_modal-2_close");

                  // Create the SVG element
                  const svgElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                  );
                  svgElement.setAttribute(
                    "xmlns",
                    "http://www.w3.org/2000/svg"
                  );
                  svgElement.setAttribute("aria-hidden", "true");
                  svgElement.setAttribute("viewBox", "0 0 24 24");
                  svgElement.classList.add("fs_modal-2_close-icon");

                  // Create the path element for the SVG
                  const pathElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                  );
                  pathElement.setAttribute("fill", "currentColor");
                  pathElement.setAttribute(
                    "d",
                    "M14.5,12l9-9c0.7-0.7,0.7-1.8,0-2.5c-0.7-0.7-1.8-0.7-2.5,0l-9,9l-9-9c-0.7-0.7-1.8-0.7-2.5,0 c-0.7,0.7-0.7,1.8,0,2.5l9,9l-9,9c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.8,0.7,2.5,0l9-9l9,9c0.7,0.7,1.8,0.7,2.5,0 c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"
                  );

                  // Append the path element to the SVG element
                  svgElement.appendChild(pathElement);

                  // Append the SVG element to the modalCloseDiv
                  modalCloseDiv.appendChild(svgElement);

                  // Add event listener to the modalCloseDiv
                  modalCloseDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  coverDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  // Append the modalCloseDiv to the modalBooking
                  modalContentDiv.appendChild(modalCloseDiv);

                  // Append the popup to the document body
                  fsModalDiv.appendChild(modalBooking);

                  modalBooking.appendChild(coverDiv);
                  modalBooking.appendChild(wrapperDiv);

                  wrapperDiv.appendChild(modalContentDiv);
                  wrapperDiv.appendChild(modalContentDiv2);
                  containerModal.appendChild(modalForm);
                  modalContentDiv2.appendChild(containerModal);
                } else if (bookingInfo.is_redeemed === null) {
                  console.log("booking redeemed is null");

                  const bookingJSON = JSON.parse(bookingInfo.booking_json);
                  console.log(bookingJSON);
                  // Create a new div for the popup/modal
                  const modalBooking = document.createElement("div");
                  modalBooking.classList.add("modal-booking");
                  modalBooking.innerHTML = "";
                  const coverDiv = document.createElement("div");
                  coverDiv.classList.add("fs_modal-2_cover");

                  const wrapperDiv = document.createElement("div");
                  wrapperDiv.classList.add("fs_modal-2_wrapper");

                  const modalContentDiv = document.createElement("div");
                  modalContentDiv.classList.add("fs_modal-2_content");

                  const modalContentDiv2 = document.createElement("div");
                  modalContentDiv2.classList.add(
                    "fs_modal-2_content",
                    "bottom"
                  );

                  const containerNotVerifiedDiv = document.createElement("div");

                  const modalHeading = document.createElement("h1");
                  modalHeading.classList.add("heading-medium");
                  modalHeading.textContent = item.experience_name;
                  modalContentDiv.appendChild(modalHeading);

                  function formatOrderTotal(total, currency) {
                    let formattedTotal = total.toFixed(2); // Round total to 2 decimal places

                    // Add currency symbol based on currency
                    switch (currency.toLowerCase()) {
                      case "usd":
                      case "cad":
                        formattedTotal = "$" + formattedTotal;
                        break;
                      // Add cases for other currencies as needed
                      default:
                      // If currency is not USD or CAD, do nothing with the symbol
                    }

                    return formattedTotal;
                  }

                  // Get the order total and currency from the bookingInfo object
                  const orderTotal = bookingInfo.order_total;
                  const currency = bookingInfo.currency;

                  // Create a paragraph element for the order total
                  const orderTotalPara = document.createElement("p");
                  orderTotalPara.classList.add("text-ticket");

                  // Format the order total with currency symbol
                  const formattedTotal = formatOrderTotal(orderTotal, currency);

                  // Set the content of the paragraph element
                  orderTotalPara.textContent = `Order Total: ${formattedTotal} ${currency}`;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(orderTotalPara);

                  // Parse the booking JSON string to extract pax mix information
                  const bookingJson = JSON.parse(bookingInfo.booking_json);
                  const paxMix = bookingJson.paxMix;

                  // Create a paragraph element for the pax mix
                  const paxMixPara = document.createElement("p");
                  paxMixPara.classList.add("text-ticket");

                  // Format the pax mix information
                  let paxMixText = "Tickets: ";
                  paxMix.forEach((ageBand, index) => {
                    const capitalizedAgeBand =
                      ageBand.ageBand.charAt(0).toUpperCase() +
                      ageBand.ageBand.slice(1).toLowerCase();
                    paxMixText += `${ageBand.numberOfTravelers} x ${capitalizedAgeBand}`;
                    if (index < paxMix.length - 1) {
                      paxMixText += ", "; // Add comma if there are more age bands
                    }
                  });

                  // Set the content of the paragraph element
                  paxMixPara.textContent = paxMixText;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(paxMixPara);

                  const bookingNumberPara = document.createElement("p");
                  bookingNumberPara.classList.add("text-ticket");
                  bookingNumberPara.textContent = `Booking Number: ${bookingInfo.booking_number}`;
                  modalContentDiv.appendChild(bookingNumberPara);

                  const bookingDatePara = document.createElement("p");
                  bookingDatePara.classList.add("text-ticket");
                  bookingDatePara.textContent = `Experience Date: ${bookingInfo.activity_start_date}`;
                  modalContentDiv.appendChild(bookingDatePara);

                  const addressPara = document.createElement("p");
                  addressPara.classList.add("text-ticket");
                  addressPara.textContent = "Add Address";
                  modalContentDiv.appendChild(addressPara);

                  // Create the form element
                  const modalForm = document.createElement("form");
                  modalForm.classList.add("modal-form");

                  // Create the input field
                  const inputField = document.createElement("input");
                  inputField.classList.add("input_field", "align-center");
                  inputField.type = "text"; // Set input type to text
                  inputField.placeholder = "Supplier Redemption Code"; // Set placeholder text

                  const modalFormPara = document.createElement("p");
                  modalFormPara.classList.add(
                    "text-ticket",
                    "text-align-center",
                    "para-small"
                  );
                  modalFormPara.textContent =
                    "Provided by the experience host.";

                  // Create the button
                  const button = document.createElement("button");
                  button.classList.add("button", "full-width");
                  button.type = "submit"; // Set button type to submit
                  button.textContent = "Redeem"; // Set button text

                  const supplierID = bookingInfo.associated_supplier;
                  console.log("Supplier ID:", supplierID);
                  // Fetch supplier redemption code based on associated_supplier

                  const { data: supplierData, error: supplierError } =
                    await _supabase
                      .from("Suppliers")
                      .select("*")
                      .eq("airtable_id", supplierID)
                      .single();

                  if (supplierError) {
                    throw supplierError;
                  }
                  console.log(supplierData);
                  const supplierRedemptionCode =
                    supplierData.supplier_redemption_code;
                  console.log(
                    "Supplier Redemption Code:",
                    supplierRedemptionCode
                  );

                  // Add an event listener to the form submission
                  modalForm.addEventListener("submit", async function (event) {
                    event.preventDefault(); // Prevent the default form submission behavior
                    const inputValue = inputField.value; // Get the value from the input field
                    const booking_number = bookingInfo.booking_number; // Assuming booking number is available here
                    console.log(inputValue);
                    const inputValueAsNumber = parseInt(inputValue);
                    if (inputValueAsNumber === supplierRedemptionCode) {
                      containerNotVerifiedDiv.innerHTML = "";
                      // Check if the input value matches the supplier redemption code
                      // Update the booking status to redeemed and set the redemption timestamp
                      const { data, error } = await _supabase
                        .from("Bookings")
                        .update({
                          is_redeemed: true,
                          redemption_timestamp: new Date().toISOString(), // Set the redemption timestamp to the current time
                        })
                        .eq("booking_number", booking_number);

                      if (error) {
                        console.error(
                          "Error updating booking status:",
                          error.message
                        );
                      } else {
                        console.log("Booking status updated successfully");

                        containerModal.style.display = "none";

                        const containerVerifiedDiv =
                          document.createElement("div");
                        containerVerifiedDiv.classList.add(
                          "container-verified"
                        );
                        containerVerifiedDiv.style.display = "flex";
                        modalContentDiv2.appendChild(containerVerifiedDiv);

                        const headingVerifiedDiv = document.createElement("p");
                        headingVerifiedDiv.classList.add(
                          "heading-medium",
                          "text-weight-medium"
                        );
                        headingVerifiedDiv.textContent = "Succesfully Redeemed";
                        headingVerifiedDiv.style.display = "flex";
                        containerVerifiedDiv.appendChild(headingVerifiedDiv);
                      }

                      const verifiedSVG = document.createElement("div");
                      verifiedSVG.classList.add("verified-svg");
                      verifiedSVG.style.display = "flex";
                      modalContentDiv2.appendChild(verifiedSVG);

                      // Create the SVG element
                      const svgElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                      );
                      svgElement.setAttribute(
                        "xmlns",
                        "http://www.w3.org/2000/svg"
                      );
                      svgElement.setAttribute("viewBox", "0 0 512 512");
                      svgElement.setAttribute("fill", "#00aeef");
                      svgElement.setAttribute("width", "10rem");
                      svgElement.setAttribute("height", "10rem");
                      svgElement.style.marginLeft = "auto";
                      svgElement.style.marginRight = "auto";

                      // Create the path element inside the SVG
                      const pathElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                      );
                      pathElement.setAttribute(
                        "d",
                        "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      );

                      // Append the path element to the SVG element
                      svgElement.appendChild(pathElement);
                      verifiedSVG.appendChild(svgElement);
                    } else {
                      // Log an error if the input value does not match the supplier redemption code
                      console.error(
                        "Error: The redemption code does not match"
                      );
                      (containerNotVerifiedDiv.innerHTML = ""),
                        containerNotVerifiedDiv.classList.add(
                          "container-verified"
                        );
                      containerNotVerifiedDiv.style.display = "flex";
                      modalContentDiv2.appendChild(containerNotVerifiedDiv);

                      const headingNotVerifiedDiv = document.createElement("p");
                      headingNotVerifiedDiv.classList.add(
                        "heading-medium",
                        "text-weight-medium"
                      );
                      headingNotVerifiedDiv.textContent = "Error: Invalid Code";
                      headingNotVerifiedDiv.style.display = "flex";
                      containerNotVerifiedDiv.appendChild(
                        headingNotVerifiedDiv
                      );
                      headingNotVerifiedDiv.style.color = "red";
                    }
                  });

                  // Append the input field and button to the form
                  modalForm.appendChild(inputField);
                  modalForm.appendChild(modalFormPara);
                  modalForm.appendChild(button);

                  // Append the form to a container element in your HTML
                  const containerModal = document.createElement("div");
                  containerModal.classList.add("modal-form-block");

                  const modalCloseDiv = document.createElement("div");
                  modalCloseDiv.classList.add("fs_modal-2_close");

                  // Create the SVG element
                  const svgElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                  );
                  svgElement.setAttribute(
                    "xmlns",
                    "http://www.w3.org/2000/svg"
                  );
                  svgElement.setAttribute("aria-hidden", "true");
                  svgElement.setAttribute("viewBox", "0 0 24 24");
                  svgElement.classList.add("fs_modal-2_close-icon");

                  // Create the path element for the SVG
                  const pathElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                  );
                  pathElement.setAttribute("fill", "currentColor");
                  pathElement.setAttribute(
                    "d",
                    "M14.5,12l9-9c0.7-0.7,0.7-1.8,0-2.5c-0.7-0.7-1.8-0.7-2.5,0l-9,9l-9-9c-0.7-0.7-1.8-0.7-2.5,0 c-0.7,0.7-0.7,1.8,0,2.5l9,9l-9,9c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.8,0.7,2.5,0l9-9l9,9c0.7,0.7,1.8,0.7,2.5,0 c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"
                  );

                  // Append the path element to the SVG element
                  svgElement.appendChild(pathElement);

                  // Append the SVG element to the modalCloseDiv
                  modalCloseDiv.appendChild(svgElement);

                  // Add event listener to the modalCloseDiv
                  modalCloseDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  coverDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  // Append the modalCloseDiv to the modalBooking
                  modalContentDiv.appendChild(modalCloseDiv);

                  // Append the popup to the document body
                  fsModalDiv.appendChild(modalBooking);

                  modalBooking.appendChild(coverDiv);
                  modalBooking.appendChild(wrapperDiv);

                  wrapperDiv.appendChild(modalContentDiv);
                  wrapperDiv.appendChild(modalContentDiv2);
                  containerModal.appendChild(modalForm);
                  modalContentDiv2.appendChild(containerModal);
                } else {
                  console.log("booking has been redeemed");
                  const bookingJSON = JSON.parse(bookingInfo.booking_json);
                  console.log(bookingJSON);
                  // Create a new div for the popup/modal
                  const modalBooking = document.createElement("div");
                  modalBooking.classList.add("modal-booking");
                  modalBooking.innerHTML = "";
                  const coverDiv = document.createElement("div");
                  coverDiv.classList.add("fs_modal-2_cover");

                  const wrapperDiv = document.createElement("div");
                  wrapperDiv.classList.add("fs_modal-2_wrapper");

                  const modalContentDiv = document.createElement("div");
                  modalContentDiv.classList.add("fs_modal-2_content");

                  const modalContentDiv2 = document.createElement("div");
                  modalContentDiv2.classList.add(
                    "fs_modal-2_content",
                    "bottom"
                  );

                  const modalHeading = document.createElement("h1");
                  modalHeading.classList.add("heading-medium");
                  modalHeading.textContent = item.experience_name;
                  modalContentDiv.appendChild(modalHeading);

                  function formatOrderTotal(total, currency) {
                    let formattedTotal = total.toFixed(2); // Round total to 2 decimal places

                    // Add currency symbol based on currency
                    switch (currency.toLowerCase()) {
                      case "usd":
                      case "cad":
                        formattedTotal = "$" + formattedTotal;
                        break;
                      // Add cases for other currencies as needed
                      default:
                      // If currency is not USD or CAD, do nothing with the symbol
                    }

                    return formattedTotal;
                  }

                  // Get the order total and currency from the bookingInfo object
                  const orderTotal = bookingInfo.order_total;
                  const currency = bookingInfo.currency;

                  // Create a paragraph element for the order total
                  const orderTotalPara = document.createElement("p");
                  orderTotalPara.classList.add("text-ticket");

                  // Format the order total with currency symbol
                  const formattedTotal = formatOrderTotal(orderTotal, currency);

                  // Set the content of the paragraph element
                  orderTotalPara.textContent = `Order Total: ${formattedTotal} ${currency}`;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(orderTotalPara);

                  // Parse the booking JSON string to extract pax mix information
                  const bookingJson = JSON.parse(bookingInfo.booking_json);
                  const paxMix = bookingJson.paxMix;

                  // Create a paragraph element for the pax mix
                  const paxMixPara = document.createElement("p");
                  paxMixPara.classList.add("text-ticket");

                  // Format the pax mix information
                  let paxMixText = "Tickets: ";
                  paxMix.forEach((ageBand, index) => {
                    const capitalizedAgeBand =
                      ageBand.ageBand.charAt(0).toUpperCase() +
                      ageBand.ageBand.slice(1).toLowerCase();
                    paxMixText += `${ageBand.numberOfTravelers} x ${capitalizedAgeBand}`;
                    if (index < paxMix.length - 1) {
                      paxMixText += ", "; // Add comma if there are more age bands
                    }
                  });

                  // Set the content of the paragraph element
                  paxMixPara.textContent = paxMixText;

                  // Append the paragraph element to the modal content div
                  modalContentDiv.appendChild(paxMixPara);

                  const bookingNumberPara = document.createElement("p");
                  bookingNumberPara.classList.add("text-ticket");
                  bookingNumberPara.textContent = `Booking Number: ${bookingInfo.booking_number}`;
                  modalContentDiv.appendChild(bookingNumberPara);

                  const bookingDatePara = document.createElement("p");
                  bookingDatePara.classList.add("text-ticket");
                  bookingDatePara.textContent = `Experience Date: ${bookingInfo.activity_start_date}`;
                  modalContentDiv.appendChild(bookingDatePara);

                  const addressPara = document.createElement("p");
                  addressPara.classList.add("text-ticket");
                  addressPara.textContent = "Add Address";
                  modalContentDiv.appendChild(addressPara);

                  const containerVerifiedDiv = document.createElement("div");
                  containerVerifiedDiv.classList.add("container-verified");
                  containerVerifiedDiv.style.display = "flex";
                  modalContentDiv2.appendChild(containerVerifiedDiv);

                  const headingVerifiedDiv = document.createElement("p");
                  headingVerifiedDiv.classList.add("heading-medium");
                  headingVerifiedDiv.textContent = "Succesfully Redeemed";
                  headingVerifiedDiv.style.display = "flex";
                  containerVerifiedDiv.appendChild(headingVerifiedDiv);

                  const verifiedSVG = document.createElement("div");
                  verifiedSVG.classList.add("verified-svg");
                  verifiedSVG.style.display = "flex";
                  modalContentDiv2.appendChild(verifiedSVG);

                  // Create the SVG element
                  const svgElement2 = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                  );
                  svgElement2.setAttribute(
                    "xmlns",
                    "http://www.w3.org/2000/svg"
                  );
                  svgElement2.setAttribute("viewBox", "0 0 512 512");
                  svgElement2.setAttribute("fill", "#00aeef");
                  svgElement2.setAttribute("width", "10rem");
                  svgElement2.setAttribute("height", "10rem");
                  svgElement2.style.marginLeft = "auto";
                  svgElement2.style.marginRight = "auto";

                  // Create the path element inside the SVG
                  const pathElement2 = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                  );
                  pathElement2.setAttribute(
                    "d",
                    "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  );

                  // Append the path element to the SVG element
                  svgElement2.appendChild(pathElement2);
                  verifiedSVG.appendChild(svgElement2);

                  // Append the form to a container element in your HTML
                  const containerModal = document.createElement("div");
                  containerModal.classList.add("modal-form-block");

                  const modalCloseDiv = document.createElement("div");
                  modalCloseDiv.classList.add("fs_modal-2_close");

                  // Create the SVG element
                  const svgElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                  );
                  svgElement.setAttribute(
                    "xmlns",
                    "http://www.w3.org/2000/svg"
                  );
                  svgElement.setAttribute("aria-hidden", "true");
                  svgElement.setAttribute("viewBox", "0 0 24 24");
                  svgElement.classList.add("fs_modal-2_close-icon");

                  // Create the path element for the SVG
                  const pathElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                  );
                  pathElement.setAttribute("fill", "currentColor");
                  pathElement.setAttribute(
                    "d",
                    "M14.5,12l9-9c0.7-0.7,0.7-1.8,0-2.5c-0.7-0.7-1.8-0.7-2.5,0l-9,9l-9-9c-0.7-0.7-1.8-0.7-2.5,0 c-0.7,0.7-0.7,1.8,0,2.5l9,9l-9,9c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.8,0.7,2.5,0l9-9l9,9c0.7,0.7,1.8,0.7,2.5,0 c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"
                  );

                  // Append the path element to the SVG element
                  svgElement.appendChild(pathElement);

                  // Append the SVG element to the modalCloseDiv
                  modalCloseDiv.appendChild(svgElement);

                  // Add event listener to the modalCloseDiv
                  modalCloseDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  coverDiv.addEventListener("click", function () {
                    // Set modalBooking display to none
                    modalBooking.style.display = "none";
                    printBookingNumber();
                  });

                  // Append the modalCloseDiv to the modalBooking
                  modalContentDiv.appendChild(modalCloseDiv);

                  // Append the popup to the document body
                  fsModalDiv.appendChild(modalBooking);

                  modalBooking.appendChild(coverDiv);
                  modalBooking.appendChild(wrapperDiv);

                  wrapperDiv.appendChild(modalContentDiv);
                  wrapperDiv.appendChild(modalContentDiv2);
                  modalContentDiv2.appendChild(containerModal);

                  //end of redeemed true
                }

                // end of the code for the modal booking
              } else {
                console.log("No booking info found.");
              }
            } catch (error) {
              console.error("Error fetching booking info:", error.message);
            }
          });

          const fsModalCompDiv = document.createElement("div");
          fsModalCompDiv.classList.add("fs_modal-2_modal_show");

          const experienceNameDiv = document.createElement("div");
          experienceNameDiv.classList.add("table_icon");

          const bookingTextDiv = document.createElement("div");
          bookingTextDiv.classList.add("bookings-text");

          // Create the div for the embed icon with classes 'embed-icon-booking' and 'ticket'
          const embedIconDiv = document.createElement("div");
          embedIconDiv.classList.add("embed-icon-booking", "ticket");

          // Create the SVG element
          const svgElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          svgElement.setAttribute("viewBox", "0 0 576 512");
          svgElement.setAttribute("width", "30");
          svgElement.setAttribute("height", "25");
          svgElement.classList.add("fs_modal-2_close-icon");

          // Create the path element for the SVG
          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute(
            "d",
            "M64 64C28.7 64 0 92.7 0 128v66c0 7.3 4.9 13.7 12 15.5c20.7 5.3 36 24.1 36 46.5s-15.3 41.2-36 46.5C4.9 304.3 0 310.7 0 318v66c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V318c0-7.3-4.9-13.7-12-15.5c-20.7-5.3-36-24.1-36-46.5s15.3-41.2 36-46.5c7.1-1.8 12-8.2 12-15.5V128c0-35.3-28.7-64-64-64H64zM32 128c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32v54.7c-28.2 12.3-48 40.5-48 73.3s19.8 61 48 73.3V384c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V329.3C60.2 317 80 288.8 80 256s-19.8-61-48-73.3V128zm128 64H416V320H160V192zm-32 0V320c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32z"
          );

          // Append the path element to the SVG element
          svgElement.appendChild(pathElement);

          // Append the SVG element to the embed icon div
          //embedIconDiv.appendChild(svgElement);

          // Truncate experience name to 20 characters
          let truncatedName = item.experience_name;
          if (truncatedName.length > 30) {
            truncatedName = truncatedName.substring(0, 30) + "..";
          }

          // Create paragraph elements for experience name and booking number
          const experienceNamePara = document.createElement("p");
          experienceNamePara.classList.add("mb-5", "date");
          experienceNamePara.textContent = truncatedName;

          // Create the paragraph element for redeemed status
          const redeemedPara = document.createElement("p");
          redeemedPara.classList.add("text-redeemed");

          // Check if the booking is redeemed
          if (item.is_redeemed === true) {
            redeemedPara.textContent = "Redeemed";
            redeemedPara.classList.add("text-redeemed", "grey"); // Add class to change text color to grey
          } else {
            redeemedPara.textContent = "Not Redeemed";
            redeemedPara.classList.add("text-redeemed");
          }

          const bookingDatePara = document.createElement("p");
          bookingDatePara.classList.add("mb-5", "date");
          bookingDatePara.textContent = item.activity_start_date;

          const bookingNumberPara = document.createElement("p");
          bookingNumberPara.classList.add("mb-5", "date");
          bookingNumberPara.textContent = item.booking_number;

          //Append paragraph elements to the div
          bookingTextDiv.appendChild(experienceNamePara); // Append experience name directly to experienceDiv

          bookingDateDiv.appendChild(bookingDatePara);
          progressDiv.appendChild(bookingNumberPara);
          progressDiv2.appendChild(redeemedPara);
          progressDiv3.appendChild(modalButton);

          tablePDiv.appendChild(experienceNamePara);

          tableIconDiv.appendChild(embedIconDiv);
          tableIconDiv.appendChild(tablePDiv);

          tableLineDiv.appendChild(tableIconDiv);
          tableLineDiv.appendChild(bookingDateDiv);
          tableLineDiv.appendChild(progressDiv);
          tableLineDiv.appendChild(progressDiv2);
          tableLineDiv.appendChild(progressDiv3);

          fsModalCompDiv.appendChild(tableLineDiv);
          fsModalDiv.appendChild(fsModalCompDiv);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    printBookingNumber();
  }

  signInAndPrintBookingNumber();
});
