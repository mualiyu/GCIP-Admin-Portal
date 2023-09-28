import React from "react";
import "./styles/input.css";
import { RegularText } from "./Common";
import { SelectProps } from "./types";
function Select({
  label,
  placeholder,
  type = "text",
  required = false,
  style,
  options,
  disabled,
  onChange,
  id,
  name,
  value
}: SelectProps) {
  return (
    <div style={style} className="app_input">
      <div className="input_label">
        <RegularText
          style={{
            fontSize: 11,
            height: 20,
            fontWeight: "600",
            marginBottom: 0,
            textTransform: "uppercase",
          }}
          text={`${label}`}
        />
        {required ? <span className="asteric">*</span> : null}
      </div>

      <select defaultValue={!value?'none':value}  name={name} id={id} onChange={(e)=>onChange(e)} style={{
        backgroundColor:disabled?'var(--back_ground)':'white'
      }} disabled={disabled} placeholder={placeholder}>
      {!value? <option value='none'>Select</option>:null}
        {options.map((opt: string|{value:string,name:string}, index) => {
          if (typeof(opt)=='string') {
            return(
              <option value={opt} key={opt}>
              {opt}
            </option>)
          }
          else{
            return(
              <option value={opt.value} key={opt.name}>
              {opt.name}
            </option>
            )
          }
         
         
        }
          
        )}
      </select>
    </div>
  );
}

export default Select;
