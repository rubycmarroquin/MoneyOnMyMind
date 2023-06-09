import { useState, useContext } from "react";
import "../styles/Chatbot.css";
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

    const generatedMessage = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ userInput }),
    })
      .then((response) => response.json())
      .then((data) => data.advice);

    // add generated message to chat log
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "Money Mentor", content: generatedMessage },
    ]);
  };

  return (
    authToken && (
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
                    <span
                      className={message.role === "user" ? `user` : `mentor`}
                    >
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
    )
  );
};

export default Chatbot;
