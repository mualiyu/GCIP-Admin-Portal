import React, { useState, useEffect } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setProgramUploads } from "../../../redux/program/programSlice";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";
import {
  FaEdit,
  FaTrash,
  FaWindowClose,
  FaFolderOpen,
  FaTimesCircle,
} from "react-icons/fa";
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
export default function Tab4({ moveToTab }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newDocumentModal, setNewDocumentModal] = useState(false);
  const handleModalClose = () => setNewDocumentModal(false);
  const programData = useSelector((state) => state);
  const [programBody, setProgramBody] = useState({});
  const [alertText, setAlert] = useState("");
  const [document, setDocument] = useState([]);
  const [uploadDocument, setUploadDocument] = useState({
    name: "",
    file: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadDocument((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendDataToServer = () => {
    let lots = JSON.parse(localStorage.getItem("formData"));
    let stages = JSON.parse(localStorage.getItem("stageData"));
    let uploads = JSON.parse(localStorage.getItem("uploads"));
    let programName = programData.program.program.programName;
    let programDescription = programData.program.program.programDescription;

    const data = {
      program: {
        programName,
        programDescription,
        lots,
        stages,
        uploads,
      },
    };
    let sendToServer = JSON.stringify(data);
    console.log(sendToServer);
    console.log("send to server" + JSON.stringify(data));
    fetch("https://api.gcip.rea.gov.ng/api/admin/program/create", {
      method: "POST",
      body: sendToServer,
      headers: {
        Authorization: "Bearer " + programData.user.user.token,
        Accept: application/json",
        Content-Type: application/json  
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.status) {
          console.log("Record saved");
        } else {
          console.log(data);
          setAlert("Oops! something didn't go right there");
        }
        setTimeout(() => {
          setAlert("");
        }, 2000);
      });
  };
  const handleSubmit = () => {
    console.log("hey");
    const savedData = JSON.parse(localStorage.getItem("uploads")) || [];
    savedData.push(uploadDocument);
    console.log(savedData);
    localStorage.setItem("uploads", JSON.stringify(savedData));
    setUploadDocument({
      name: "",
      file: "",
    });
    console.log(savedData);
  };

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("uploads"));
    // console.log(records);
    if (records) {
      console.log(records);
      setDocument(records);
    }
    // console.log(lotData);
  }, [uploadDocument]);

  const initialValues = {
    uploads: [{ name: "", file: "" }],
  };

  return (
    <div className="stages_container">
      <Alert text={alertText} />

      <div className="flex" style={{ margin: "10px 0 30px 0" }}>
        <RegularText
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "uppercase",
            marginTop: 20,
          }}
          text="DOCUMENTS"
        />
        <button
          className="btn btn-primary p-25"
          style={{
            fontSize: 10,
            marginTop: 20,
            fontWeight: 900,
            padding: "10px 40px",
            float: "right",
          }}
          onClick={() => setNewDocumentModal(true)}>
          {document.length > 0 ? "Upload More Documents" : "Upload Document"}
        </button>
      </div>
      <section>
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {document?.map((doc, ind) => (
                <>
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{doc.title}</td>
                    <td>{doc.document}</td>
                    <td>
                      <div className="table_actions">
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </>
        </table>
      </section>

      <button
        className="btn btn-primary p-25"
        style={{
          fontSize: 10,
          marginTop: 20,
          fontWeight: 900,
          padding: "10px 40px",
          float: "right",
        }}
        onClick={sendDataToServer}>
        Save data to server
      </button>

      <Modal open={newDocumentModal} onClose={handleModalClose}>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: "white",
            padding: 32,
            boxShadow:
              "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
          }}>
          <div className="mb-35">
            <h4
              className="summary__title t-xl title-case"
              style={{ fontSize: 11 }}>
              Add Stage
            </h4>
            <div className="s-divider"></div>
          </div>
          <section className="">
            {/* <form style={{ width: "100%" }}> */}
            <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                <label> Title of Document</label>
                <input
                  type="text"
                  className="form-control-input "
                  name="name"
                  value={uploadDocument.name}
                  onChange={handleChange}
                />
              </div>
              <div className="pos-rel w100-m10 ">
                <label> Upload Corresponding Document</label>
                <input
                  type="file"
                  className="form-control-input "
                  name="doument_upload"
                  style={{ border: "none" }}
                  onChange={(e) => {
                    const formData = new FormData();
                    const files = e.target.files;
                    files?.length && formData.append("file", files[0]);
                    console.log(files[0]);
                    setLoading(true);
                    fetch(
                      "https://api.gcip.rea.gov.ng/api/admin/program/file/upload",
                      {
                        method: "POST",
                        body: formData,
                        headers: {
                          Authorization:
                            "Bearer " + programData.user.user.token,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setLoading(false);
                        if (data.status) {
                          console.log(data.data.url);
                          uploadDocument.file = data.data.url;
                          setAlert("Uplaoded Successfully");
                        } else {
                          setAlert("Oops! something didn't go right there");
                        }
                        setTimeout(() => {
                          setAlert("");
                        }, 2000);
                      });
                  }}
                />
              </div>
            </section>

            <div
              className="flex__normal w-30 pull-right mt-35"
              style={{ marginRight: 30 }}>
              <button
                onClick={handleModalClose}
                className="btn btn-secondary pull-right mr-10"
                style={{
                  fontSize: 9,
                  // textTransform: "uppercase",
                  fontWeight: 900,
                  padding: "10px 40px",
                }}>
                Cancel
              </button>
              <button
                className="btn btn-primary pull-right"
                onClick={handleSubmit}
                style={{
                  fontSize: 9,
                  // textTransform: "uppercase",
                  fontWeight: 900,
                  padding: "10px 40px",
                }}>
                Save
              </button>
            </div>
            {/* </form> */}
          </section>
        </div>
      </Modal>

      {/* <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div className="inner_modal">
          <Loading loading={loading} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <RegularText
              style={{ textAlign: "Left", fontWeight: "bold", fontSize: 18 }}
              text="Add New Document"
            />
            <FaTimesCircle
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
            />
          </div>

          <div className="divider" />
          {formik.values.uploads.length > 0
            ? formik.values.uploads.map((item, index) => (
                <div className="uploads">
                  <Input
                    label="Name"
                    {...formik.getFieldProps(`uploads.${index}.name`)}
                    onChange={formik.handleChange}
                    outlined
                    placeholder="File Name"
                  />
                  <Input
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      console.log(files[0]);
                      setLoading(true);
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/admin/program/file/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization:
                              "Bearer " + programData?.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.uploads[index].file = data.data.url;
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert("Something went wrong");
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                    label="File"
                    type="file"
                  />
                </div>
              ))
            : null}

          <div
            style={{
              display: "flex",
              marginTop: 10,
              position: "absolute",
              bottom: 30,
              right: 30,
            }}>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              lineButton
              style={{
                marginTop: 10,
                width: 100,
                marginRight: 10,
                backgroundColor: "white",
                border: "thin solid #006438",
                color: "#006438",
                HEIGHT: 25,
              }}
              label="CANCEL"
            />
            <Button
              style={{
                marginTop: 20,
                width: 100,
              }}
              label="ADD"
            />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
