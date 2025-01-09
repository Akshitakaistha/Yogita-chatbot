import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null); // Reference to the chat container for auto-scroll

  // Introductory message when chatbot is first loaded
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm Yogita, your Breast Cancer Awareness Assistant. You can ask me anything related to breast cancer, such as symptoms, prevention, treatments, or resources. How can I assist you today?",
        sender: "yogita",
      },
    ]);
  }, []);

  // Function to send message and fetch response
  const sendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setLoading(true);

    try {
      let answer = "";
      // Check if the message contains the word "breast"
      if (message.toLowerCase().includes("breast")) {
        if (message.toLowerCase().includes("symptoms")) {
          answer = `Some common symptoms of breast cancer include:\n- A lump in the breast or underarm.\n- Unexplained pain in the breast.\n- Changes in the size or shape of the breast.`;
        } else if (message.toLowerCase().includes("prevention")) {
          answer = `To prevent breast cancer, you should:\n- Get regular screening.\n- Avoid alcohol consumption.\n- Maintain a healthy diet and weight.\n- Exercise regularly.`;
        } else if (message.toLowerCase().includes("treatment")) {
          answer = `Common treatments for breast cancer include:\n- Surgery (e.g., mastectomy).\n- Chemotherapy.\n- Radiation therapy.\n- Hormone therapy and immunotherapy.`;
        } else {
          // Default response when "breast" is mentioned but no specific keyword
          answer = `Breast cancer is a type of cancer that begins in the cells of the breast. It's one of the most common cancers among women. Early detection through screening, such as mammograms, can help save lives. Symptoms vary and may include lumps, pain, and changes in the breast's shape or size. Prevention includes maintaining a healthy lifestyle and regular screening.`;
        }
      } else {
        answer = `I'm here to help with information related to breast cancer. You can ask me about symptoms, prevention, treatments, or general information. Please mention "breast" or related terms.`;
      }

      // Update chat messages with the response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: answer, sender: "yogita" },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong. Please try again later.", sender: "yogita" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput("");
    }
  };

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <h2>Yogita: Breast Cancer Awareness Chatbot</h2>
        <div className="messages" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}

        </div>
        <form onSubmit={handleSend}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me anything about breast cancer..."
            autoFocus
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
