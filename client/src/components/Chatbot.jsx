import { useState, useContext } from "react";
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

  // checks to see if the key pressed is Enter to be similar to pushing send button
  const handleKeyDown = (pressedKey) => {
    if (pressedKey === "Enter") sendMessage();
  };

  const sendMessage = async () => {
    // remove white spaces from front and back of user input
    if (userInput.trim() === "") {
      return;
    }

    // adds the user message to the chatlog
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "user", content: userInput },
    ]);
    setUserInput("");

    // get response from openai api
    const response = await axios.post(
      "/api/chat",
      { userInput },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // grab message from response
    const generatedMessage = response.data.advice;

    // add generated message to chat log
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "Money Mentor", content: generatedMessage },
    ]);
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
              onKeyDown={(e) => handleKeyDown(e.key)}
              placeholder="Type your message"
              className="user-input"
              maxLength={400}
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
