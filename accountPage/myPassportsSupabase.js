document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("modal-voucher").style.display = "none";
  async function signInAndPrintBookingNumber() {
    // Function to fetch and render bookings
    async function fetchAndRenderBookings() {
      try {
        let { data, error } = await _supabase
          .from("Bookings")
          .select("experience_name,booking_number,activity_start_date,is_redeemed,redemption_end_date,offer_type")
          .eq("associated_user_memberstack_id", msId);

        if (error) {
          throw error;
        }

        data.sort((a, b) => {
          const dateA = a.activity_start_date ? new Date(a.activity_start_date) : new Date(a.redemption_end_date);
          const dateB = b.activity_start_date ? new Date(b.activity_start_date) : new Date(b.redemption_end_date);
          const dateComparison = dateA - dateB;
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return a.experience_name.localeCompare(b.experience_name);
        });

        const tableBody = document.querySelector(".table_body");
        tableBody.innerHTML = "";

        data.forEach((booking, index) => {
          const row = document.createElement("tr");
          row.className = "table_row";

          const experienceName = `<td class="table_cell"><div class="table_cell_content"><div class="table_text-small">${booking.experience_name}</div></div></td>`;
          const activityStartDate = `<td class="table_cell"><div class="table_cell_content"><div class="table_text-small">${
            booking.activity_start_date
              ? new Date(booking.activity_start_date).toLocaleDateString()
              : booking.redemption_end_date
              ? new Date(booking.redemption_end_date).toLocaleDateString()
              : "N/A"
          }</div></div></td>`;
          const bookingNumber = `<td class="table_cell is-price text-color-red"><div class="table_text-small">${booking.booking_number}</div></td>`;
          const status = `<td class="table_cell"><div class="table_text-small">${
            booking.is_redeemed ? "Redeemed" : "Not Redeemed"
          }</div></td>`;
          const action = `
            <td class="table_cell is-action">
              <button class="button full-width w-inline-block open-modal" data-index="${index}">
                <p class="text-size-small text-color-white">View Offer</p>
              </button>
            </td>`;

          row.innerHTML = `${experienceName}${activityStartDate}${bookingNumber}${status}${action}`;
          tableBody.appendChild(row);
        });

        document.querySelectorAll(".open-modal").forEach((button) => {
          button.addEventListener("click", (event) => {
            const index = event.target.closest(".open-modal").getAttribute("data-index");
            openModal(data[index]);
          });
        });
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    }

    // Function to open the modal and populate it with booking data
    async function openModal(booking) {
      try {
        const { data, error } = await _supabase
          .from("Bookings")
          .select("*")
          .eq("booking_number", booking.booking_number);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const bookingData = data[0];
          console.log(bookingData);

          if (bookingData.offer_type === "[Travel] Wholesale - Viator") {
            console.log("[Travel] Wholesale - Viator");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Travel] Wholesale - LIVN") {
            console.log("[Travel] Wholesale - LIVN");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Travel] Direct - Free Sell") {
            console.log("[Travel] Direct - Free Sell Activities");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Travel] Direct - Scan QR Code") {
            console.log("[Travel] Direct - Scan QR Code");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Travel] Direct - Referral URL") {
            console.log("[Travel] Direct - Referral URL");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Travel] Direct - LIVN Direct") {
            console.log("[Travel] Direct - LIVN Direct");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[F&B] Direct - Prepaid Voucher") {
            console.log("[F&B] Direct - Prepaid Voucher");

            if (bookingData.is_redeemed) {
              document.getElementById("modal-voucher").style.display = "flex";
              document.getElementById("offer-redeemed").style.display = "flex";
              document.getElementById("step1").style.display = "flex";
              document.getElementById("step2").style.display = "none";
              document.getElementById("step2-fb-prepaid").style.display = "none";
              document.getElementById("button-offer-redeem").style.display = "none";
              document.getElementById("modal-success").style.display = "none";
              document.getElementById("modal-back").style.display = "none";

              document.getElementById("offer-name").textContent = `${bookingData.experience_name}`;
              document.getElementById("offer-name2").textContent = `${bookingData.experience_name}`;
              document.getElementById("offer-name3").textContent = `${bookingData.experience_name}`;
              document.getElementById(
                "offer-booking-number"
              ).textContent = `Booking Number: ${bookingData.booking_number}`;

              let dateText = "N/A";
              if (bookingData.activity_start_date) {
                dateText = new Date(bookingData.activity_start_date).toLocaleDateString();
              } else if (bookingData.redemption_end_date) {
                dateText = new Date(bookingData.redemption_end_date).toLocaleDateString();
              }
              document.getElementById("offer-date").textContent = `Date: ${dateText}`;

              function getCurrencySymbol(currencyCode) {
                const currencySymbols = {
                  USD: "$",
                  EUR: "€",
                  GBP: "£",
                  JPY: "¥",
                  AUD: "A$",
                  CAD: "C$",
                  ZAR: "R",
                };
                return currencySymbols[currencyCode] || currencyCode;
              }

              const currencySymbol = getCurrencySymbol(bookingData.currency);
              const formattedAmount =
                bookingData.order_total != null
                  ? new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: bookingData.currency,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bookingData.order_total)
                  : "N/A";

              document.getElementById("offer-amount").textContent = `Amount Paid: ${formattedAmount}`;

              return;
            } else {
              console.log("booking not redeemed");
              document.getElementById("offer-redeemed").style.display = "none";
            }

            document.getElementById("offer-name").textContent = `${bookingData.experience_name}`;
            document.getElementById("offer-name2").textContent = `${bookingData.experience_name}`;
            document.getElementById("offer-name3").textContent = `${bookingData.experience_name}`;
            document.getElementById(
              "offer-booking-number"
            ).textContent = `Booking Number: ${bookingData.booking_number}`;

            let dateText = "N/A";
            if (bookingData.activity_start_date) {
              dateText = new Date(bookingData.activity_start_date).toLocaleDateString();
            } else if (bookingData.redemption_end_date) {
              dateText = new Date(bookingData.redemption_end_date).toLocaleDateString();
            }
            document.getElementById("offer-date").textContent = `Date: ${dateText}`;

            function getCurrencySymbol(currencyCode) {
              const currencySymbols = {
                USD: "$",
                EUR: "€",
                GBP: "£",
                JPY: "¥",
                AUD: "A$",
                CAD: "C$",
                ZAR: "R",
              };
              return currencySymbols[currencyCode] || currencyCode;
            }

            const currencySymbol = getCurrencySymbol(bookingData.currency);
            const formattedAmount =
              bookingData.order_total != null
                ? new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: bookingData.currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(bookingData.order_total)
                : "N/A";

            document.getElementById("offer-amount").textContent = `Amount Paid: ${formattedAmount}`;

            document.getElementById("modal-voucher").style.display = "flex";
            document.getElementById("step2").style.display = "none";
            document.getElementById("step2-fb-prepaid").style.display = "none";
            document.getElementById("modal-success").style.display = "none";
            document.getElementById("modal-error").style.display = "none";
            document.getElementById("modal-back").style.display = "none";
            document.getElementById("button-offer-redeem").style.display = "flex";
            document.getElementById("button-offer-redeem").addEventListener("click", () => {
              document.getElementById("step1").style.display = "none";
              document.getElementById("step2-fb-prepaid").style.display = "flex";
              document.getElementById("modal-back").style.display = "flex";
              document.getElementById("modal-error").style.display = "none";
              document.getElementById("valueInput").value = "";
              document.getElementById("guestInput").value = "";
              document.getElementById("codeInput2").value = "";
            });
            const supplierID = bookingData.associated_supplier;
            console.log("Supplier ID:", supplierID);
            const { data: supplierData, error: supplierError } = await _supabase
              .from("Suppliers")
              .select("*")
              .eq("airtable_id", supplierID)
              .single();

            if (supplierError) {
              throw supplierError;
            }
            console.log(supplierData);
            const supplierRedemptionCode = supplierData.supplier_redemption_code;
            console.log("Supplier Redemption Code:", supplierRedemptionCode);

            document.getElementById("modal-close").addEventListener("click", () => {
              document.getElementById("modal-voucher").style.display = "none";
              document.getElementById("offer-redeemed").style.display = "none";
              document.getElementById("step1").style.display = "flex";
              document.getElementById("step2-fb-prepaid").style.display = "none";
            });

            //variable set in supabaseAuth.js/ set for webhook
            const userStripeID = userData.customFields["stripe-customer-id"];
            document.getElementById("verificationForm2").addEventListener("submit", async function (event) {
              event.preventDefault();

              // Get values from custom inputs
              const offerValue = document.getElementById("valueInput").value;
              const guestValue = document.getElementById("guestInput").value;
              const inputValue = document.getElementById("codeInput2").value;
              const inputValueAsNumber = parseInt(inputValue);

              const customerId = userStripeID;
              const offerId = bookingData.booking_number;
              const programId = bookingData.associated_program;

              console.log(offerValue);
              console.log(guestValue);
              console.log(customerId);
              console.log(offerId);
              console.log(programId);

              // Construct the object with offer redemption fields
              const redemptionData = {
                customerId: customerId,
                offerId: offerId,
                offerValue: offerValue,
                paxCount: guestValue,
                programId: programId,
              };
              console.log(redemptionData);

              // Example of sending redemptionData to a webhook
              try {
                const response = await fetch("https://hook.us1.make.com/9dvcpus9w65mv0m4oxhywxuwnaih6fkn", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(redemptionData),
                });

                if (!response.ok) {
                  throw new Error("Failed to send data to webhook");
                }

                // Handle success scenario after sending webhook
                console.log("Redemption data sent successfully to webhook:", redemptionData);

                const supplierRedemptionCode = await getSupplierRedemptionCode();

                if (inputValueAsNumber === supplierRedemptionCode) {
                  // Update booking status example (remove or modify based on your actual logic)
                  const booking_number = bookingData.booking_number;
                  const { data, error } = await _supabase
                    .from("Bookings")
                    .update({
                      is_redeemed: true,
                      redemption_timestamp: new Date().toISOString(),
                    })
                    .eq("booking_number", booking_number);

                  if (error) {
                    console.error("Error updating booking status:", error.message);
                    document.getElementById("modal-error").style.display = "flex";
                  } else {
                    console.log("Booking status updated successfully");
                    console.log("Response data:", data);
                    document.getElementById("modal-success").style.display = "flex";
                    document.getElementById("step2-fb-prepaid").style.display = "none";
                    document.getElementById("modal-back").style.display = "none";

                    await fetchAndRenderBookings();

                    console.log("Form inputs reset successfully");
                  }
                } else {
                  console.log("Redemption code does not match");
                  document.getElementById("modal-error").style.display = "flex";
                }
              } catch (error) {
                console.error("Error sending redemption data to webhook:", error);
                document.getElementById("modal-error").style.display = "flex";
              }
            });

            async function getSupplierRedemptionCode() {
              const supplierRedemptionCode = supplierData.supplier_redemption_code;
              console.log("Supplier Redemption Code:", supplierRedemptionCode);
              return supplierRedemptionCode; // Make sure to return the code
            }
          } else if (bookingData.offer_type === "[F&B] Direct - Referral URL") {
            console.log("[F&B] Direct - Referral URL");
            if (bookingData.is_redeemed) {
              document.getElementById("modal-voucher").style.display = "flex";
              document.getElementById("offer-redeemed").style.display = "flex";
              document.getElementById("step1").style.display = "flex";
              document.getElementById("button-offer-redeem").style.display = "none";
              document.getElementById("modal-success").style.display = "none";
              document.getElementById("modal-back").style.display = "none";

              document.getElementById("offer-name").textContent = `${bookingData.experience_name}`;
              document.getElementById("offer-name2").textContent = `${bookingData.experience_name}`;
              document.getElementById("offer-name3").textContent = `${bookingData.experience_name}`;
              document.getElementById(
                "offer-booking-number"
              ).textContent = `Booking Number: ${bookingData.booking_number}`;

              let dateText = "N/A";
              if (bookingData.activity_start_date) {
                dateText = new Date(bookingData.activity_start_date).toLocaleDateString();
              } else if (bookingData.redemption_end_date) {
                dateText = new Date(bookingData.redemption_end_date).toLocaleDateString();
              }
              document.getElementById("offer-date").textContent = `Date: ${dateText}`;

              function getCurrencySymbol(currencyCode) {
                const currencySymbols = {
                  USD: "$",
                  EUR: "€",
                  GBP: "£",
                  JPY: "¥",
                  AUD: "A$",
                  CAD: "C$",
                  ZAR: "R",
                };
                return currencySymbols[currencyCode] || currencyCode;
              }

              const currencySymbol = getCurrencySymbol(bookingData.currency);
              const formattedAmount =
                bookingData.order_total != null
                  ? new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: bookingData.currency,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bookingData.order_total)
                  : "N/A";

              document.getElementById("offer-amount").textContent = `Amount Paid: ${formattedAmount}`;

              return;
            } else {
              console.log("booking not redeemed");
              document.getElementById("offer-redeemed").style.display = "none";
            }

            document.getElementById("offer-name").textContent = `${bookingData.experience_name}`;
            document.getElementById("offer-name2").textContent = `${bookingData.experience_name}`;
            document.getElementById("offer-name3").textContent = `${bookingData.experience_name}`;
            document.getElementById(
              "offer-booking-number"
            ).textContent = `Booking Number: ${bookingData.booking_number}`;

            let dateText = "N/A";
            if (bookingData.activity_start_date) {
              dateText = new Date(bookingData.activity_start_date).toLocaleDateString();
            } else if (bookingData.redemption_end_date) {
              dateText = new Date(bookingData.redemption_end_date).toLocaleDateString();
            }
            document.getElementById("offer-date").textContent = `Date: ${dateText}`;

            function getCurrencySymbol(currencyCode) {
              const currencySymbols = {
                USD: "$",
                EUR: "€",
                GBP: "£",
                JPY: "¥",
                AUD: "A$",
                CAD: "C$",
                ZAR: "R",
              };
              return currencySymbols[currencyCode] || currencyCode;
            }

            const currencySymbol = getCurrencySymbol(bookingData.currency);
            const formattedAmount =
              bookingData.order_total != null
                ? new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: bookingData.currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(bookingData.order_total)
                : "N/A";

            document.getElementById("offer-amount").textContent = `Amount Paid: ${formattedAmount}`;

            document.getElementById("modal-voucher").style.display = "flex";
            document.getElementById("step2").style.display = "none";
            document.getElementById("modal-success").style.display = "none";
            document.getElementById("modal-error").style.display = "none";
            document.getElementById("modal-back").style.display = "none";
            document.getElementById("button-offer-redeem").style.display = "flex";
            document.getElementById("button-offer-redeem").addEventListener("click", () => {
              document.getElementById("step1").style.display = "none";
              document.getElementById("step2").style.display = "flex";
              document.getElementById("modal-back").style.display = "flex";
            });
            const supplierID = bookingData.associated_supplier;
            console.log("Supplier ID:", supplierID);
            const { data: supplierData, error: supplierError } = await _supabase
              .from("Suppliers")
              .select("*")
              .eq("airtable_id", supplierID)
              .single();

            if (supplierError) {
              throw supplierError;
            }
            console.log(supplierData);
            const supplierRedemptionCode = supplierData.supplier_redemption_code;
            console.log("Supplier Redemption Code:", supplierRedemptionCode);

            document.getElementById("modal-close").addEventListener("click", () => {
              document.getElementById("modal-voucher").style.display = "none";
              document.getElementById("offer-redeemed").style.display = "none";
              document.getElementById("step1").style.display = "flex";
              document.getElementById("step2").style.display = "none";
            });

            document.getElementById("verificationForm").addEventListener("submit", async function (event) {
              event.preventDefault();
              const inputValue = document.getElementById("codeInput").value;
              const booking_number = bookingData.booking_number;
              console.log("Input value:", inputValue);
              const inputValueAsNumber = parseInt(inputValue);

              if (inputValueAsNumber === supplierRedemptionCode) {
                console.log("Booking number:", booking_number);

                const { data, error } = await _supabase
                  .from("Bookings")
                  .update({
                    is_redeemed: true,
                    redemption_timestamp: new Date().toISOString(),
                  })
                  .eq("booking_number", booking_number);

                if (error) {
                  console.error("Error updating booking status:", error.message);
                  console.log("Response data:", data);
                  document.getElementById("modal-error").style.display = "flex";
                } else {
                  console.log("Booking status updated successfully");
                  console.log("Response data:", data);
                  document.getElementById("modal-success").style.display = "flex";
                  document.getElementById("step2").style.display = "none";

                  // Re-fetch and re-render the table after a successful update
                  await fetchAndRenderBookings();
                }
              } else {
                console.log("Redemption code does not match");
                document.getElementById("modal-error").style.display = "flex";
              }
            });
          } else if (bookingData.offer_type === "[Retail] Direct - Referral URL") {
            console.log("[Retail] Direct - Referral URL");
            // Add your action for this offer type here
          } else if (bookingData.offer_type === "[Retail] Direct - Prepay") {
            console.log("[Retail] Direct - Prepay");
            // Add your action for this offer type here
          } else {
            console.log("Unknown Offer Type");
            // Add your action for unknown offer type here
          }
        } else {
          console.log("No booking data found");
        }
      } catch (error) {
        console.error("Error opening modal:", error);
      }
    }

    document.getElementById("modal-close").addEventListener("click", () => {
      document.getElementById("modal-voucher").style.display = "none";
      document.getElementById("offer-redeemed").style.display = "none";
      document.getElementById("step1").style.display = "flex";
      document.getElementById("step2").style.display = "none";
      document.getElementById("step2-fb-prepaid").style.display = "none";
    });

    document.getElementById("modal-back").addEventListener("click", () => {
      document.getElementById("step2").style.display = "none";
      document.getElementById("step2-fb-prepaid").style.display = "none";
      document.getElementById("step1").style.display = "flex";
    });

    await fetchAndRenderBookings();
  }

  signInAndPrintBookingNumber();
});

// document.getElementById("verificationForm").addEventListener("submit", async function (event) {
//   event.preventDefault();

//   // Get values from custom inputs
//   const offerValue = document.getElementById("valueInput").value;
//   const guestValue = document.getElementById("guestInput").value;

//   // Example placeholders for the additional fields (replace with actual values)
//   const customerId = userStripeID; // Example: Replace with actual customer ID
//   const offerId = bookingData.booking_number; // Example: Replace with actual booking number
//   const programId = bookingData.associated_program; // Example: Replace with actual program ID

//   // Construct the object with offer redemption fields
//   const redemptionData = {
//     customerId: customerId,
//     offerId: offerId,
//     offerValue: offerValue,
//     paxCount: guestValue,
//     programId: programId,
//   };

//   // Example of sending redemptionData to a webhook
//   try {
//     const response = await fetch("https://hook.us1.make.com/9dvcpus9w65mv0m4oxhywxuwnaih6fkn", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(redemptionData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to send data to webhook");
//     }

//     // Handle success scenario after sending webhook
//     console.log("Redemption data sent successfully to webhook:", redemptionData);

//     // Update booking status example (remove or modify based on your actual logic)
//     const booking_number = bookingData.booking_number;
//     const { data, error } = await _supabase
//       .from("Bookings")
//       .update({
//         is_redeemed: true,
//         redemption_timestamp: new Date().toISOString(),
//       })
//       .eq("booking_number", booking_number);

//     if (error) {
//       console.error("Error updating booking status:", error.message);
//       document.getElementById("modal-error").style.display = "flex";
//     } else {
//       console.log("Booking status updated successfully");
//       console.log("Response data:", data);
//       document.getElementById("modal-success").style.display = "flex";
//       document.getElementById("step2-fb-prepaid").style.display = "none";

//       // Re-fetch and re-render the table after a successful update
//       await fetchAndRenderBookings();

//       // Reset the form fields after successful submission
//       document.getElementById("verificationForm").reset();
//     }
//   } catch (error) {
//     console.error("Error sending redemption data to webhook:", error);
//     document.getElementById("modal-error").style.display = "flex";
//   }
// });
