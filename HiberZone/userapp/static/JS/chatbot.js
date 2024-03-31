
function toggleChatbot() {
    console.log("Chatbot icon clicked");
    var chatbotContainer = document.getElementById("chatbot-container");
    
    // Toggle the 'active' class
    chatbotContainer.classList.toggle("active");
    
    // If the chatbot container is active, clear its content and start a new conversation
    if (chatbotContainer.classList.contains("active")) {
        clearChatbotContainer(); // Clear previous messages
        startConversation(); // Start or continue the conversation
    }
    
    // Show or hide the chatbot container smoothly
    if (chatbotContainer.classList.contains("active")) {
        setTimeout(function() {
            chatbotContainer.classList.add("active"); // Add the 'active' class to trigger the transition
        }, 20000); // Delay to ensure the element is visible before applying the transition
    }
    // Show the chatbot container smoothly
    document.getElementById("floating-chatbot").style.display = "block";
    setTimeout(function() {
        chatbotContainer.classList.add("active"); // Add the 'active' class to trigger the transition
    }, 20000); // Delay to ensure the element is visible before applying the transition
}

function clearChatbotContainer() {
    var chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = ""; // Clear the content of the chat messages container
}



  // Function to simulate a typing animation for the chatbot
  function simulateTyping() {
    const chatMessages = document.getElementById("chat-messages");
    const typingMessage = document.createElement("div");
    typingMessage.innerHTML = "<em>Chatbot is typing...</em>";
    chatMessages.appendChild(typingMessage);
    scrollToBottom(); // Scroll to the bottom of the chat messages
  }

  // Function to simulate the chatbot initiating a conversation
  function startConversation() {
    setTimeout(() => {
      const welcomeMessage = "Hi, Iam PAL - Hiber-Zone's personalized chatbot!, How may I assist you?";
      const Message = "How are you feeling today?";
      displayMessage("PAL", welcomeMessage); // Display welcome message
      displayMessage("PAL", Message); // Display welcome message
      setTimeout(showUserInput, 500); 
    }, 1000, 3000); // Adjust delay as needed
  }

  // Function to display a message in the chat
  function displayMessage(sender, message) {
    const chatMessages = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageDiv);
    scrollToBottom(); // Scroll to the bottom of the chat messages
  }

  // Function to scroll to the bottom of the chat messages
  function scrollToBottom() {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to send a message
  function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value;
    userInput.value = ""; // Clear the user input

    displayMessage("You", message); // Display user message
    userInput.style.display = "none"; // Hide the user input box

    // Simulate typing animation after user sends a message
    setTimeout(() => {
      simulateTyping(); // Simulate typing animation
      setTimeout(() => {
        const response = "Thank you for your message!";
        displayMessage("PAL", response); // Display chatbot response
        showUserInput(); // Show the user input box again
      }, 4000); // Adjust delay as needed
    }, 1000); // Adjust delay as needed
  }

  // Function to show the user input text box
// Function to show the user input text box and align it in the center
// Function to show the user input text box and send button next to each other with some gap
function showUserInput() {
  const userInput = document.getElementById("user-input");
  const sendButton = document.querySelector("#chatbot-container button");

  userInput.style.display = "inline-block"; // Show the user input box
  userInput.style.border = "1px solid blue";
  userInput.style.color = "blue";
  userInput.style.width = "calc(70%)"; // Adjusted width to accommodate send button
  userInput.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  userInput.style.borderRadius = "5px";
  userInput.style.marginBottom = "5px";
  userInput.style.paddingLeft = "7px";
  userInput.style.marginRight = "18px"; // Add some margin to separate from the send button
  userInput.style.align = "left";
 

  sendButton.style.display = "inline-block"; // Show the send button
  sendButton.style.padding = "4px 8px";
  sendButton.style.backgroundColor = "green";
  sendButton.style.color = "white";
  sendButton.style.border = "Transparent";
  sendButton.style.borderRadius = "5px";
  sendButton.style.cursor = "pointer";
  sendButton.style.fontSize = "smaller";
  sendButton.style.alignSelf = "right";
  sendButton.style.marginBottom = "2px";

}
  // Automatically start the conversation when the page loads
  window.onload = function() {
    toggleChatbot(); // Show the chatbot and start the conversation
  };

  // Your existing code below
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");

  chatMessages.style.padding = "5px";

  // Array of sad synonyms
  const sadKeywords = ["sad", "bad", "not fine", "not good","not happy", "could be better", "depressing", "disappointing", "depressed", "like crying", "unhappy", "depressed", "down", "gloomy", "melancholy", "miserable", "blue", "despondent", "disheartened", "heartbroken", "sorrowful", "tearful", "crying",];
// Function to send a message
// Function to send a message
// Modify the sendMessage function to call sendSelectedOptions
function sendMessage() {
  const message = userInput.value;

  userInput.value = "";

  // Check if the user's message contains any sad keywords
  

  if (containsSadKeyword(message) ) {
    displayMessage("PAL", "Oh, I'm sorry to hear that. Can any of the following factors be the reason for this feeling?");
    displayCheckboxOptions(["Career confusion", "Family disputes", "Conflicts with friends", "Work pressure", "Fear of future", "Missing loved ones", "Studies pressure"]);
    handleOptionSelectionAndSend() // Call sendSelectedOptions
  } 
}


// Function to handle sending the selected options
function handleOptionSelectionAndSend() {
    const selectedOptions = Array.from(document.querySelectorAll("input[name='options[]']:checked"))
                                   .map(checkbox => checkbox.value);
    if (selectedOptions.includes("Career confusion")) {
        const react = "I understand it can be very overwhelming when you think about a career path and decisions regarding it. I suggest you go through the recover option of HiberZone where you can access motivational elements like TED talks and videos.";
        displayMessage("PAL", react);
        // Display the recover button
        displayRecoverButton();
        
        // Continue the conversation after a delay
        setTimeout(() => {
            const nextMessage = "How may I further assist you?";
            displayMessage("PAL", nextMessage);
            // Display the user input box again
        }, 4000); // Adjust delay as needed
    }
  }



// Function to handle sending the selected options when send button is clicked
function handleSendButtonClicked() {
  // Call handleOptionSelectionAndSend when send button is clicked
  handleOptionSelectionAndSend();
}

// Attach handleSendButtonClicked as the click event listener for the send button
document.getElementById("send-button").addEventListener("click", handleSendButtonClicked);


// Call sendSelectedOptions after displayCheckboxOptions is called
function displayCheckboxOptions(options) {
  const optionsHtml = options.map(option => `<label class="chat-option-label"><input type="checkbox" name="options[]" value="${option}"> ${option}</label>`).join("");
  chatMessages.innerHTML += `<div class="chat-options">${optionsHtml}</div>`;
}

  // Function to check if a message contains any sad keywords
  function containsSadKeyword(message) {
    message = message.toLowerCase();
    return sadKeywords.some(keyword => message.includes(keyword));
  }

  // Function to display a message in the chat
  function displayMessage(sender, message) {
    // Create a new div element for the message
    const messageDiv = document.createElement("div");

    // Set the class based on the sender
    messageDiv.className = sender === "You" ? "user-message" : "chatbot-message";

    // Set the content of the message div
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;

    // Append the message div to the chat messages container
    chatMessages.appendChild(messageDiv);
  }

  // Function to display options in the chat
  function displayOptions(options) {
    const optionsHtml = options.map(option => `<button class="chat-option-button" onclick="selectOption('${option}')">${option}</button>`).join(" ");
    chatMessages.innerHTML += `<div class="chat-options">${optionsHtml}</div>`;
  }

  // Function to display options in the chat
function displayOptions(options) {
  const optionsHtml = options.map(option => `<button class="chat-option-button" onclick="selectOption('${option}')">${option}</button>`).join(" ");
  chatMessages.innerHTML += `<div class="chat-options">${optionsHtml}</div>`;
}

// Function to display options as checkboxes
function displayCheckboxOptions(options) {
      const optionsHtml = options.map(option => `<label class="chat-option-label"><input type="checkbox" name="options[]" value="${option}"> ${option}</label>`).join("");
      chatMessages.innerHTML += `<div class="chat-options">${optionsHtml}</div>`;
    }

// Function to display the recover button
function displayRecoverButton() {
    const recoverButton = document.createElement("button");
    recoverButton.textContent = "Recover";
    recoverButton.classList.add("recover"); // Add the "recover-button" class
    recoverButton.addEventListener("click", redirectToRecoverPage);
    chatMessages.appendChild(recoverButton);
}
// Event handler to redirect to the recover.html page
function redirectToRecoverPage() {
    // Assuming the recover.html page is in the same directory
    window.location.href = "recover/";
    window.open() ="_self"
}
