import React from "react";
import "./styles/messageUser.css";
import { FaCheck, FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import { FcCheckmark } from "react-icons/fc";
export default function MessageUser() {
  return (
    <div className="message-user-container">
      <FaUser size={40} />
      <div className="user-detail">
        <RegularText style={{ fontWeight: "bold" }} text="Mubarak Ibrahim" />
        <RegularText text="Hy there, kindly treat my apppp" />
      </div>
      <div className="status">
         <div>
         <FaCheck color="green"/>
          <FaCheck color="green"/>
         </div>
         <RegularText text="Read"/>
      </div>
    </div>
  );
}
