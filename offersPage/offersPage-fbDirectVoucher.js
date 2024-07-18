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
const offerModal = document.getElementById("modal-get-offer");
const userSupabaseID = memberData.customFields["supabase-uuid"];
offerModal.style.display = "none";

console.log("Member ID:", memberID);
console.log("Stripe Customer ID:", memberStripeId);
console.log("Xero Contact ID:", memberXeroId);
console.log(offerType);

async function getOfferInfo(experienceName) {
  const offerInfoElement = document.getElementById("offer-info");
  const loadingSpinnerElement = document.getElementById("loading-spinner");

  // Hide offer info and show loading spinner
  if (loadingSpinnerElement) {
    loadingSpinnerElement.style.display = "block";
  }

  try {
    // Make a call to Supabase to get booking info
    const { data, error } = await _supabase.from("Offers").select("*").eq("offer_name", experienceName);

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
        const modalTitle = document.getElementById("modal-get-offer-heading");
        if (modalTitle) {
          modalTitle.textContent = `${offer.offer_name}`;
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
        const discountElement = document.getElementById("offer-price-discount-prepaid");
        if (discountElement) {
          discountElement.textContent = `Get ${offer.discount_amount}${offer.discount_type} Off`;
        } else {
          console.error("Discount element not found");
        }

        // Set price
        const priceElement = document.getElementById("fb-offer-fromPrice");
        if (priceElement) {
          if (offer.from_price !== undefined) {
            priceElement.textContent = `$${offer.from_price.toFixed(2)}`;
          } else {
            console.error("from_price is undefined in the offer object");
          }
        } else {
          console.error("Price element not found");
        }

        // Set modal price
        const priceElementModal = document.getElementById("fb-offer-fromPrice-modal");
        if (priceElementModal) {
          if (offer.from_price !== undefined) {
            priceElementModal.textContent = `$${offer.from_price.toFixed(2)}`;
          } else {
            console.error("from_price Modal is undefined in the offer object");
          }
        } else {
          console.error("Price element not found");
        }

        // Set disocunted price
        const priceDiscElement = document.getElementById("fb-offer-price-discounted");
        if (priceDiscElement) {
          if (offer.from_price !== undefined) {
            priceDiscElement.textContent = `$${discountPrice.toFixed(2)}`;
          } else {
            console.error("savings is undefined in the offer object");
          }
        } else {
          console.error("Discount element not found");
        }

        // Set  modal disocunted price
        const priceDiscElementModal = document.getElementById("fb-offer-price-discounted-modal");
        if (priceDiscElementModal) {
          if (offer.from_price !== undefined) {
            priceDiscElementModal.textContent = `$${discountPrice.toFixed(2)}`;
          } else {
            console.error("savings Modal is undefined in the offer object");
          }
        } else {
          console.error("Discount element not found");
        }

        // Set savings
        const savingsElement = document.getElementById("offer-price-savings-prepaid");
        if (savingsElement) {
          savingsElement.textContent = `Save ${savings.toFixed(2)} ${offer.currency} Per Person`;
        } else {
          console.error("savings element not found");
        }

        // Set modal savings
        const savingsElementModal = document.getElementById("offer-price-savings-prepaid-modal");
        if (savingsElementModal) {
          savingsElementModal.textContent = `Save ${savings.toFixed(2)} ${offer.currency} Per Person`;
        } else {
          console.error("savings Modal element not found");
        }

        // Set Get Offer Button
        const buttonGetOffer = document.getElementById("button-get-offer-fb");
        const buttonGetOfferClose = document.getElementById("button-get-offer-close");
        const bgGetOfferClose = document.getElementById("bg-get-offer-close");

        if (buttonGetOffer) {
          buttonGetOffer.addEventListener("click", function () {
            offerModal.style.display = "flex";
          });
        } else {
          console.error("Element with ID 'button-get-offer-fb' not found");
        }

        if (buttonGetOfferClose) {
          buttonGetOfferClose.addEventListener("click", function () {
            offerModal.style.display = "none";
          });
        } else {
          console.error("Element with ID 'button-get-offer-close' not found");
        }

        if (bgGetOfferClose) {
          bgGetOfferClose.addEventListener("click", function () {
            offerModal.style.display = "none";
          });
        } else {
          console.error("Element with ID 'bgGetOfferClose' not found");
        }

        const redemptionModal = document.getElementById("modal-redemption");
        if (redemptionModal) {
          redemptionModal.textContent = `${offer.redeem_instructions}`;
        } else {
          console.error("Redemption element not found");
        }

        const buttonBuy = document.getElementById("button-buy-offer-fb");
        if (buttonBuy) {
          buttonBuy.addEventListener("click", function () {
            const imageUrl = `https://app.cityrewards.io/storage/v1/object/public/${offer.image_featured}?width=500&height=600`;
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
        } else {
          console.error("Element with ID 'buttonBuy' not found");
        }

        // Set description
        const descriptionElement = document.getElementById("offer-description-prepaid");
        if (descriptionElement) {
          descriptionElement.textContent = `${offer.description}`;
        } else {
          console.error("Description element not found");
        }

        // Set menu link and send webhook
        const menuElement = document.getElementById("button-view-menu-prepaid");
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
                const response = await fetch("https://hook.us1.make.com/xa96389k7ypef9ctkgrd314k3blc7hyb", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(webhookPayload),
                });
                if (!response.ok) {
                  throw new Error(`Webhook request failed with status ${response.status}`);
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
        const bookingElement = document.getElementById("button-referral-prepaid");
        if (bookingElement) {
          const bookingUrl = offer.redeem_url; //
          if (bookingUrl) {
            bookingElement.setAttribute("booking-url", bookingUrl);
            bookingElement.addEventListener("click", async function () {
              const bookingUrl = bookingElement.getAttribute("booking-url");
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
                const response = await fetch("https://hook.us1.make.com/xa96389k7ypef9ctkgrd314k3blc7hyb", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(webhookPayload),
                });
                if (!response.ok) {
                  throw new Error(`Webhook request failed with status ${response.status}`);
                }
                console.log("Webhook sent successfully");
              } catch (error) {
                console.error("Failed to send booking webhook:", error.message);
              }
            });
          } else {
            console.error("Booking URL not defined in offer");
          }
        } else {
          console.error("Booking link element not found");
        }

        // Set redemption instructions
        const redemptionElement = document.getElementById("offer-redemption-intruct-prepaid");
        if (redemptionElement) {
          redemptionElement.textContent = `${offer.redeem_instructions}`;
        } else {
          console.error("Redemption element not found");
        }

        // Assuming these values are defined somewhere in your code
        const totalRedemptions = offer.total_redemptions; // Example value
        const maxRedemptionsPerUser = offer.max_redemptions_per_user; // Example value

        // Calculate the remaining redemptions
        const redemptionsRemaining = maxRedemptionsPerUser - totalRedemptions;

        // Set redemption remaining
        const redemptionRemainElement = document.getElementById("offer-redemption-remain");
        if (redemptionRemainElement) {
          redemptionRemainElement.textContent = `${maxRedemptionsPerUser} Redemptions Per Person`;
        } else {
          console.error("Redemption Remain element not found");
        }

        // Set inclusions
        const inclusionsElement = document.getElementById("offer-inclusions-prepaid");
        if (inclusionsElement) {
          inclusionsElement.textContent = `${offer.inclusions}`;
        } else {
          console.error("Inclusions element not found");
        }

        // Set exclusions
        const exclusionsElement = document.getElementById("offer-exclusions-prepaid");
        if (exclusionsElement) {
          // Clear any existing content
          exclusionsElement.textContent = "";

          // Get the exclusions string and split it into an array
          const exclusionsArray = offer.exclusions.split("\n").filter((exclusion) => exclusion.trim() !== "");

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
        const infoElement = document.getElementById("offer-additional-info");
        if (infoElement) {
          infoElement.textContent = `${offer.additional_information}`;
        } else {
          console.error("additional info element not found");
        }

        // Set offer address
        const addressElement = document.getElementById("offer-address-prepaid");
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
