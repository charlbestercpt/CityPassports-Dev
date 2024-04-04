const offers = document.getElementById("offers");
const offersSettings = document.getElementById("offers_settings");
const settings = document.getElementById("settings");
const users = document.getElementById("users");
const payments = document.getElementById("payments");
const offersButton = document.getElementById("offers_button");
const settingsButton = document.getElementById("settings_button");
const usersButton = document.getElementById("users_button");
const paymentsButton = document.getElementById("payments_button");
const navMenu = document.getElementById("navMenu");
const navMobile = document.getElementById("navMobile");
const closeButton = document.getElementById("redemptionClose");
const modal = document.getElementById("redemptionModal");
const navOverlay = document.getElementById("navOverlay");
const redeemShow = document.getElementById("redeemVoucher");
const voucherModal = document.getElementById("fs-modal-1-popup");
const tableHolder = document.getElementById("table-holder");
const tableHolderUser = document.getElementById("table-holder-user");
const tableHolderSettings = document.getElementById("table-holder-settings");

offers.classList.add("transition");
settings.classList.add("transition");
users.classList.add("transition");
payments.classList.add("transition");
navMenu.classList.add("transition");

// Function to toggle navMenu visibility
function toggleNavMenu() {
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
}

// Function to check if we're on a mobile device based on screen width
function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

// Add the click event listener for navMobile just once
document.addEventListener("DOMContentLoaded", function () {
  navMobile.addEventListener("click", toggleNavMenu);
});

function adjustUIForScreenSize() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    // Adjust UI for larger screens
    navMenu.style.display = "block";
    offers.style.display = "block";
    offersSettings.style.display = "none";
    settings.style.display = "none";
    users.style.display = "none";
    payments.style.display = "none";
    // Possibly remove click toggle behavior or adjust as needed for desktop
  } else {
    // Adjust UI for smaller screens
    myPasses.style.display = "block";
    settings.style.display = "none";
    users.style.display = "none";
    navMenu.style.display = "none";
    payments.style.display = "none";
    // The click event listener is already set, no need to add it again
  }
}

// Call adjustUIForScreenSize on initial load and on resize event
document.addEventListener("DOMContentLoaded", adjustUIForScreenSize);
window.addEventListener("resize", adjustUIForScreenSize);

offersButton.addEventListener("click", function () {
  offers.style.display = "block"; // Show myPasses
  users.style.display = "none"; // Hide myProfile
  settings.style.display = "none"; // Hide myBookings
  payments.style.display = "none"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

settingsButton.addEventListener("click", function () {
  offers.style.display = "none"; // Hide myPasses
  users.style.display = "none"; // Hide myProfile
  settings.style.display = "block"; // Show myBookings
  payments.style.display = "none"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

usersButton.addEventListener("click", function () {
  offers.style.display = "none"; // Hide myPasses
  users.style.display = "block"; // Show myProfile
  settings.style.display = "none"; // Hide myBookings
  payments.style.display = "none"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

paymentsButton.addEventListener("click", function () {
  offers.style.display = "none"; // Hide myPasses
  users.style.display = "none"; // Show myProfile
  settings.style.display = "none"; // Hide myBookings
  payments.style.display = "block"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const { createClient } = supabase;

  const _supabase = createClient(
    "https://impecimchocfsfsdgrvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
  );

  console.log("Supabase Instance: ", _supabase);

  // // Function to retrieve access token from localStorage
  // function getAccessToken() {
  //   const accessToken = localStorage.getItem("supabaseData");
  //   if (accessToken) {
  //     const token = JSON.parse(accessToken);
  //     if (token && token["session"] && token["session"]["access_token"]) {
  //       return token["session"]["access_token"];
  //     }
  //   }
  //   return null;
  // }

  // const userToken = getAccessToken();

  // if (userToken) {
  //   try {
  //     const response = await _supabase.auth.signInWithToken(userToken);

  //     if (response.error) {
  //       console.error(
  //         "Supabase authentication failed:",
  //         response.error.message
  //       );
  //     } else {
  //       console.log("Supabase authentication successful:", response);
  //       localStorage.setItem("supabaseData", JSON.stringify(response));
  //     }
  //   } catch (error) {
  //     console.error("Supabase authentication error:", error.message);
  //   }
  // } else {
  //   console.log("Failed to retrieve User Token");
  // }

  // Retrieving user data from local storage
  const userData = JSON.parse(localStorage.getItem("supabaseData"));
  console.log("User Data: ", userData);

  if (userData) {
    // Show spinner while waiting for data
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    tableHolder.appendChild(spinner);

    const accountSettings = document.createElement("div");
    accountSettings.classList.add("flex-fields");
    tableHolderSettings.appendChild(accountSettings);

    try {
      let { data: User_Profiles, error } = await _supabase
        .from("User Profiles")
        .select("associated_suppliers")
        .eq("id", userData.user.id);

      if (error) {
        throw error;
      } else {
        console.log("User profiles:", User_Profiles);

        if (Array.isArray(User_Profiles)) {
          if (User_Profiles.length === 0) {
            console.log("No user profiles found.");
            // Handle the case when no user profiles are found
          } else if (User_Profiles.length === 1) {
            // Handle single user profile
            console.log("One user profile found:", User_Profiles);
            const associatedSuppliers = User_Profiles[0].associated_suppliers;
            console.log("Associated Suppliers:", associatedSuppliers);

            const supplierID = associatedSuppliers;
            console.log("Supplier ID:", supplierID);

            const { data: supplierData, error: supplierError } = await _supabase
              .from("Suppliers")
              .select("*")
              .eq("airtable_id", supplierID);
            //  .single();

            if (supplierError) {
              throw supplierError;
            }

            console.log(supplierData);

            const { data: supplierUsersData, error: supplierUsersError } =
              await _supabase
                .from("User Profiles")
                .select("*")
                .eq("associated_suppliers", supplierID);

            if (supplierUsersError) {
              throw supplierUsersError;
            }

            console.log(supplierUsersData);

            if (supplierUsersData) {
              // Create elements for each offer
              supplierUsersData.forEach((user) => {
                const offersElement = document.createElement("div");
                offersElement.classList.add("container-offers");

                const offerDiv = document.createElement("div");
                offerDiv.classList.add("container-offer");

                const userName = document.createElement("p");
                userName.classList.add(
                  "heading-small",
                  "text-weight-semibold",
                  "centred"
                );
                userName.textContent = user.first_name + " " + user.last_name;

                const emailHeading = document.createElement("p");
                emailHeading.textContent = "Email";
                emailHeading.classList.add(
                  "text-size-small",
                  "text-align-centre",
                  "text-weight-semibold"
                );

                const userEmail = document.createElement("p");
                userEmail.classList.add("text-size-small", "text-align-centre");

                const originalEmail = user.email;
                const truncatedEmail =
                  originalEmail.length > 25
                    ? originalEmail.substring(0, 25) + "..."
                    : originalEmail;
                userEmail.textContent = truncatedEmail;

                const phoneHeading = document.createElement("p");
                phoneHeading.textContent = "Phone Number";
                phoneHeading.classList.add(
                  "text-size-small",
                  "text-align-centre",
                  "text-weight-semibold"
                );

                const userPhone = document.createElement("p");
                userPhone.textContent = user.phone_number;
                userPhone.classList.add("text-size-small", "text-align-centre");

                const roleHeading = document.createElement("p");
                roleHeading.textContent = "Role";
                roleHeading.classList.add(
                  "text-size-small",
                  "text-align-centre",
                  "text-weight-semibold"
                );

                const userRole = document.createElement("p");
                userRole.textContent = user.user_role;
                userRole.classList.add("text-size-small", "text-align-centre");

                // Create a new button element
                const editUserButton = document.createElement("button");
                editUserButton.classList.add("button-primary", "centred");
                editUserButton.textContent = "Edit User";

                const containerUserInfo = document.createElement("div");
                containerUserInfo.classList.add("container-user_info");

                const contentUser = document.createElement("div");
                contentUser.classList.add("content-user", "align-left");

                const contentUser2 = document.createElement("div");
                contentUser2.classList.add("content-user");

                const contentUser3 = document.createElement("div");
                contentUser3.classList.add("content-user");

                const contentUser4 = document.createElement("div");
                contentUser4.classList.add("content-user");

                const contentUser5 = document.createElement("div");
                contentUser5.classList.add("content-user");

                const containerUsersInfo = document.createElement("div");
                containerUsersInfo.classList.add("container-users_info");

                tableHolderUser.appendChild(containerUsersInfo);
                containerUsersInfo.appendChild(containerUserInfo);
                containerUserInfo.appendChild(contentUser);
                containerUserInfo.appendChild(contentUser2);
                containerUserInfo.appendChild(contentUser3);
                containerUserInfo.appendChild(contentUser4);
                containerUserInfo.appendChild(contentUser5);

                contentUser.appendChild(userName);
                contentUser2.appendChild(emailHeading);
                contentUser2.appendChild(userEmail);
                contentUser3.appendChild(phoneHeading);
                contentUser3.appendChild(userPhone);
                contentUser4.appendChild(roleHeading);
                contentUser4.appendChild(userRole);
                contentUser5.appendChild(editUserButton);

                editUserButton.addEventListener("click", function () {
                  function createForm2() {
                    const form2 = document.createElement("form");
                    form2.style.marginTop = "2rem"; // Add 2rem top margin;
                    form2.id = "myUserForm";
                    form2.style;

                    // Create field and lable containers
                    const userfieldContainer = document.createElement("div");
                    userfieldContainer.classList.add("text-field-wrapper-2");
                    const userfieldContainer2 = document.createElement("div");
                    userfieldContainer2.classList.add("text-field-wrapper-2");
                    const userfieldContainer3 = document.createElement("div");
                    userfieldContainer3.classList.add("text-field-wrapper-2");
                    const userfieldContainer4 = document.createElement("div");
                    userfieldContainer4.classList.add("text-field-wrapper-2");

                    // Offer Name Field
                    const nameFirstLabel = document.createElement("label");
                    nameFirstLabel.classList.add("input-label-4");
                    nameFirstLabel.textContent = "User First Name";

                    const nameFirstInput = document.createElement("input");
                    nameFirstInput.classList.add("input-5");
                    nameFirstInput.type = "text";
                    nameFirstInput.name = "first_name";
                    nameFirstInput.value = user.first_name;

                    userfieldContainer.appendChild(nameFirstLabel);
                    userfieldContainer.appendChild(nameFirstInput);

                    const nameLastLabel = document.createElement("label");
                    nameLastLabel.classList.add("input-label-4");
                    nameLastLabel.textContent = "User Last Name";

                    const nameLastInput = document.createElement("input");
                    nameLastInput.classList.add("input-5");
                    nameLastInput.type = "text";
                    nameLastInput.name = "last_name";
                    nameLastInput.value = user.last_name;

                    userfieldContainer2.appendChild(nameLastLabel);
                    userfieldContainer2.appendChild(nameLastInput);

                    const emailLabel = document.createElement("label");
                    emailLabel.classList.add("input-label-4");
                    emailLabel.textContent = "User Email";

                    const emailInput = document.createElement("input");
                    emailInput.classList.add("input-5");
                    emailInput.type = "text";
                    emailInput.name = "email";
                    emailInput.value = user.email;

                    userfieldContainer3.appendChild(emailLabel);
                    userfieldContainer3.appendChild(emailInput);

                    const phoneLabel = document.createElement("label");
                    phoneLabel.classList.add("input-label-4");
                    phoneLabel.textContent = "User Phone Number";

                    const phoneInput = document.createElement("input");
                    phoneInput.classList.add("input-5");
                    phoneInput.type = "text";
                    phoneInput.name = "phone_number";
                    phoneInput.value = user.phone_number;

                    userfieldContainer4.appendChild(phoneLabel);
                    userfieldContainer4.appendChild(phoneInput);

                    const userFlexBox = document.createElement("div");
                    userFlexBox.classList.add("offers-flex_box");
                    const userFlexBox2 = document.createElement("div");
                    userFlexBox2.classList.add("offers-flex_box");

                    userFlexBox.appendChild(userfieldContainer);
                    userFlexBox.appendChild(userfieldContainer2);
                    userFlexBox2.appendChild(userfieldContainer3);
                    userFlexBox2.appendChild(userfieldContainer4);

                    form2.appendChild(userFlexBox);
                    form2.appendChild(userFlexBox2);
                    containerUsersInfo.appendChild(form2);
                  }
                  createForm2();
                  userPhone.style.display = "none";
                });
              });
            } else {
              console.log("No user data found for this supplier.");
              // Handle case when no offer data is found
            }
            ////////////////////////////////////////////////////////////////////////////////////
            if (supplierData) {
              // Create elements for each offer
              supplierData.forEach((supplier) => {
                const supplierName = supplier.supplier_name;

                const companyNameElement =
                  document.getElementById("company-name");
                const companyNameDropdown = document.getElementById(
                  "company-name-dropdown"
                );
                if (companyNameElement) {
                  companyNameElement.textContent = supplierName;
                  companyNameDropdown.textContent = supplierName;
                }

                const settingsContainer1 = document.createElement("div");
                settingsContainer1.classList.add("text-field-wrapper-2", "50%");
                const settingsContainer2 = document.createElement("div");
                settingsContainer2.classList.add("text-field-wrapper-2");
                const settingsContainer3 = document.createElement("div");
                settingsContainer3.classList.add("text-field-wrapper-2");
                const settingsContainer4 = document.createElement("div");
                settingsContainer4.classList.add("text-field-wrapper-2");
                const settingsContainer5 = document.createElement("div");
                settingsContainer5.classList.add("text-field-wrapper-2");
                const settingsContainer6 = document.createElement("div");
                settingsContainer6.classList.add("text-field-wrapper-2");

                // Company Name Field - Supplier Settings
                const companyNameLabel = document.createElement("label");
                companyNameLabel.classList.add("input-label-4");
                companyNameLabel.textContent = "Company Name";

                const companyNameInput = document.createElement("input");
                companyNameInput.classList.add("input-5");
                companyNameInput.type = "text";
                companyNameInput.name = "name";
                companyNameInput.value = supplier.supplier_name;

                // Company Type Field - Supplier Settings
                const companyTypeLabel = document.createElement("label");
                companyTypeLabel.classList.add("input-label-4");
                companyTypeLabel.textContent = "Company Type";

                const companyTypeInput = document.createElement("input");
                companyTypeInput.classList.add("input-5", "50%");
                companyTypeInput.type = "text";
                companyTypeInput.name = "name";
                companyTypeInput.value = supplier.supplier_type;

                // Company Sub Type Field - Supplier Settings
                const companySubTypeLabel = document.createElement("label");
                companySubTypeLabel.classList.add("input-label-4");
                companySubTypeLabel.textContent = "Company Subtype";

                const companySubTypeInput = document.createElement("input");
                companySubTypeInput.classList.add("input-5", "50%");
                companySubTypeInput.type = "text";
                companySubTypeInput.name = "name";
                companySubTypeInput.value = supplier.supplier_subtype;

                // Company Redemption Code Field - Supplier Settings
                const companyRedemCodeLabel = document.createElement("label");
                companyRedemCodeLabel.classList.add("input-label-4");
                companyRedemCodeLabel.textContent = "Company Redemption Code";

                const companyRedemCodeInput = document.createElement("input");
                companyRedemCodeInput.classList.add("input-5", "50%");
                companyRedemCodeInput.type = "text";
                companyRedemCodeInput.name = "name";
                companyRedemCodeInput.value = supplier.supplier_redemption_code;

                // Company Email Field - Supplier Settings
                const companyEmailLabel = document.createElement("label");
                companyEmailLabel.classList.add("input-label-4");
                companyEmailLabel.textContent = "Company Email";

                const companyEmailInput = document.createElement("input");
                companyEmailInput.classList.add("input-5", "50%");
                companyEmailInput.type = "text";
                companyEmailInput.name = "name";
                companyEmailInput.value = supplier.supplier_email;

                // Company Number Field - Supplier Settings
                const companyNumberLabel = document.createElement("label");
                companyNumberLabel.classList.add("input-label-4");
                companyNumberLabel.textContent = "Company Number";

                const companyNumberInput = document.createElement("input");
                companyNumberInput.classList.add("input-5", "50%");
                companyNumberInput.type = "text";
                companyNumberInput.name = "name";
                companyNumberInput.value = supplier.supplier_number;

                settingsContainer1.appendChild(companyNameLabel);
                settingsContainer1.appendChild(companyNameInput);
                settingsContainer2.appendChild(companyTypeLabel);
                settingsContainer2.appendChild(companyTypeInput);
                settingsContainer3.appendChild(companySubTypeLabel);
                settingsContainer3.appendChild(companySubTypeInput);
                settingsContainer4.appendChild(companyRedemCodeLabel);
                settingsContainer4.appendChild(companyRedemCodeInput);
                settingsContainer5.appendChild(companyEmailLabel);
                settingsContainer5.appendChild(companyEmailInput);
                settingsContainer6.appendChild(companyNumberLabel);
                settingsContainer6.appendChild(companyNumberInput);

                accountSettings.appendChild(settingsContainer1);
                accountSettings.appendChild(settingsContainer2);
                accountSettings.appendChild(settingsContainer3);
                accountSettings.appendChild(settingsContainer4);
                accountSettings.appendChild(settingsContainer5);
                accountSettings.appendChild(settingsContainer6);

                // Create save button
                const saveSettingsBtnContainer = document.createElement("div"); // Container for the button
                saveSettingsBtnContainer.style.textAlign = "left"; // Align the button to the left
                saveSettingsBtnContainer.style.display = "flex"; // Set display to flex
                saveSettingsBtnContainer.style.justifyContent = "flex-start"; // Align items to the left
                saveSettingsBtnContainer.style.marginTop = "2rem";

                // Create save button
                const saveSettingsBtn = document.createElement("button");
                saveSettingsBtn.classList.add("button-primary");

                saveSettingsBtn.style.marginRight = "2rem";

                saveSettingsBtn.type = "button"; // Change type to button
                saveSettingsBtn.textContent = "Save Changes"; // Change text to "Save"

                saveSettingsBtnContainer.appendChild(saveSettingsBtn);
                //saveSettingsBtnContainer.appendChild(cancelSettingsBtn);
                accountSettings.appendChild(saveSettingsBtnContainer);
              });

              // Supabase Programs Call
              const { data: programData, error: programError } = await _supabase
                .from("Programs")
                .select("*");

              if (programError) {
                throw programError;
              }

              console.log(programData);

              // Extracting names into an array
              const programNames = programData.map(function (program) {
                return program.name;
              });

              console.log(programNames);

              // Supabase Categories Call
              const { data: categoriesData, error: categoriesError } =
                await _supabase.from("Categories").select("*");

              if (categoriesError) {
                throw categoriesError;
              }

              console.log(categoriesData);

              // Extracting names into an array
              const categoryNames = categoriesData.map(function (category) {
                return category.category_name;
              });

              console.log(categoryNames);

              // Supabase Regions Call
              const { data: regionsData, error: regionsError } = await _supabase
                .from("Regions")
                .select("*");

              if (regionsError) {
                throw regionsError;
              }

              console.log(regionsData);

              // Extracting names into an array
              const regionNames = regionsData.map(function (region) {
                return region.name;
              });

              console.log(regionNames);

              const { data: offerData, error: offerError } = await _supabase
                .from("Offers")
                .select("*")
                .eq("associated_supplier", supplierID);
              //   .single();

              if (offerError) {
                throw offerError;
              }

              console.log(offerData);
              if (offerData) {
                // Create elements for each offer
                offerData.forEach((offer) => {
                  const offersElement = document.createElement("div");
                  offersElement.classList.add("container-offers");

                  const offerDiv = document.createElement("div");
                  offerDiv.classList.add("container-offer");

                  const offerName = document.createElement("p");
                  offerName.classList.add(
                    "heading-small",
                    "text-weight-semibold",
                    "centred"
                  );

                  const originalText = offer.offer_name;
                  const truncatedText =
                    originalText.length > 32
                      ? originalText.substring(0, 32) + "..."
                      : originalText;
                  offerName.textContent = truncatedText;

                  const offerStatus = document.createElement("p");
                  offerStatus.textContent = offer.cr_status;
                  offerStatus.classList.add("offer-status");

                  const offerCode = document.createElement("p");
                  offerCode.textContent = "Product Code: " + offer.product_code;
                  offerCode.classList.add(
                    "text-size-small",
                    "text-align-centre"
                  );

                  // Create a new button element
                  const editButton = document.createElement("button");
                  editButton.classList.add("button-primary", "centred");
                  editButton.textContent = "Edit Offer";

                  editButton.addEventListener("click", function () {
                    // Function to create the form
                    function createForm() {
                      // Create form element
                      const form = document.createElement("form");
                      form.style.marginTop = "2rem"; // Add 2rem top margin;
                      form.id = "myForm";
                      form.style;

                      // Create field and lable container
                      const fieldContainer = document.createElement("div");
                      fieldContainer.classList.add("text-field-wrapper-2");

                      const fieldContainer2 = document.createElement("div");
                      fieldContainer2.classList.add("text-field-wrapper-2");

                      const fieldContainer3 = document.createElement("div");
                      fieldContainer3.classList.add("text-field-wrapper-2");

                      const fieldContainer4 = document.createElement("div");
                      fieldContainer4.classList.add("text-field-wrapper-2");

                      const fieldContainer5 = document.createElement("div");
                      fieldContainer5.classList.add("text-field-wrapper-2");

                      const fieldContainer6 = document.createElement("div");
                      fieldContainer6.classList.add("text-field-wrapper-2");

                      const fieldContainer7 = document.createElement("div");
                      fieldContainer7.classList.add("text-field-wrapper-2");
                      const fieldContainer8 = document.createElement("div");
                      fieldContainer8.classList.add("text-field-wrapper-2");
                      const fieldContainer9 = document.createElement("div");
                      fieldContainer9.classList.add("text-field-wrapper-2");
                      const fieldContainer10 = document.createElement("div");
                      fieldContainer10.classList.add("text-field-wrapper-2");
                      const fieldContainer11 = document.createElement("div");
                      fieldContainer11.classList.add("text-field-wrapper-2");
                      const fieldContainer12 = document.createElement("div");
                      fieldContainer12.classList.add("text-field-wrapper-2");
                      const fieldContainer13 = document.createElement("div");
                      fieldContainer13.classList.add("text-field-wrapper-2");
                      const fieldContainer14 = document.createElement("div");
                      fieldContainer14.classList.add("text-field-wrapper-2");
                      const fieldContainer15 = document.createElement("div");
                      fieldContainer15.classList.add("text-field-wrapper-2");
                      const fieldContainer16 = document.createElement("div");
                      fieldContainer16.classList.add("text-field-wrapper-2");
                      const fieldContainer17 = document.createElement("div");
                      fieldContainer17.classList.add("text-field-wrapper-2");
                      const fieldContainer18 = document.createElement("div");
                      fieldContainer18.classList.add("text-field-wrapper-2");
                      const fieldContainer19 = document.createElement("div");
                      fieldContainer19.classList.add("text-field-wrapper-2");
                      const fieldContainer20 = document.createElement("div");
                      fieldContainer20.classList.add("text-field-wrapper-2");
                      const fieldContainer21 = document.createElement("div");
                      fieldContainer21.classList.add("text-field-wrapper-2");
                      const fieldContainer22 = document.createElement("div");
                      fieldContainer22.classList.add("text-field-wrapper-2");
                      // Create field and lable container

                      // Offer Name Field
                      const nameLabel = document.createElement("label");
                      nameLabel.classList.add("input-label-4");
                      nameLabel.textContent = "Offer Display Name";

                      const nameInput = document.createElement("input");
                      nameInput.classList.add("input-5");
                      nameInput.type = "text";
                      nameInput.name = "name";
                      nameInput.value = offer.offer_name;

                      fieldContainer.appendChild(nameLabel);
                      fieldContainer.appendChild(nameInput);

                      // Product Code Field
                      const productCodeLabel = document.createElement("label");
                      productCodeLabel.classList.add("input-label-4");
                      productCodeLabel.textContent = "Product Code";

                      const productCodeInput = document.createElement("input");
                      productCodeInput.classList.add("input-5", "read-only");
                      productCodeInput.type = "text";
                      productCodeInput.name = "code";
                      productCodeInput.readOnly = true;
                      productCodeInput.value = offer.product_code;

                      // fieldContainer2.appendChild(productCodeLabel);
                      // fieldContainer2.appendChild(productCodeInput);

                      // Offer Status Field
                      const statusLabel = document.createElement("label");
                      statusLabel.classList.add("input-label-4");
                      statusLabel.textContent = "Offer Status";

                      const statusSelect = document.createElement("select");
                      statusSelect.classList.add("input-5");
                      statusSelect.name = "status";

                      const liveOption = document.createElement("option");

                      liveOption.value = "LIVE";
                      liveOption.textContent = "LIVE";

                      const pendingReviewOption =
                        document.createElement("option");
                      pendingReviewOption.value = "PENDING REVIEW";
                      pendingReviewOption.textContent = "PENDING REVIEW";

                      const rejectedOption = document.createElement("option");
                      rejectedOption.value = "REJECTED";
                      rejectedOption.textContent = "REJECTED";

                      statusSelect.appendChild(liveOption);
                      statusSelect.appendChild(pendingReviewOption);
                      statusSelect.appendChild(rejectedOption);

                      statusSelect.value = offer.cr_status;

                      fieldContainer3.appendChild(statusLabel);
                      fieldContainer3.appendChild(statusSelect);

                      // Redemption Start Date Field
                      const redemStartLabel = document.createElement("label");
                      redemStartLabel.classList.add("input-label-4");
                      redemStartLabel.textContent = "Redemption Start Date";

                      const redemStartInput = document.createElement("input");
                      redemStartInput.classList.add("input-5");
                      redemStartInput.type = "date";

                      redemStartInput.value = offer.redeem_start_date;

                      const currentDate = new Date()
                        .toISOString()
                        .split("T")[0];
                      redemStartInput.min = currentDate;

                      const oneYearFromNow = new Date();
                      oneYearFromNow.setFullYear(
                        oneYearFromNow.getFullYear() + 1
                      );
                      const maxDate = oneYearFromNow
                        .toISOString()
                        .split("T")[0];
                      redemStartInput.max = maxDate;

                      fieldContainer4.appendChild(redemStartLabel);
                      fieldContainer4.appendChild(redemStartInput);

                      // Redemption Start Time Field
                      const redemStartTimeLabel =
                        document.createElement("label");
                      redemStartTimeLabel.classList.add("input-label-4");
                      redemStartTimeLabel.textContent = "Redemption Start Time";

                      const redemStartTimeInput =
                        document.createElement("input");
                      redemStartTimeInput.classList.add("input-5");
                      redemStartTimeInput.type = "time";

                      redemStartTimeInput.value = offer.redeem_start_time;

                      const currentTime = new Date();
                      const currentHour = String(
                        currentTime.getHours()
                      ).padStart(2, "0");
                      const currentMinute = String(
                        currentTime.getMinutes()
                      ).padStart(2, "0");
                      const currentFormattedTime = `${currentHour}:${currentMinute}`;
                      redemStartTimeInput.min = currentFormattedTime;

                      const maxHour = String(
                        oneYearFromNow.getHours()
                      ).padStart(2, "0");
                      const maxMinute = String(
                        oneYearFromNow.getMinutes()
                      ).padStart(2, "0");
                      const maxFormattedTime = `${maxHour}:${maxMinute}`;
                      redemStartTimeInput.max = maxFormattedTime;

                      fieldContainer5.appendChild(redemStartTimeLabel);
                      fieldContainer5.appendChild(redemStartTimeInput);

                      // Redemption End Date Field
                      const redemEndDateLabel = document.createElement("label");
                      redemEndDateLabel.classList.add("input-label-4");
                      redemEndDateLabel.textContent = "Redemption End Date";

                      const redemEndDate = document.createElement("input");
                      redemEndDate.classList.add("input-5");
                      redemEndDate.type = "date";

                      redemEndDate.value = offer.redeem_end_date;
                      redemEndDate.min = currentDate;
                      redemEndDate.max = maxDate;

                      fieldContainer6.appendChild(redemEndDateLabel);
                      fieldContainer6.appendChild(redemEndDate);

                      // Redemption End Time Field
                      const redemEndTimeLabel = document.createElement("label");
                      redemEndTimeLabel.classList.add("input-label-4");
                      redemEndTimeLabel.textContent = "Redemption End Time";

                      const redemEndTimeInput = document.createElement("input");
                      redemEndTimeInput.classList.add("input-5");
                      redemEndTimeInput.type = "time";

                      redemEndTimeInput.value = offer.redeem_end_time;
                      redemStartTimeInput.min = currentFormattedTime;
                      redemStartTimeInput.max = maxFormattedTime;

                      fieldContainer7.appendChild(redemEndTimeLabel);
                      fieldContainer7.appendChild(redemEndTimeInput);

                      //Sales Start Date Field
                      const salesStartLabel = document.createElement("label");
                      salesStartLabel.classList.add("input-label-4");
                      salesStartLabel.textContent = "Sales Start Date";

                      const salesStartInput = document.createElement("input");
                      salesStartInput.classList.add("input-5");
                      salesStartInput.type = "date";

                      salesStartInput.value = offer.redeem_start_date;
                      redemStartInput.min = currentDate;
                      redemStartInput.max = maxDate;

                      fieldContainer8.appendChild(salesStartLabel);
                      fieldContainer8.appendChild(salesStartInput);

                      // Redemption Start Time Field
                      const salesStartTimeLabel =
                        document.createElement("label");
                      salesStartTimeLabel.classList.add("input-label-4");
                      salesStartTimeLabel.textContent = "Sales Start Time";

                      const salesStartTimeInput =
                        document.createElement("input");
                      salesStartTimeInput.classList.add("input-5");
                      salesStartTimeInput.type = "time";

                      salesStartTimeInput.value = offer.sales_start_time;
                      redemStartTimeInput.min = currentFormattedTime;
                      redemStartTimeInput.max = maxFormattedTime;

                      fieldContainer9.appendChild(salesStartTimeLabel);
                      fieldContainer9.appendChild(salesStartTimeInput);

                      // Sales End Date Field
                      const salesEndDateLabel = document.createElement("label");
                      salesEndDateLabel.classList.add("input-label-4");
                      salesEndDateLabel.textContent = "Sales End Date";

                      const salesEndDate = document.createElement("input");
                      salesEndDate.classList.add("input-5");
                      salesEndDate.type = "date";

                      salesEndDate.value = offer.sales_end_date;
                      salesEndDate.min = currentDate;
                      salesEndDate.max = maxDate;

                      fieldContainer10.appendChild(salesEndDateLabel);
                      fieldContainer10.appendChild(salesEndDate);

                      // Redemption End Time Field
                      const salesEndTimeLabel = document.createElement("label");
                      salesEndTimeLabel.classList.add("input-label-4");
                      salesEndTimeLabel.textContent = "Redemption End Time";

                      const salesEndTimeInput = document.createElement("input");
                      salesEndTimeInput.classList.add("input-5");
                      salesEndTimeInput.type = "time";

                      salesEndTimeInput.value = offer.sales_end_time;
                      salesStartTimeInput.min = currentFormattedTime;
                      salesStartTimeInput.max = maxFormattedTime;

                      fieldContainer11.appendChild(salesEndTimeLabel);
                      fieldContainer11.appendChild(salesEndTimeInput);

                      // Offer Inclusions Field
                      const inclusionsLabel = document.createElement("label");
                      inclusionsLabel.classList.add("input-label-4");
                      inclusionsLabel.textContent = "Inclusions";

                      const inclusionsTextarea =
                        document.createElement("textarea");
                      inclusionsTextarea.classList.add("textarea-5");
                      inclusionsTextarea.name = "description";
                      inclusionsTextarea.placeholder =
                        "Enter inclusions here...";
                      inclusionsTextarea.rows = 3; // Adjust the number of rows as needed
                      inclusionsTextarea.value = offer.inclusions;

                      fieldContainer15.appendChild(inclusionsLabel);
                      fieldContainer15.appendChild(inclusionsTextarea);

                      // Offer Exclusions Field
                      const exclusionsLabel = document.createElement("label");
                      exclusionsLabel.classList.add("input-label-4");
                      exclusionsLabel.textContent = "Exclusions";

                      const exclusionsTextarea =
                        document.createElement("textarea");
                      exclusionsTextarea.classList.add("textarea-5");
                      exclusionsTextarea.name = "description";
                      exclusionsTextarea.placeholder =
                        "Enter exclusions here...";
                      exclusionsTextarea.rows = 3; // Adjust the number of rows as needed
                      exclusionsTextarea.value = offer.exclusions;

                      fieldContainer16.appendChild(exclusionsLabel);
                      fieldContainer16.appendChild(exclusionsTextarea);

                      // Offer Description Field
                      const descriptionLabel = document.createElement("label");
                      descriptionLabel.classList.add("input-label-4");
                      descriptionLabel.textContent = "Offer Description";

                      const descriptionTextarea =
                        document.createElement("textarea");
                      descriptionTextarea.classList.add("textarea-5");
                      descriptionTextarea.name = "description";
                      descriptionTextarea.placeholder =
                        "Enter description here...";
                      descriptionTextarea.rows = 4; // Adjust the number of rows as needed
                      descriptionTextarea.value = offer.description;

                      fieldContainer12.appendChild(descriptionLabel);
                      fieldContainer12.appendChild(descriptionTextarea);

                      // Offer Redemption Instructions Field
                      const redemInsLabel = document.createElement("label");
                      redemInsLabel.classList.add("input-label-4");
                      redemInsLabel.textContent = "Redemption Instructions";

                      const redemInsTextarea =
                        document.createElement("textarea");
                      redemInsTextarea.classList.add("textarea-5");
                      redemInsTextarea.name = "description";
                      redemInsTextarea.placeholder =
                        "Enter description here...";
                      redemInsTextarea.rows = 4; // Adjust the number of rows as needed
                      redemInsTextarea.value = offer.description;

                      fieldContainer17.appendChild(redemInsLabel);
                      fieldContainer17.appendChild(redemInsTextarea);

                      // Offer Duration Field

                      const offerDurationLabel =
                        document.createElement("label");
                      offerDurationLabel.classList.add("input-label-4");
                      offerDurationLabel.textContent =
                        "Offer Duration in Minutes";

                      const offerDurationSelect =
                        document.createElement("select");
                      offerDurationSelect.classList.add("input-5");
                      offerDurationSelect.name = "duration";

                      // Add options for durations from 1 to 600 minutes with intervals
                      for (let i = 5; i <= 600; i += 5) {
                        const option = document.createElement("option");
                        option.value = offer.duration;
                        option.textContent = `${i}`;
                        offerDurationSelect.appendChild(option);
                      }

                      fieldContainer2.appendChild(offerDurationLabel);
                      fieldContainer2.appendChild(offerDurationSelect);

                      // Reviews Count Field
                      const reviewsCountLabel = document.createElement("label");
                      reviewsCountLabel.classList.add("input-label-4");
                      reviewsCountLabel.textContent = "Reviews Count";

                      const reviewsCountInput = document.createElement("input");
                      reviewsCountInput.classList.add("input-5");
                      reviewsCountInput.type = "number";
                      reviewsCountInput.name = "reviewsCount";
                      reviewsCountInput.min = 0; // Set minimum value to 0

                      fieldContainer19.appendChild(reviewsCountLabel);
                      fieldContainer19.appendChild(reviewsCountInput);

                      // Reviews Average Field
                      const reviewsAverageLabel =
                        document.createElement("label");
                      reviewsAverageLabel.classList.add("input-label-4");
                      reviewsAverageLabel.textContent = "Reviews Average";

                      const reviewsAverageInput =
                        document.createElement("input");
                      reviewsAverageInput.classList.add("input-5");
                      reviewsAverageInput.type = "number";
                      reviewsAverageInput.name = "reviewsAverage";
                      reviewsAverageInput.step = 0.01; // Allow two decimal places
                      reviewsAverageInput.min = 0; // Set minimum value to 0

                      fieldContainer20.appendChild(reviewsAverageLabel);
                      fieldContainer20.appendChild(reviewsAverageInput);

                      // Associated Program Field
                      const associatedProgramLabel =
                        document.createElement("label");
                      associatedProgramLabel.classList.add("input-label-4");
                      associatedProgramLabel.textContent = "Associated Program";

                      const associatedProgram = programData.find(
                        (program) =>
                          program.airtable_id === offer.associated_program
                      );

                      console.log(associatedProgram);
                      // Get the dropdown element
                      const associatedProgramSelect =
                        document.createElement("select");
                      associatedProgramSelect.classList.add("input-5");
                      associatedProgramSelect.name = "program";

                      // Populate dropdown with options
                      programNames.forEach(function (program) {
                        var option = document.createElement("option");
                        option.text = program;
                        option.value = program;
                        associatedProgramSelect.appendChild(option);
                      });

                      // Find index of associated program
                      const associatedProgramIndex = programNames.indexOf(
                        associatedProgram.name
                      );

                      // Set the selected index
                      associatedProgramSelect.selectedIndex =
                        associatedProgramIndex;

                      // Add event listener to handle changes
                      associatedProgramSelect.addEventListener(
                        "change",
                        function () {
                          var selectedProgram =
                            associatedProgramSelect.options[
                              associatedProgramSelect.selectedIndex
                            ].value;
                          console.log("Selected Program: ", selectedProgram);
                          // You can perform any actions based on the selected program here
                        }
                      );

                      // Append label and select element to the form
                      fieldContainer21.appendChild(associatedProgramLabel);
                      fieldContainer21.appendChild(associatedProgramSelect);

                      // Associated Regions Field
                      const associatedRegionLabel =
                        document.createElement("label");
                      associatedRegionLabel.classList.add("input-label-4");
                      associatedRegionLabel.textContent = "Associated Region";

                      const associatedRegion = regionsData.find(
                        (region) =>
                          region.airtable_id === offer.associated_regions
                      );

                      console.log(associatedRegion);
                      // Get the dropdown element
                      const associatedRegionSelect =
                        document.createElement("select");
                      associatedRegionSelect.classList.add("input-5");
                      associatedRegionSelect.name = "program";

                      // Populate dropdown with options
                      regionNames.forEach(function (region) {
                        var option = document.createElement("option");
                        option.text = region;
                        option.value = region;
                        associatedRegionSelect.appendChild(option);
                      });

                      // Find index of associated program
                      const associatedRegionIndex = regionNames.indexOf(
                        associatedRegion.name
                      );

                      // Set the selected index
                      associatedRegionSelect.selectedIndex =
                        associatedRegionIndex;

                      // Add event listener to handle changes
                      associatedRegionSelect.addEventListener(
                        "change",
                        function () {
                          var selectedRegion =
                            associatedRegionSelect.options[
                              associatedRegionSelect.selectedIndex
                            ].value;
                          console.log("Selected Region: ", selectedRegion);
                          // You can perform any actions based on the selected program here
                        }
                      );

                      // Append label and select element to the form
                      fieldContainer22.appendChild(associatedRegionLabel);
                      fieldContainer22.appendChild(associatedRegionSelect);

                      const offerFlexBox = document.createElement("div");
                      offerFlexBox.classList.add("offers-flex_box");

                      const offerFlexBox2 = document.createElement("div");
                      offerFlexBox2.classList.add("offers-flex_box");

                      const offerFlexBox3 = document.createElement("div");
                      offerFlexBox3.classList.add("offers-flex_box");

                      const offerFlexBox4 = document.createElement("div");
                      offerFlexBox4.classList.add("offers-flex_box");

                      const offerFlexBox5 = document.createElement("div");
                      offerFlexBox5.classList.add("offers-flex_box");

                      const offerFlexBox6 = document.createElement("div");
                      offerFlexBox6.classList.add("offers-flex_box");

                      const offerFlexBox7 = document.createElement("div");
                      offerFlexBox7.classList.add("offers-flex_box");

                      const offerFlexBox8 = document.createElement("div");
                      offerFlexBox8.classList.add("offers-flex_box");

                      const offerFlexBox9 = document.createElement("div");
                      offerFlexBox9.classList.add("offers-flex_box");

                      const offerFlexBox10 = document.createElement("div");
                      offerFlexBox10.classList.add("offers-flex_box");

                      offerFlexBox.appendChild(fieldContainer4);
                      offerFlexBox.appendChild(fieldContainer5);
                      offerFlexBox2.appendChild(fieldContainer6);
                      offerFlexBox2.appendChild(fieldContainer7);
                      offerFlexBox3.appendChild(fieldContainer8);
                      offerFlexBox3.appendChild(fieldContainer9);
                      offerFlexBox4.appendChild(fieldContainer10);
                      offerFlexBox4.appendChild(fieldContainer11);
                      offerFlexBox5.appendChild(fieldContainer3);
                      offerFlexBox5.appendChild(fieldContainer2);
                      offerFlexBox6.appendChild(fieldContainer13);
                      offerFlexBox6.appendChild(fieldContainer14);
                      offerFlexBox7.appendChild(fieldContainer15);
                      offerFlexBox7.appendChild(fieldContainer16);
                      offerFlexBox8.appendChild(fieldContainer17);
                      offerFlexBox8.appendChild(fieldContainer18);
                      offerFlexBox9.appendChild(fieldContainer19);
                      offerFlexBox9.appendChild(fieldContainer20);
                      offerFlexBox10.appendChild(fieldContainer21);
                      offerFlexBox10.appendChild(fieldContainer22);

                      // Append elements to form
                      form.appendChild(fieldContainer);
                      form.appendChild(fieldContainer12);
                      form.appendChild(offerFlexBox5);
                      form.appendChild(offerFlexBox7);
                      form.appendChild(offerFlexBox);
                      form.appendChild(offerFlexBox2);
                      form.appendChild(offerFlexBox3);
                      form.appendChild(offerFlexBox4);
                      form.appendChild(offerFlexBox6);
                      form.appendChild(offerFlexBox8);
                      form.appendChild(offerFlexBox9);
                      form.appendChild(offerFlexBox10);

                      // Create save button
                      const saveBtnContainer = document.createElement("div"); // Container for the button
                      saveBtnContainer.style.textAlign = "left"; // Align the button to the left
                      saveBtnContainer.style.display = "flex"; // Set display to flex
                      saveBtnContainer.style.justifyContent = "flex-start"; // Align items to the left
                      saveBtnContainer.style.marginTop = "2rem";

                      // Create save button
                      const saveBtn = document.createElement("button");
                      saveBtn.classList.add("button-primary");

                      saveBtn.style.marginRight = "2rem";

                      saveBtn.type = "button"; // Change type to button
                      saveBtn.textContent = "Save Changes"; // Change text to "Save"

                      // Add event listener for save button
                      saveBtn.addEventListener("click", async function () {
                        // Get the form data
                        const formData = new FormData(form);
                        const name = formData.get("name");
                        const status = formData.get("status");

                        // Update the offer data in Supabase
                        try {
                          const { data, error } = await _supabase
                            .from("Offers")
                            .update({ offer_name: name, cr_status: status })
                            .eq("product_code", offer.product_code); // Assuming you have an offer_id field

                          if (error) {
                            throw error;
                          }

                          console.log("Offer updated successfully:", data);

                          const successMessage =
                            document.getElementById("success-message");
                          successMessage.textContent =
                            "Offer updated successfully!";
                          successMessage.style.display = "block";

                          offersElement.innerHTML = "";
                          offersElement.appendChild(successMessage);

                          // Reload offers after 3 seconds (adjust delay as needed)
                          setTimeout(() => {
                            window.location.reload(); // Reload the page to fetch updated offers
                          }, 3000);

                          // Optionally, you can update the UI to reflect the changes
                        } catch (error) {
                          console.error("Error updating offer:", error.message);
                          // Handle error
                        }
                      });

                      // Create cancel button
                      const cancelBtn = document.createElement("button");
                      cancelBtn.classList.add("button-secondary");

                      cancelBtn.textContent = "Cancel";
                      cancelBtn.addEventListener("click", function () {
                        // Restore original elements and hide the form
                        offerCode.style.display = "block";
                        offerStatus.style.display = "block";
                        editButton.style.display = "block";

                        form.remove();
                      });

                      saveBtnContainer.appendChild(saveBtn);
                      saveBtnContainer.appendChild(cancelBtn);
                      form.appendChild(saveBtnContainer);
                      offersElement.appendChild(form);
                    }

                    // Call the function to create the form
                    createForm();

                    // Remove the edit button after creating the form
                    offerStatus.style.display = "none";
                    editButton.style.display = "none";
                  });

                  // Append offer info tableHolder

                  tableHolder.appendChild(offersElement);
                  offersElement.appendChild(offerDiv);
                  offerDiv.appendChild(offerName);
                  offerDiv.appendChild(offerCode);
                  offerDiv.appendChild(offerStatus);

                  offerDiv.appendChild(editButton);

                  spinner.remove();
                });
              } else {
                console.log("No offer data found for this supplier.");
                // Handle case when no offer data is found
              }
            } else {
              console.error("Element with ID 'company-name' not found.");
            }
          } else {
            throw new Error(
              "Multiple associated suppliers found in user profiles."
            );
          }
        } else {
          // Handle case when User_Profiles is not an array
        }
      }
    } catch (error) {
      console.error("Error fetching user profiles:", error.message);
      spinner.remove();
    }
  } else {
    console.log("No user data found in local storage");
  }
});
