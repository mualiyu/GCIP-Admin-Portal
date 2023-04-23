import React from "react";
import "./styles/tab6.css";
import Modal from "react-modal";
import { FiBook } from "react-icons/fi";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FcCancel } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProgramRequirements } from "../../../redux/program/programSlice";
function Tab6({moveToTab}) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [requirementName, setReqName] = useState("");
  const [requirementType, setReqType] = useState("");
  const  [editIndex,setEditIndex]=useState(null)
  const dispatch=useDispatch()
  const [data, setData] = useState([
    {
      name: "This is a Requirements Specification document for a new web-based sales system",
      type: "",
    },
    {
      name: "Requirement 1",
      type: "",
    },
  ]);

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
  return (
    <>
      <div className="app_req_container">
        <div className="app_req_head">
          <h2>
            <FiBook color="green" size={20} /> Application requirements
          </h2>
          <Button onClick={() => setIsOpen(true)} label="Add" />
        </div>
        <div className="app_req_body">
          {data?.map((item, index) => {
            return (
              <div key={index} className="app_req_item">
                <Input
                  style={{ width: "90%" }}
                  label="Name"
                  value={item.name}
                  outlined
                  disabled
                />
                <button onClick={()=>{
                  setReqName(item.name)
                  setReqType(item.type)
                  setEditIndex(index)
                  setIsOpen(true)
                }}>Edit</button>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
        <Button
        onClick={() => {
          dispatch(setProgramRequirements(data))
          moveToTab(3)
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
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => setIsOpen(false)}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Requirement"
          />
          <div className="divider" />
          <Input
           value={requirementName}
            onChange={(e) => {
              setReqName(e.target.value);
            }}
            label="Name"
            outlined
          />
          <Select
          value={requirementType}
            onChange={(e) => {
              setReqType(e.target.value);
            }}
            options={[]}
            label="Type"
            outlined
          />
          <Button
            onClick={() => {
              if (editIndex!==null) {
                const allValues=data
                allValues[editIndex].name=requirementName
                allValues[editIndex].type=requirementType
                setData(allValues)
                setReqName("");
                setReqType("");
                setEditIndex(null)
                setIsOpen(false)
                return
              }
              setData((prev) => [
                ...prev,
                {
                  name: requirementName,
                  type: requirementType,
                },
              ]);
              setReqName("");
              setReqType("");
            }}
            style={{ marginTop: 20 }}
            label="Add"
          />
        </div>
      </Modal>
     
    </>
  );
}

export default Tab6;
