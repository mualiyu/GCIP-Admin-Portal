import React, { useState } from "react";
import "../styles/tab5.css";
import { FcCheckmark } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import Warning from "./notify";
import { RegularText } from "../../../../components/Common";
import Button from "../../../../components/Button";
import { useDispatch } from "react-redux";
import { setProgramSatus } from "../../../../redux/program/programSlice";
function Tab5({moveToTab}) {
  const [selected,setSelected]=useState([])
  const  dispatch=useDispatch()
  let table_data = [
    {
      id: 1,
      name: "submitted",
      color: "#0f1a5e",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
      input:true
    },
    {
      id: 2,
      input: true,
      name: "Incomplete",
      color: "#12a73f",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 3,
      input: true,
      name: "Decline",
      color: "#b12323",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FaTimes color="red" />,
    },
    {
      id: 4,
      input: true,
      name: "Approved",
      color: "#073002",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 5,
      input: true,
      name: "Under Review",
      color: "#073002",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 6,
      input: true,
      name: "Commisioned",
      color: "",
      edit: <FaTimes color="red" />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 7,
      input: true,
      name: "Grant Agreement Signator",
      color: "",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 8,
      input: true,
      name: "Cancel",
      color: "",
      edit: <FaTimes color="red" />,
      file: <FaTimes color="red" />,
      update: <FaTimes color="red" />,
    },
  ];

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      marginTop:20
    }}>
      <RegularText style={{
        fontWeight:'bold',
        fontSize:20,
        textTransform:'uppercase'
      }} text="Project Application Status"/>
      <RegularText style={{marginBottom:20}} text="This session allows you to select ehich status to "/>
      <Warning msg="Warning: Changing status names after projects have been submitted can result in status changes." />
      <table className="status_table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Color</th>
            <th>Editable Project</th>
            <th>Allow File Uploads</th>
            <th>Allow connections Updates</th>
          </tr>
        </thead>
        <tbody>
          {table_data?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.input ? <input onChange={(e)=>{
                  if (e.target.checked) {
                    setSelected(prev=>[...prev,{
                      name:item.name,
                      isEditable: true,
                      isChecked: false,
                      color: item.color,
                    }])
                  }else{
                    const filtered=selected.filter((_,ind)=>ind!==index)
                    setSelected(filtered)
                  }
                }} type="checkbox" /> : null}</td>
                <td>{item.name}</td>
                <td>
                  <span className="colors" style={{
                    backgroundColor:item.color
                  }}></span>
                </td>
                <td>{item.edit}</td>
                <td>{item.file}</td>
                <td>{item.update}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        onClick={() => {
          dispatch(setProgramSatus(selected))
          moveToTab(6)
        }}
        style={{
          width: 200,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: "auto",
        }}
        label="Next"
      />
    </div>
  );
}

export default Tab5;
