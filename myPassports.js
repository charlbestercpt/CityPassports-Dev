window.onload = function () {
  // Assuming myPasses, myBookings, and myProfile have been correctly selected earlier in your script
  const myPasses = document.getElementById("my-passes");
  const myBookings = document.getElementById("my-bookings");
  const myProfile = document.getElementById("my-profile");

  myPasses.style.display = "block"; // Show myPasses
  myBookings.style.display = "none"; // Hide myBookings
  myProfile.style.display = "none"; // Hide myProfile
};

document.addEventListener("DOMContentLoaded", function () {
  // Assuming myPasses and myProfile have been correctly selected earlier in your script
  const myPasses = document.getElementById("my-passes");
  const myBookings = document.getElementById("my-bookings");
  const myProfile = document.getElementById("my-profile");
  const passesButton = document.getElementById("passes_button");
  const bookingsButton = document.getElementById("bookings_button");
  const profileButton = document.getElementById("profile_button");

  passesButton.addEventListener("click", function () {
    myPasses.style.display = "block"; // Hide myPasses
    myProfile.style.display = "none"; // Hide myProfile
    myBookings.style.display = "none";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });

  bookingsButton.addEventListener("click", function () {
    myPasses.style.display = "none"; // Hide myPasses
    myProfile.style.display = "none"; // Hide myProfile
    myBookings.style.display = "block";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });

  profileButton.addEventListener("click", function () {
    myPasses.style.display = "none"; // Hide myPasses
    myProfile.style.display = "block"; // Hide myProfile
    myBookings.style.display = "none";
    // Optionally, if you want to show myBookings when passed_button is clicked:
    // const myBookings = document.getElementById("my-bookings");
    // myBookings.style.display = "block";
  });
});
