import React from "react";
import "./styles/alert.css";
export default function Alert({ text }: { text: string }, type: any) {
  return (
    <div className={`alert ${type} ${text ? "active" : null} `}>
      <span>{text}</span>
    </div>
  );
}
