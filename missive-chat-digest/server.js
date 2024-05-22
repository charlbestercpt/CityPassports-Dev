const crypto = require("crypto");
const email = localStorage.getItem("_ms-mem").auth.email;

// Replace with your actual secret key and user email
const secretKey = "ca2887525e1ffe209063b4e690389ab1";
const userEmail = email;

// Generate the digest
const digest = crypto
  .createHmac("sha256", secretKey)
  .update(userEmail)
  .digest("hex");

console.log(`Digest for ${userEmail}: ${digest}`);
//node missive-chat-digest/server.js
