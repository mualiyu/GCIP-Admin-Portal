import React from "react";
import "./styles/button.css";
import { ButtonProps } from "./types";
import { Colors } from "../assets/Colors/Colors";
function Button({ label, style, lineButton,onClick,disabled }: ButtonProps) {
  return (
    <div
    onClick={onClick}
      style={{
        marginLeft: lineButton ? "auto" : 0,
        marginRight: lineButton ? "auto" : 0,
        backgroundColor: lineButton ? "#ffffff" : Colors.primary,
        borderBottom: lineButton ? `1px solid ${Colors.primary}` : "none",
        borderRadius: 4,
        minWidth:lineButton?150:150,
        opacity:disabled?0.4:1,
        transition:'all 0.5s',
        pointerEvents:disabled?"none":'all',
        ...style,
      }}
      className="button_container"
    >
      <span
        style={{
          color: lineButton ? Colors.primary : Colors.white,
          // fontWeight: lineButton ? "bold" : "normal",
          fontWeight:  "bold",
          backgroundColor: lineButton ? '#ffffff' : Colors.primary,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default Button;
