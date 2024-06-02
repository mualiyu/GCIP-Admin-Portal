import React from "react";

function TextExtractor(text) {
  if (!text) return "";
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export default TextExtractor;
