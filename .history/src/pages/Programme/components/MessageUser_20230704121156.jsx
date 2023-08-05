import React from "react";
import "./styles/messageUser.css";
import { FaCheck, FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import { FcCheckmark } from "react-icons/fc";
export default function MessageUser({name='',title='',onClick,unread}) {
  return (
    <div onClick={onClick} className="message-user-container">
      <FaUser size={40} />
      <div className="user-detail">
        <RegularText style={{ fontWeight: "bold" }} text={name} />
        <RegularText text={title} />
      </div>
      <div className="status">
         <div>
         <FaCheck color="green"/>
          <FaCheck color="green"/>
         </div>
         <RegularText style={{ fontSize:12}} text={`${unread} Un-Read`}/>
      </div>
    </div>
  );
}
