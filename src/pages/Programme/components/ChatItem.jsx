import React from "react";
import "./styles/chatitem.css";
import { FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import convertDate from "../../../helpers/convertDate";
export default function ChatItem({ isAdmin = false, message = "", file = "",created='' }) {
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
          <RegularText
            style={{
              width: "90%",
              wordWrap: "break-word",
            }}
            text={message}
          />
          {file !== "" && (
            <Button
              onClick={() => {
                let a = document.createElement("a");
                a.href = file;
                a.download = "rea_document";
                a.target="_blank"
                a.click();
              }}
              style={{
                width: "80%",
                backgroundColor: "#9796968f",
                marginTop: 10,
              }}
              label="Download File"
            />
          )}
        </div>
        <span style={{
            fontWeight:'bolder',
            fontSize:12,
            position:'absolute',
            bottom:0,
            marginBottom:10,
            right:0,
            marginRight:10
            
          }}>{created !== "" ? convertDate(created) : created}</span>
      </div>
    </div>
  );
}
