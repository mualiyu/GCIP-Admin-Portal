import React from "react";
import "./styles/tab6.css";
import Modal from "react-modal";
import { FiBook } from "react-icons/fi";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FcCancel } from "react-icons/fc";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import { useState } from "react";
import { FaEdit, FaTrash, FaWindowClose, FaFolderOpen, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setProgramRequirements } from "../../../redux/program/programSlice";
import Alert from "../../../components/Alert";
import { useEffect } from "react";
function Tab6({ moveToTab }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const programData = useSelector((state) => state.program);
  const [alertText, setAlert] = useState("");
  const [requirementName, setReqName] = useState("");
  const [weight, setWeight] = useState(0);
  const [mainStage, setMainStage] = useState("");
  const [loading,setLoading]=useState(false)
  const [requirementType, setReqType] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch();
  const assignedReqs = Array.from(programData.program.requirements);
  const [reqTypes, setReqTypes] = useState([
    "TextInput",
    "NumericInput",
    "Textarea",
    "CheckBox",
    "Yes/No",
    "FileUpload",
  ]);

  const [data, setData] = useState([]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };
  useEffect(() => {
    setLoading(true);
    const newArray = [];
    assignedReqs.map((assigned) => {
      newArray.push({ name: assigned.name, type: assigned.type,stage:assigned.stage,weight:assigned.weighte });
    });
    setData(newArray);
    setLoading(false);
  }, []);
  return (
    <>
      <div className="app_req_container">
        <Alert text={alertText} />
        <div className="app_req_head">
          <h2>
            REQUIREMENTS
          </h2>
          <Button onClick={() => setIsOpen(true)} label="Add" />
        </div>
        <div className="app_req_body">
          {data?.map((item, index) => {
            return (
              <div key={index} className="app_req_item">
                <Input
                  style={{ width: "90%" }}
                  label={item.type}
                  value={item.name}
                  outlined
                  disabled
                />
                <button
                  onClick={() => {
                    setReqName(item.name);
                    setReqType(item.type);
                    setEditIndex(index);
                    setIsOpen(true);
                  }}
                >
                  Edit
                </button>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
        {data.length == 0 && !loading && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  flexDirection: "column",
                  marginTop: "7%",
                }}
              >
                <FaFolderOpen />
                <span id="empty">
                  {" "}
                  Oops! Nothing here.{" "}
                  <span
                    onClick={() => setIsOpen(true)}
                    style={{
                      color: "var(--primary)",
                      marginLeft: 20,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Add a New Requirement?
                  </span>{" "}
                </span>
              </div>
            )}

{data.length > 0 &&
        <div className="save_next">
          <Button
            onClick={() => {
              dispatch(setProgramRequirements(data));
              setAlert("Data Saved");
              setTimeout(() => {
                setAlert("");
              }, 2000);
            }}
           lineButton
          style={{
            marginRight: 20,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438"
          }}
            label="Save"
          />
          <Button
            onClick={() => {
              if (data.length == 0) {
                setAlert("At least one Requirement is required");
                setTimeout(() => {
                  setAlert("");
                }, 2000);
                return;
              }
              const newData = data;
              dispatch(setProgramRequirements(newData));
              moveToTab(4);
            }}
            style={{
              // width: 200,
            }}
            label="Next"
          />
        </div>
}
      </div>

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
         
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Requirement"
          />
           <FaTimesCircle
             onClick={() => {
              if (editIndex !== null) {
                setReqName("");
                setReqType("");
                setEditIndex(null);
              }
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />

</div>
          <div className="divider" />
          <>
                            <div>
                            <Input
            value={requirementName}
            onChange={(e) => {
              setReqName(e.target.value);
            }}
            label="Name"
            outlined
          />
                            </div>
                              <div className="lot_add">
                              <Select
            value={requirementType}
            onChange={(e) => {
              setReqType(e.target.value);
            }}
            options={reqTypes}
            label="Type"
            style={{width: "50%", marginRight: 5}}
            outlined
          />
          <Input
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            label="Weight"
            outlined
            style={{width: "50%"}}
          />
 </div>
 <div style={{ marginTop: 20 }}>
            <h4>Stages</h4>
            {programData.program.stages.map((stg, ind) => (
              <>
                <label>
                  <input onChange={(e)=>setMainStage(e.target.value)} key={stg.key} type="radio" name="stage" value={stg.key} />
                  {stg.name}
                </label>
               
              </>
            ))}
          </div>
          </>
          <div style={{ display: "flex", marginTop: 10, position:"absolute", bottom: 30, right: 30 }}>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}

              lineButton
              style={{ marginTop: 10, width: 100, marginRight: 10, backgroundColor: "white",
              border: "thin solid #006438",
              color: "#006438" }}
              label="CANCEL"
            />
            <Button
              onClick={() => {
                if (editIndex !== null) {
                  const allValues = data;
  
                  allValues[editIndex].name = requirementName;
                  allValues[editIndex].type = requirementType;
                  allValues[editIndex].stage = mainStage;
                  allValues[editIndex].weight = weight;
                  setData(allValues);
                  setReqName("");
                  setReqType("");
                  setMainStage('')
                  setWeight('')
                  setEditIndex(null);
                  setIsOpen(false);
                  return;
                }
                setData((prev) => [
                  ...prev,
                  {
                    name: requirementName,
                    type: requirementType,
                    weight,
                    stage:mainStage
                  },
                ]);
                
                setReqName("");
                setReqType("");
                setMainStage('')
                setWeight('')
                setEditIndex(null);
                setIsOpen(false);
              }}
              style={{ marginTop: 10, width: 100 }}
              label={editIndex !== null ? "SAVE" : "ADD"}
            />
          </div>
        </div>
      </Modal>


    </>
  );
}

export default Tab6;
