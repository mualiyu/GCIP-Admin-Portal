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
import { FaTrash, FaWindowClose } from "react-icons/fa";
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
  const [presentUploads, setPresentUploads] = useState([
    ...programData.program.program.uploads,
  ]);
  const assignedUploads = [].concat(programData.program.program.uploads, []);

  const initialValues = {
    uploads: [{ name: "", file: "" }],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch(setProgramUploads(val.uploads));
      moveToTab(5);
    },
  });
  const addStage = () => {
    const current = [...formik.values.uploads];
    current.push({
      name: "",
      file: "",
    });

    formik.setValues({ uploads: current });
  };

  const removeStage = (index) => {
    const current = [...formik.values.uploads];
    const filtered = current.filter((cur, ind) => ind !== index);

    formik.setValues({ uploads: filtered });
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
          formik.setValues({ uploads: [{ name: "", file: "" }] });
        }}
        style={{
          marginLeft: "auto",
          width: 200,
          marginTop: 20,
        }}
        label="Add File"
      />
      <table className="home_table">
        {presentUploads.length > 0 && (
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
              {presentUploads.map((pres, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{pres.name}</td>
                  <td>{pres.file}</td>
                  <td>
                    <div className="table_actions">
                      <FaTrash onClick={() => {
                          const filtered = presentUploads.filter(
                            (prs, filInd) => filInd !== ind
                          );
                          setPresentUploads(filtered);
                        }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      {presentUploads.length == 0 && (
        <>
          <img id="empty" src="38.png" />
          <span id="empty">No added files yet</span>
        </>
      )}

      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramUploads(presentUploads));
            setAlert("Data Saved");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />
        <Button
          onClick={() => {
            dispatch(setProgramUploads(presentUploads));
            moveToTab(5);
          }}
          style={{
            width: 200,
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
          <Loading loading={loading} />
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
              
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Lots"
          />
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
                      // formik.values.uploads[index].file = "myUrlll";
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      console.log(files[0]);
                      setLoading(true);
                      // const response= await query({url:'/file',method:'POST',bodyData:formData})
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/admin/program/file/upload",
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
                    outlined
                    type="file"
                  />

                  {index !== 0 && (
                    <DeleteIcon onClick={() => removeStage(index)} />
                  )}
                </div>
              ))
            : null}
          <Button
            onClick={() => {
              const newUploads = [...presentUploads];
              newUploads.push(formik.values.uploads[0]);
              setPresentUploads(newUploads);
              formik.setValues({ uploads: initialValues.uploads });
            }}
            style={{
              marginTop: 20,
              width: 100,
            }}
            label="Add"
          />
        </div>
      </Modal>
    </div>
  );
}
