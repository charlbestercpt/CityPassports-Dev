const myPasses = document.getElementById("my-passes");
const myBookings = document.getElementById("my-bookings");
const myProfile = document.getElementById("my-profile");
const passesButton = document.getElementById("passes_button");
const bookingsButton = document.getElementById("bookings_button");
const profileButton = document.getElementById("profile_button");
const navMenu = document.getElementById("navMenu");
const navMobile = document.getElementById("navMobile");
const navOverlay = document.getElementById("navOverlay");

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
    myPasses.style.display = "block";
    myBookings.style.display = "none";
    myProfile.style.display = "none";
    // Possibly remove click toggle behavior or adjust as needed for desktop
  } else {
    // Adjust UI for smaller screens
    myPasses.style.display = "block";
    myBookings.style.display = "none";
    myProfile.style.display = "none";
    navMenu.style.display = "none";
    // The click event listener is already set, no need to add it again
  }
}

// Call adjustUIForScreenSize on initial load and on resize event
document.addEventListener("DOMContentLoaded", adjustUIForScreenSize);
window.addEventListener("resize", adjustUIForScreenSize);

passesButton.addEventListener("click", function () {
  myPasses.style.display = "block"; // Show myPasses
  myProfile.style.display = "none"; // Hide myProfile
  myBookings.style.display = "none"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

bookingsButton.addEventListener("click", function () {
  myPasses.style.display = "none"; // Hide myPasses
  myProfile.style.display = "none"; // Hide myProfile
  myBookings.style.display = "block"; // Show myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});

profileButton.addEventListener("click", function () {
  myPasses.style.display = "none"; // Hide myPasses
  myProfile.style.display = "block"; // Show myProfile
  myBookings.style.display = "none"; // Hide myBookings
  if (isMobile()) {
    navMenu.style.display = "none"; // Hide navMenu on mobile
  }
});
