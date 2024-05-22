async function setupChat() {
  const storedData = localStorage.getItem("_ms-mem");
  const userData = JSON.parse(storedData);
  const userEmail = userData.auth.email;
  const userFirstName = userData.customFields["first-name"];
  const userLastName = userData.customFields["last-name"];
  const digest = userData.customFields["chat-digest"];
  const fullName = `${userFirstName} ${userLastName}`;

  try {
    window.MissiveChatConfig = {
      id: "9b5fc8a3-5929-4d75-8134-142a2fbcb6b7",
      user: {
        name: fullName,
        email: userEmail,
        digest: digest,
      },
      onReady: function () {},
      onVisitorIdentified: function ({ name, email }) {},
      onChatStarted: function ({ name, email }) {},
      onNewMessage: function (body) {},
      onOpen: function () {},
      onClose: function () {},
      chat: { hidden: true },
    };

    var s = document.createElement("script");
    s.async = true;
    s.src =
      "https://webchat.missiveapp.com/" +
      window.MissiveChatConfig.id +
      "/missive.js";
    if (document.head) document.head.appendChild(s);

    // Get the button element by its ID
    var button = document.getElementById("concierge_nav");
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
  } catch (error) {
    console.error("Failed to set up Missive Chat:", error);
  }
}

setupChat(); // Initialize the chat setup
