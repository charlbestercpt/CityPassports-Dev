document.addEventListener("DOMContentLoaded", async function () {
  const { createClient } = supabase;

  const _supabase = createClient(
    "https://impecimchocfsfsdgrvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
  );

  console.log("Supabase Instance: ", _supabase);

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const signInButton = document.getElementById("signInButton");

  signInButton.addEventListener("click", async function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
      try {
        let { data, error } = await _supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Supabase authentication failed:", error.message);
        } else {
          console.log("Supabase authentication successful:", data);
          localStorage.setItem("supabaseData", JSON.stringify(data));

          // Redirect to a specific page after successful authentication

          window.location.href = "https://www.cityrewards.io/supplier"; // Change the URL to your desired page
        }
      } catch (error) {
        console.error("Supabase authentication error:", error.message);
      }
    } else {
      console.log("Email and password are required.");
    }
  });
});
