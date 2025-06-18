import React, { useState ,useEffect,useRef} from "react";
import assistantIcon from "../../asset/chat.png";
import "./Assistent.scss";
import Input from "../common/input/Input";
import { BiSolidSend } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { axiosClient } from "../../utils/AxiosClient";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRecommendedDish } from "../../redux/RecommendedDish/RecommendedDishReducer";

function Assistent() {
  const [openChat, setOpenChat] = useState(false);
  const [popupMessage, setPopUpMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const params=useParams();
  console.log(params);
  const dispatch =useDispatch();

  const chatEndRef = useRef(null);

  // Auto scroll effect
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function getSuggestedDishes(query,restroId){
    try {
        const response=await axiosClient.post("/assistant/search",{query,restroId} );
        console.log(response);
        dispatch(setRecommendedDish(response.data.result.recommendations))
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "I've suggested some dishes! Please check the recommended area." }
        ]);
    } catch (error) {
        console.log(error);
    }
  }

  const handleChatBoxOpen = (e) => {
    e.stopPropagation();
    setPopUpMessage(false);
    setOpenChat(!openChat);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);
  
    const loadingMessage = { sender: "bot", text: "Got it! Let me find some dishes for you..." };
    setMessages((prev) => [...prev, loadingMessage]);

    getSuggestedDishes(inputValue,params.restroId);
    setInputValue("");
    
  };

  return (
    <div className="assistant">
      <div onClick={handleChatBoxOpen} className="assistant-icon">
        <img src={assistantIcon} alt="" />
        {popupMessage && (
          <div className="pop-up-message">
            <p>
              Confused What to Order?? tell me about your taste, would love to
              suggest dish accordingly{" "}
            </p>
            <IoIosClose
              onClick={(e) => {
                e.stopPropagation();
                setPopUpMessage(false);
              }}
              style={{ fontSize: "1.8rem", height: "fit-content" }}
            />
          </div>
        )}
      </div>

      {openChat && (
        <div className="chatBox">
          <div className="recent-chat">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="user-input">
            <input
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "10px",
                outline: "none",
                border: "1px solid #575764",
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <BiSolidSend
              onClick={handleSendMessage}
              style={{
                fontSize: "1.7rem",
                color: "#575764",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Assistent;
