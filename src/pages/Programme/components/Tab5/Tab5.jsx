import React, { useState } from "react";
import "../styles/tab5.css";
import { FcCheckmark } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import Warning from "./notify";
import { RegularText } from "../../../../components/Common";
import Button from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setProgramSatus } from "../../../../redux/program/programSlice";
import Alert from "../../../../components/Alert";
import { useEffect } from "react";
function Tab5({ moveToTab }) {
  const [selected, setSelected] = useState([]);
  const [alertText, setAlert] = useState("");
  const [mainSelected,setMainSelected]=useState(0)
  const  programData=useSelector(state=>state.program)
  const dispatch = useDispatch();
  let table_data = [
    {
      id: 1,
      isEditable: "0",
      isInitialised: "0",
      name: "submitted",
      color: "#0f1a5e",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
      input: true,
    },
    {
      id: 2,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Incomplete",
      color: "#12a73f",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 3,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Decline",
      color: "#b12323",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FaTimes color="red" />,
    },
    {
      id: 4,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Approved",
      color: "#073002",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 5,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Under Review",
      color: "#073002",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 6,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Commisioned",
      color: "",
      edit: <FaTimes color="red" />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 7,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Grant Agreement Signator",
      color: "",
      edit: <FcCheckmark />,
      file: <FcCheckmark />,
      update: <FcCheckmark />,
    },
    {
      id: 8,
      isEditable: "0",
      isInitialised: "0",
      input: true,
      name: "Cancel",
      color: "",
      edit: <FaTimes color="red" />,
      file: <FaTimes color="red" />,
      update: <FaTimes color="red" />,
    },
  ];

  const [managedData,setMangedDate]=useState([])

  useEffect(()=>{
    let AllArray=[]
    let filtered=[]

    setMainSelected(programData.program.status.length)
    programData.program.status.map(dt=>{
    filtered =table_data.filter(st=>st.name!==dt.name)


    })
    
    AllArray=[...programData.program.status,...filtered]
    setMangedDate(AllArray)
    
  },[])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        width: "90%",
      }}
    >
      <Alert text={alertText} />
      {/* <Button style={{
          marginTop: 10,
          width: 100,
          marginLeft: "auto",
          marginBottom: 20,
        }} label="Add Status"/> */}
      <RegularText
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase",
        }}
        text="STATUS"
      />
      {/* <RegularText style={{marginBottom:20}} text="This session allows you to select ehich status to "/>
      <Warning msg="Warning: Changing status names after projects have been submitted can result in status changes." /> */}
      <table className="status_table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Color</th>
            <th>Editable Project</th>
            <th>Allow File Uploads</th>
          </tr>
        </thead>
        <tbody>
          {table_data?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>
                  
                    <input
                      
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected((prev) => [
                            ...prev,
                            {
                              name: item.name,
                              isEditable: item.isEditable,
                              isInitial: item.isInitialised,
                              color: item.color,
                            },
                          ]);
                        } else {
                          const filtered = selected.filter(
                            (_, ind) => ind !== index
                          );
                          setSelected(filtered);
                        }
                      }}
                      type="checkbox"
                    />
                  
                </td>
                <td>{item.name}</td>
                <td>
                  <span
                    className="colors"
                    style={{
                      backgroundColor: item.color,
                    }}
                  ></span>
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        item.isEditable = "1";
                      } else {
                        item.isEditable = "0";
                      }
                      const newFilter = [...selected];
                      newFilter[index] = {
                        name: item.name,
                        isEditable: item.isEditable,
                        isInitial: item.isInitialised,
                        color: item.color,
                      };
                      setSelected(newFilter);
                    }}
                    type="checkbox"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        item.isInitialised = "1";
                      } else {
                        item.isInitialised = "0";
                      }
                      const newFilter = [...selected];
                      newFilter[index] = {
                        name: item.name,
                        isEditable: item.isEditable,
                        isInitial: item.isInitialised,
                        color: item.color,
                      };
                      setSelected(newFilter);
                    }}
                    type="checkbox"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramSatus(selected));
            setAlert("Data Saved");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            // width: 200,
            marginRight: 20,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438"
          }}
          label="Save"
        />
        <Button
          onClick={() => {
            dispatch(setProgramSatus(selected));
            moveToTab(7);
          }}
          style={{
            // width: 200,
          }}
          label="Next"
        />
      </div>
    </div>
  );
}

export default Tab5;
