import React from "react";
import "./styles/chatitem.css";
import { FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
export default function ChatItem({ isAdmin = false,message='' }) {
  return (
    <div className={`item-cont ${isAdmin ? "admin" : null}`}>
      <FaUser
        style={{
          marginTop: "auto",
        }}
        size={40}
      />
      <div className="main-item-1">
        <div className="item-txt">
        <RegularText style={{
            width:'90%',
            wordWrap:'break-word',
            marginBottom:50
        
        }} text={message}/>
        </div>
        
      </div>
    </div>
  );
}
