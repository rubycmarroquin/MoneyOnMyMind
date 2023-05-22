import React, { useState, useContext } from "react";
import "../styles/Chatbot.css";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth0();

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "user", content: userInput },
    ]);
    setUserInput("");

    try {
      const response = await axios.post(
        "/api/chat",
        { userInput },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const generatedMessage = response.data.advice;

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { role: "Money Mentor", content: generatedMessage },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        {isOpen ? "Close Money Mentor" : "Open Money Mentor"}
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-log-container">
            {chatLog.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <p>
                  <span className={message.role === "user" ? `user` : `mentor`}>
                    {message.role === "user"
                      ? `${user.nickname}`
                      : "Money Mentor: "}
                  </span>
                </p>
                <span className="messageColor">{message.content}</span>
              </div>
            ))}
          </div>
          <div className="user-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message"
              className="user-input"
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
