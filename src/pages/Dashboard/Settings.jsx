import React, { useState } from "react";
import CategorySettings from "./components/CategorySettings";
const tabFields = [
  "Category",
  "Stages",
  
];
export default function Settings() {
  
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="program_home_container">
      <div className="program-head">
        <span>Home</span>
        <span>{`>`}</span>
        <span>Settings</span>
        
      </div>
      <div className="tab-container">
        {tabFields.map((tab, index) => (
          <span
            onClick={() => {
              setActiveTab(index);
            }}
            key={tab}
            className={`${index == activeTab ? "active" : null}`}
          >
            {tab}
          </span>
        ))}
      </div>

      {activeTab==0&&(
          <CategorySettings/>
      )}
    </div>
  );
}
