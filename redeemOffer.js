document
  .getElementById("verificationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle response
        if (data.valid) {
          // If the webhook response indicates the code is valid, show "verified"
          document.getElementById("verified").style.display = "block";
          document.getElementById("not-verified").style.display = "none";
        } else {
          console.log("Error");
          // If the webhook response indicates the code is not valid, show "not-verified"
          document.getElementById("not-verified").style.display = "block";
          document.getElementById("verified").style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, for example, by showing an error message
      });
  });
