import React from "react";
import "./styles/input.css";
import { RegularText } from "./Common";
import { InputProps } from "./types";
function Input({
  label,
  placeholder,
  type = "text",
  required = false,
  style,
  disabled,
  outlined,
  name,
  id,
  onChange,
  error,
  value,
}: InputProps) {
  return (
    <div style={style} className="app_input">
      <div className="input_label">
        <RegularText
          style={{
            fontSize: 9,
            fontWeight: "600",
            marginBottom: '0.5rem',
            // textTransform: "uppercase",
            // marginBottom: 0,
          }}
          text={`${label}`}
        />
        {required ? <span className="asteric">*</span> : null}
      </div>

      <input
        value={value}
        disabled={disabled}
        style={{
          display: 'block',
          width: '100%',
          height: 47,
          // padding: '0.45rem 0.9rem',
          fontSize: '.875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          appearance: 'none',
          opacity: disabled ? 0.5 : 1,
          backgroundColor: disabled ? "var(--back_ground)" : "var(--white)",
          border: outlined ? "1px solid var(--stroke)" : "none",
          borderBottom: outlined
            ? "1px solid var(--stroke)"
            : "1px solid var(--primary)",
          borderRadius: '0.25rem',
          // transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out';
          padding: '5px 15px',
        }}
        required={required}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
      />
      {error && (
        <div className="input_error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
