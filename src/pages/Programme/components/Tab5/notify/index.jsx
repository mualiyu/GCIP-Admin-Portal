import React from "react";
import { AiOutlineNotification } from "react-icons/ai";
function Warning({ msg }) {
  return (
    <div className="status_warning">
      <AiOutlineNotification color="#fff" /> {msg}
    </div>
  );
}

export default Warning;
