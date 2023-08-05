import React from "react";
import "./styles/messageUser.css";
import { FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";

export default function MessageUser({name='',title='',onClick,unread}) {
  return (
    <div onClick={onClick} className="message-user-container">
      {/* <FaUser size={16} /> */}
      <div className="user-detail">
        <RegularText style={{ fontWeight: "bold" }} text={name} />
        <RegularText text={title} />
      </div>
      {unread > 0 && 
      <div className="status">
         <RegularText style={{ fontSize:12, 
            backgroundColor: 'red',
            padding: '6px 10px',
            borderRadius: '50%',
            color: 'white'}} 
    text={`${unread}`}/>
    
      </div>
    }
    </div>
  );
}
