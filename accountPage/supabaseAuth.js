// Ensure supabase is properly imported or available
const { createClient } = supabase;

const _supabase = createClient(
  "https://impecimchocfsfsdgrvg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
);

console.log("Supabase Initialized");
const user = localStorage.getItem("_ms-mem");
const userData = JSON.parse(user);
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
