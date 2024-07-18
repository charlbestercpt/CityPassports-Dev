document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("verificationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Get the value entered by the user
      const userInput = document.getElementById("codeInput").value;
      // Prepare the data to be sent in the request
      const data = { code: userInput };
      // Use fetch API to send the data to the webhook
      fetch("https://hook.us1.make.com/mb16katkxvgi6bm6uykkzvsp7owwmlr7", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          // Use the response status to determine if the operation was successful
          if (response.status === 200) {
            return response.json().then((data) => {
              console.log(data);
              // If the HTTP status code is 200, show "verified"
              // document.getElementById("verified").style.display = "flex";
              // document.getElementById("formBlock").style.display = "none";
              // document.getElementById("address").style.display = "none";

              // document.getElementById("formSpacer").style.display = "none";
              // document.getElementById("formHeading").style.display = "none";
              // document.getElementById("formSpacer2").style.display = "none";
              // document.getElementById("formText").style.display = "none";
              // document.getElementById("codeInput").style.display = "none";
              // document.getElementById("formButton").style.display = "none";
              document.getElementById("not-verified").style.display = "none";
            });
          } else {
            // Handle non-200 responses
            console.log("Error with status code:", response.status);
            // If the HTTP status code is not 200, show "not-verified"
            document.getElementById("notVerified").style.display = "flex";
            document.getElementById("verified").style.display = "none";
            document.getElementById("address").style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Optionally handle errors, for example, by showing an error message
        });
    });
});
