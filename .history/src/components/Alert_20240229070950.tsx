import React from "react";
import "./styles/alert.css";
export default function Alert({ text, type }: { text: string, type: string }) {
  return (
    <div className={`alert ${text ? "active" : null} ${type}`}>
      <span>{text}</span>
    </div>
  );
}
