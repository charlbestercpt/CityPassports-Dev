const { createClient } = supabase;
const _supabase = createClient(
  "https://impecimchocfsfsdgrvg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGVjaW1jaG9jZnNmc2RncnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzAwODQsImV4cCI6MjAyNTc0NjA4NH0.zW29Q4AOTWDFRzr9Eueu4YzEjqCG8WqxTA-hQO-dij0"
);

console.log("Supabase Instance: ", _supabase);

async function checkAuth() {
  const {
    data: { user },
  } = await _supabase.auth.getUser();
  if (!user) {
    console.log("User is not authenticated");
  } else {
    console.log("User is authenticated", user);
  }
}

checkAuth();
