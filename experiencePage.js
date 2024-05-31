document.addEventListener("DOMContentLoaded", async function () {
  // Ensure supabase is properly imported or available
  const { createClient } = supabase;

  const _supabase = createClient(
    "https://impecimchocfsfsdgrvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
  );

  console.log("Supabase Instance: ", _supabase);
  const user = localStorage.getItem("_ms-mem");
  const userData = JSON.parse(user);
  console.log(userData);
  const userSupabaseID = userData.customFields["supabase-uuid"];

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
  }

  signInAndPrintBookingNumber();

  async function getOfferInfo(experienceName) {
    const offerInfoElement = document.getElementById("offer-info");
    const loadingSpinnerElement = document.getElementById("loading-spinner");

    // Hide offer info and show loading spinner
    if (loadingSpinnerElement) {
      loadingSpinnerElement.style.display = "block";
    }

    try {
      // Make a call to Supabase to get more booking info
      const { data, error } = await _supabase
        .from("Offers")
        .select("*")
        .eq("offer_name", experienceName); // Adjust the condition as needed

      console.log(data);

      // Check for errors
      if (error) {
        throw error;
      }

      // Check if data exists and has the image_featured field
      if (data && data.length > 0) {
        const offer = data[0];

        ///Offer Type Prepaid Voucher///
        if (offer.offer_type === "[F&B] Direct - Prepaid Voucher") {
          console.log("Offer Type Is [F&B] Direct - Prepaid Voucher");

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

            const imgElement = document.getElementById("offer-image-prepaid");
            if (imgElement) {
              imgElement.src = imageUrl;
            } else {
              console.error("Image element not found");
            }
          } else {
            console.error("No image_featured field found");
          }

          // Example offer object
          const offerDetails = {
            discount_amount: offer.discount_amount,
            from_price: offer.from_price,
            discount_type: offer.discount_type,
          };

          // Calculate the savings based on the discount type
          let savings;
          if (offer.discount_type === "$") {
            savings = offer.discount_amount;
          } else if (offer.discount_type === "%") {
            savings = (offer.discount_amount / 100) * offer.from_price;
          } else {
            savings = 0; // Default to 0 if discount type is unknown
          }

          // Set discount
          const discountElement = document.getElementById(
            "offer-price-discount-prepaid"
          );
          if (discountElement) {
            discountElement.textContent = `Get ${offer.discount_amount}${offer.discount_type} Off Your Meal`;
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
                  memberstack_Id: msId,
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
                  console.error("Failed to send menu webhook:", error.message);
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
                const bookingUrl = bookingElement.getAttribute("booking-url");
                window.open(bookingUrl, "_blank", "width=800,height=600");

                // Prepare the webhook payload
                const webhookPayload = {
                  memberstack_Id: msId,
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
          const total_redemptions = offer.total_redemptions; // Example value
          const max_redemptions_per_user = offer.max_redemptions_per_user; // Example value

          // Calculate the remaining redemptions
          const redemptionRemaining =
            max_redemptions_per_user - total_redemptions;

          // Set redemption remaining
          const redemptionRemainElement = document.getElementById(
            "offer-redemption-remain"
          );
          if (redemptionRemainElement) {
            redemptionRemainElement.textContent = `${redemptionRemaining} Redemptions Remaining`;
          } else {
            console.error("Redemption Remain element not found");
          }

          // Set inclusions
          const inclusionsElement = document.getElementById("offer-inclusions");
          if (inclusionsElement) {
            inclusionsElement.textContent = `${offer.inclusions}`;
          } else {
            console.error("Inclusions element not found");
          }

          // Set exclusions
          const exclusionsElement = document.getElementById("offer-exclusions");
          if (exclusionsElement) {
            exclusionsElement.textContent = `${offer.exclusions}`;
          } else {
            console.error("exclusions element not found");
          }

          // Set additional info
          const infoElement = document.getElementById("offer-additional-info");
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
          const phoneElement = document.getElementById("offer-phone-prepaid");
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
          const titleElement = document.getElementById("offer-title-instore");
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

            const imgElement = document.getElementById("offer-image-instore");
            if (imgElement) {
              imgElement.src = imageUrl;
            } else {
              console.error("Image element not found");
            }
          } else {
            console.error("No image_featured field found");
          }

          // Set discount
          const discountElement = document.getElementById(
            "offer-price-discount"
          );
          if (discountElement) {
            discountElement.textContent = `Get ${offer.discount_amount}${offer.discount_type} Off`;
          } else {
            console.error("Discount element not found");
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
                  memberstack_Id: msId,
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
                  console.error("Failed to send menu webhook:", error.message);
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
                const bookingUrl = bookingElement.getAttribute("booking-url");
                window.open(bookingUrl, "_blank", "width=800,height=600");

                // Prepare the webhook payload
                const webhookPayload = {
                  memberstack_Id: msId,
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
          const inclusionsElement = document.getElementById("offer-inclusions");
          if (inclusionsElement) {
            inclusionsElement.textContent = `${offer.inclusions}`;
          } else {
            console.error("Inclusions element not found");
          }

          // Set exclusions
          const exclusionsElement = document.getElementById("offer-exclusions");
          if (exclusionsElement) {
            exclusionsElement.textContent = `${offer.exclusions}`;
          } else {
            console.error("exclusions element not found");
          }

          // Set additional info
          const infoElement = document.getElementById("offer-additional-info");
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
          const total_redemptions = offer.total_redemptions; // Example value
          const max_redemptions_per_user = offer.max_redemptions_per_user; // Example value

          // Calculate the remaining redemptions
          const redemptionRemaining =
            max_redemptions_per_user - total_redemptions;

          // Set redemption remaining
          const redemptionRemainElement = document.getElementById(
            "offer-redemption-instore"
          );
          if (redemptionRemainElement) {
            redemptionRemainElement.textContent = `${redemptionRemaining} Redemptions Remaining`;
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
        console.error("No offer data found");
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
});
