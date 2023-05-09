import React from "react";
import "../styles/messages.css";
import Input from "../../components/Input";
import MessageUser from "./components/MessageUser";
import {
  FaCartArrowDown,
  FaFile,
  FaUser,
  FaUserAlt,
  FaUserTag,
} from "react-icons/fa";
import { RegularText } from "../../components/Common";

import { useState } from "react";
import ChatItem from "./components/ChatItem";
import { FcFile } from "react-icons/fc";
import { AttachIcon, SendIcon } from "../../assets/Svg/Index";
import { useEffect } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { useRef } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [typed, setTyped] = useState("");
  const fileRef = useRef();
  //   const onSend = (messages = []) => {
  //     setMessages((previousState) => ({
  //       messages: GiftedChat.append(previousState.messages, messages),
  //     }));
  //   };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Hello Mr Mukhtar?",
        },
      ]);
    }, 1000);
  }, []);
  return (
    <div className="message-container">
     <div className="chat-list-container">
        <div className="chatlist-main">
          <h2>Messages</h2>
          <Input outlined label="" placeholder="Search Messages or Users" />
          <h4>Recent</h4>
          <div className="main-chat-lists">
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
            <MessageUser/>
          </div>
        </div>
      </div>
      <div className="main-chats">
        <div className="messaage-head">
          <FaUser
            style={{
              marginLeft: 20,
              marginRight: 10,
            }}
            size={40}
          />
          <RegularText
            style={{
              fontWeight: "bold",
            }}
            text="Mubarak Ibrahim"
          />
        </div>
        <div className="chats">
          {messages.length == 0 && (
            <div className="empty-msg">
              <RegularText text="No messages yet, pleas if you have any complaints feel free to message us. thank you" />
            </div>
          )}
          {messages.length > 0 && (
            <>
              {messages.map((msg, ind) => (
                <Fade>
                  <ChatItem message={msg.text} isAdmin={ind == 0} />
                </Fade>
              ))}
            </>
          )}
        </div>
        {/* <div className="divider"/> */}
        <div className="chat-input">
          <Input
            value={typed}
            onChange={(e) => {
              setTyped(e.target.value);
            }}
            outlined
            style={{
              width: "40%",
            }}
            label=""
            placeholder="Enter message...."
          />
          <AttachIcon
            onClick={() => {
              //   console.log(fileRef.current)
              fileRef.current.click();
            }}
          />
          <input style={{ width: 0, height: 0 }} type="file" ref={fileRef} />
          <SendIcon
            onClick={() => {
              setMessages((prev) => [...prev, { text: typed, id: 1 }]);
              setTyped("");
            }}
          />
        </div>
      </div>
    </div>
  );
}
