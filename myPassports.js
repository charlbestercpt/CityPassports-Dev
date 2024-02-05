window.onload = function () {
  // Assuming myPasses, myBookings, and myProfile have been correctly selected earlier in your script
  const myPasses = document.getElementById("my-passes");
  const myBookings = document.getElementById("my-bookings");
  const myProfile = document.getElementById("my-profile");
  const navMenu = document.getElementById("navMenu");
  const navMobile = document.getElementById("navMobile");

  myPasses.style.display = "block"; // Show myPasses
  myBookings.style.display = "none"; // Hide myBookings
  myProfile.style.display = "none"; // Hide myProfile
  navMenu.style.display = "none"; // Hide myProfile
};

document.addEventListener("DOMContentLoaded", function () {
  // Assuming myPasses and myProfile have been correctly selected earlier in your script
  const myPasses = document.getElementById("my-passes");
  const myBookings = document.getElementById("my-bookings");
  const myProfile = document.getElementById("my-profile");
  const passesButton = document.getElementById("passes_button");
  const bookingsButton = document.getElementById("bookings_button");
  const navMenu = document.getElementById("navMenu");
  const profileButton = document.getElementById("profile_button");
  const navMobile = document.getElementById("navMobile");
  const navOverlay = document.getElementById("navOverlay");

  navMobile.addEventListener("click", function () {
    // Check if navMenu is currently displayed
    if (navMenu.style.display === "block") {
      // If it is, hide it on this click
      navMenu.style.display = "none";
      navOverlay.style.display = "none";
    } else {
      // If it is hidden, show it on this click
      navMenu.style.display = "block";
      navOverlay.style.display = "block";
    }
  });

  passesButton.addEventListener("click", function () {
    myPasses.style.display = "block"; // Hide myPasses
    myProfile.style.display = "none"; // Hide myProfile
    myBookings.style.display = "none";
    navMenu.style.display = "none";
    navOverlay.style.display = "none";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });

  bookingsButton.addEventListener("click", function () {
    myPasses.style.display = "none"; // Hide myPasses
    myProfile.style.display = "none"; // Hide myProfile
    myBookings.style.display = "block";
    navMenu.style.display = "none";
    navOverlay.style.display = "none";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });

  profileButton.addEventListener("click", function () {
    myPasses.style.display = "none"; // Hide myPasses
    myProfile.style.display = "block"; // Hide myProfile
    myBookings.style.display = "none";
    navMenu.style.display = "none";
    navOverlay.style.display = "none";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });
});
