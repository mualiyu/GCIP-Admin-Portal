import React from "react";
import './styles/skeleton.css'
export default function SkeletonLoader() {
  return (
<div style={{
    minHeight:200,
    backgroundColor:'red',
    width:'80%',
    position:'absolute'
}} className="card loading">
  <div className="image">
    
  </div>
  <div className="content">
    <h4>LOoooooooooooo</h4>
    <div className="description">
      
    </div>
  </div>
</div>
  );
}
