import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "react-modal";
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");

  const initialValues = {
    uploads: [{ name: "", file: "" }],
  };

  return (
    <div className="stages_container">
      <Alert text={alertText} />
      <RegularText
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase",
          marginTop: 20,
        }}
        text="DOCUMENTS"
      />
      <Button
        onClick={() => {
          setIsOpen(true);
          // formik.setValues({ uploads: [{ name: "", file: "" }] });
        }}
        style={{
          marginLeft: "auto",
          // width: 200,
          marginTop: 20,
        }}
        label="Add File"
      />
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
            <tr>
              <td>1</td>
              <td>Upload Document Nmae</td>
              <td>File/Document</td>
              <td>
                <div className="table_actions">
                  <FaTrash />
                </div>
              </td>
            </tr>
          </tbody>
        </>
        )}
      </table>

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
