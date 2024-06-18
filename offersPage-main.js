var offerType = offertype;

if (offerType === "[Travel] Wholesale - Viator") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-travelWholesaleViator.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-travelWholesaleViator.js";
  script.onload = function () {
    console.log("[Travel] Wholesale - Viator script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Travel] Wholesale - LIVN") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-travelWholesaleLivn.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-travelWholesaleLivn.js";
  script.onload = function () {
    console.log("[Travel] Wholesale - LIVN script loaded successfully.");
  };
  script.onerror = function () {
    console.error("[Travel] Wholesale - LIVN Error loading script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Travel] Direct - Free Sell Activities") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log(
      "[Travel] Direct - Free Sell Activities script loaded successfully."
    );
  };
  script.onerror = function () {
    console.error(
      "Error loading [Travel] Direct - Free Sell Activities script."
    );
  };
  document.body.appendChild(script);
} else if (offerType === "[Travel] Direct - Scan QR Code") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[Travel] Direct - Scan QR Code script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [Travel] Direct - Scan QR Code script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Travel] Direct - Referral URL") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[Travel] Direct - Referral URL script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [Travel] Direct - Referral URL script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Travel] Direct -  LIVN Direct") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[Travel] Direct -  LIVN Direct script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [Travel] Direct -  LIVN Direct script.");
  };
  document.head.appendChild(script);
} else if (offerType === "[F&B] Direct - Prepaid Voucher") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[F&B] Direct - Prepaid Voucher script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [F&B] Direct - Prepaid Voucher script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[F&B] Direct - Referral URL") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[F&B] Direct - Referral URL script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [F&B] Direct - Referral URL script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Retail] Direct - Referral URL") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[Retail] Direct - Referral URL script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [Retail] Direct - Referral URL script.");
  };
  document.body.appendChild(script);
} else if (offerType === "[Retail] Direct - Prepay") {
  var script = document.createElement("script");
  script.src =
    //"http://127.0.0.1:5501/offersPage-fbDirectVoucher.js"
    "https://cdn.jsdelivr.net/gh/charlbestercpt/CityPassports-Dev@v1.6.2.4/offersPage-fbDirectUrl.js";
  script.onload = function () {
    console.log("[Retail] Direct - Prepay script loaded successfully.");
  };
  script.onerror = function () {
    console.error("Error loading [Retail] Direct - Prepay script.");
  };
  document.body.appendChild(script);
} else {
  console.log("Unknown Offer Type");
}
