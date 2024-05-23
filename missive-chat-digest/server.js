async function setupChat() {
  // Check if _ms-mem is in local storage
  const storedData = localStorage.getItem("_ms-mem");
  let userEmail, fullName, digest;

  if (storedData) {
    const userData = JSON.parse(storedData);
    userEmail = userData.auth.email;
    const userFirstName = userData.customFields["first-name"];
    const userLastName = userData.customFields["last-name"];
    fullName = `${userFirstName} ${userLastName}`;
    digest = userData.customFields["chat-digest"];

    console.log(`Digest for ${userEmail}: ${digest}`);
  } else {
    console.log("_ms-mem not found in local storage.");
  }

  // Set up Missive Chat configuration
  window.MissiveChatConfig = {
    id: "9b5fc8a3-5929-4d75-8134-142a2fbcb6b7",
    user: storedData
      ? {
          name: fullName,
          email: userEmail,
          digest: digest,
        }
      : undefined,
    onReady: function () {
      console.log(
        "Missive Chat setup complete" +
          (storedData ? " with verification." : " without digest.")
      );
    },
    onVisitorIdentified: function ({ name, email }) {},
    onChatStarted: function ({ name, email }) {},
    onNewMessage: function (body) {},
    onOpen: function () {},
    onClose: function () {},
    chat: { hidden: true },
  };

  try {
    var s = document.createElement("script");
    s.async = true;
    s.src =
      "https://webchat.missiveapp.com/" +
      window.MissiveChatConfig.id +
      "/missive.js";
    if (document.head) document.head.appendChild(s);

    // Check if the button element exists by its ID
    var button = document.getElementById("concierge_nav");

    if (button) {
      var chatOpen = false;

      // Attach a click event listener to the button
      button.addEventListener("click", function () {
        if (!chatOpen) {
          window.MissiveChat.open();
          chatOpen = true;
        } else {
          window.MissiveChat.close();
          chatOpen = false;
        }
      });
    } else {
      console.log("Concierge navigation button not found.");
    }
  } catch (error) {
    console.error("Failed to set up Missive Chat:", error);
  }
}

setupChat(); // Initialize the chat setup
