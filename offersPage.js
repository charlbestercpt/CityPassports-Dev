import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "your-supabase-url";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Check for existing session
const session = supabase.auth.session();

if (session) {
  // User is authenticated
  console.log("User is authenticated", session.user);
} else {
  // User is not authenticated
  console.log("User is not authenticated");
}

// Function to log the offer type
function runOfferType(offerType) {
  if (offerType === "[Travel] Wholesale - Viator") {
    console.log("[Travel] Wholesale - Viator Offer");
  } else if (offerType === "[Travel] Wholesale - LIVN") {
    console.log("[Travel] Wholesale - LIVN Offer");
  } else if (offerType === "[Travel] Direct - Free Sell Activities") {
    console.log("[Travel] Direct - Free Sell Activities Offer");
  } else if (offerType === "[Travel] Direct - Scan QR Code") {
    console.log("[Travel] Direct - Scan QR Code Offer");
  } else if (offerType === "[Travel] Direct - Referral URL") {
    console.log("[Travel] Direct - Referral URL Offer");
  } else if (offerType === "[Travel] Direct -  LIVN Direct") {
    console.log("[Travel] Direct -  LIVN Direct Offer");
  } else if (offerType === "[F&B] Direct - Referral URL") {
    console.log("[F&B] Direct - Referral URL Offer");
  } else if (offerType === "[F&B] Direct - Prepaid Voucher") {
    console.log("[F&B] Direct - Prepaid Voucher Offer");
  } else if (offerType === "[Retail] Direct - Referral URL") {
    console.log("[Retail] Direct - Referral URL Offer");
  } else if (offerType === "[Retail] Direct - Prepay") {
    console.log("[Retail] Direct - Prepay Offer");
  } else if (offerType === "[Supplier] New Paltform Offer") {
    console.log("[Supplier] New Paltform Offer");
  } else {
    console.log("Unknown Offer Type");
  }
}

// Example usage
runOfferType(offerType);
