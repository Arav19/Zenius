const API_KEY = "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";  // Replace with your OpenAI API key
const userInput = document.getElementById("userInput");
const chatLog = document.getElementById("chatLog");

// Function to display messages
function displayMessage(message, sender) {
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", sender);
    messageElem.textContent = message;
    chatLog.appendChild(messageElem);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to handle user input and API response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, "user");
    userInput.value = "";  // Clear input field

    // Prepare data for API request
    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
    };

    // Fetch response from OpenAI API
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const botMessage = result.choices[0].message.content;

        // Display bot response
        displayMessage(botMessage, "bot");
    } catch (error) {
        displayMessage("Sorry, something went wrong.", "bot");
        console.error("Error:", error);
    }
}

// Event listener for Enter key press
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
