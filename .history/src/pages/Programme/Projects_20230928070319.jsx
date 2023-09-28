import React, { useEffect } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Header, RegularText } from "../../components/Common";
import Modal from "react-modal";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Alert from "../../components/Alert";
import * as Yup from "yup";
// import Textarea
// import TextArea from "../../components/TextArea";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    //   maxHeight: "90vh",
    minWidth: "50vw",
    overflowX: "hidden",
    maxWidth: "50vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { programId } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);

  const viewProgramDetails = (projectId) => {
    console.log(projectId);
    navigate(`/Programme/Projects/${programId}/${projectId}`);
    // navigate(`/api/admin/projects/${programId}/${projectId}`);
  };

  useEffect(() => {
    getAllProjects(programId);
    console.log(programId);
  }, []);

  const getAllProjects = async (id) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/projects/${id}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      //   console.log(id);
      setAllProjects(data.data.projects);
      console.log(data);
    }
  };

  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div>
          <p> List of Projects</p>
        </div>
        <div className="home_top" style={{ width: "90%" }}>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>

        <section>
          <button
            style={{
              border: "none",
              backgroundColor: "#006439",
              border: "none",
              color: "white",
              marginRight: 4,
              padding: "9px 22px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsOpen(true);
            }}>
            CREATE PROJECT
          </button>
        </section>
        <table className="home_table_main">
          {allProjects.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Lot</th>
                  <th>Location (State)</th>
                  <th style={{ width: 300 }}>Description</th>
                  <th> Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project, index) => (
                  <tr key={index.toString()}>
                    <td>{index + 1}</td>
                    <td>{project.lot_name}</td>
                    <td>
                      {project.state} <br />
                      <span>{project.lga}</span> | {project.name_of_community}
                    </td>
                    <td>{project.description}</td>
                    <td> {moment(project.created_at).format("ll")}</td>

                    <td>
                      <div className="table_actions">
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "#006439",
                            border: "none",
                            color: "white",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                          }}
                          onClick={() => viewProgramDetails(project.id)}>
                          View
                        </button>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "#006439",
                            border: "none",
                            color: "white",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                          }}
                          onClick={() => updateProject(project.id)}>
                          Edit
                        </button>

                        <button
                          style={{
                            border: "none",
                            backgroundColor: "#006439",
                            border: "none",
                            color: "white",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                          }}
                          onClick={() => assignProject(project.id)}>
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        {loading && <MoonLoader />}

        {/* Add New Project */}

        <Modal
          isOpen={modalIsOpen}
          appElement={document.getElementById("root")}
          style={customStyles}>
          {/* <Loading loading={loading} /> */}
          <Alert text={alertText} />
          <div
            style={{
              width: "90%",
              height: "100%",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <Header text="ADD PROJECT" />
            <span style={{ marginTop: 10 }}>Create Project</span>

            <>
              <FormikProvider value={formik}>
                <div className="sub-group">
                  <Input
                    required
                    //   value={formik.values.name}
                    //   error={
                    //     formik.touched.name && formik.errors.name
                    //       ? formik.errors.name
                    //       : ""
                    //   }
                    name="name"
                    //   onChange={formik.handleChange}
                    outlined
                    label="Name"
                    style={{ width: "50%" }}
                  />

                  <Select
                    outlined
                    style={{
                      width: "30%",
                    }}
                    name="gender"
                    label="Gender"
                    //   options={genderOptions}
                    //   value={formik.values.gender}
                    //   onChange={(e) => {
                    //     formik.values.gender = e.target.value;
                    //   }}
                  />
                </div>

                <h2 style={{ marginTop: 20 }}>Current Job*</h2>

                <div className="sub-group">
                  <Input
                    //   value={formik.values.current_position.position}
                    required
                    style={{ width: "50%", marginRight: "15px" }}
                    //   onChange={formik.handleChange}
                    outlined
                    label="Current Position"
                    //   name="current_position.position"
                  />
                </div>

                <TextArea
                  // value={formik.values.current_position.description}
                  // onChange={formik.handleChange}
                  required
                  outlined
                  label="Project Description"
                  // name="current_position.description"
                />

                <h2 style={{ marginTop: 40 }}>Upload Documents</h2>

                <div className="sub_input">
                  <div style={{ position: "relative" }}>
                    <Input
                      // error={
                      //   formik.touched.education_certificate &&
                      //   formik.errors.education_certificate
                      //     ? formik.errors.education_certificate
                      //     : ""
                      // }
                      // onChange={(e) => {
                      //   const formData = new FormData();
                      //   const files = e.target.files;
                      //   files?.length && formData.append("file", files[0]);
                      //   setLoading(true);
                      //   fetch(
                      //     "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/staff/upload",
                      //     {
                      //       method: "POST",
                      //       body: formData,
                      //       headers: {
                      //         Authorization: "Bearer " + data.user.user.token,
                      //       },
                      //     }
                      //   )
                      //     .then((res) => res.json())
                      //     .then((data) => {
                      //       setLoading(false);
                      //       if (data.status) {
                      //         formik.values.education_certificate = data.data.url;
                      //         setAlert("Uplaoded Succefully");
                      //       } else {
                      //         setAlert(
                      //           "Something went wrong. Kindly Upload again"
                      //         );
                      //       }
                      //       setTimeout(() => {
                      //         setAlert("");
                      //       }, 2000);
                      //     });
                      // }}
                      // outlined
                      label="UPLOAD Educational Certificate"
                      type="file"
                    />
                    {/* {formik.values.education_certificate && (
                    <span className="uploaded_text">
                      Uploaded, replace by uploading new file
                    </span>
                  )} */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    marginTop: 20,
                    justifyContent: "flex-end",
                    marginLeft: "auto",
                  }}>
                  <Button
                    //   onClick={() => {
                    //     setIsOpen(false);
                    //     formik.values.name = "";
                    //     formik.values.current_position.position = "";
                    //     formik.values.current_position.start_date = "";
                    //     formik.values.current_position.description = "";
                    //   }}
                    fontStyle={{
                      color: "var(--primary)",
                    }}
                    style={{
                      width: 134,
                      backgroundColor: "#fff",
                      border: "1px solid var(--primary)",
                      marginRight: 15,
                    }}
                    label="Cancel"
                  />
                  <Button
                    //   onClick={() => {
                    //     formik.handleSubmit();
                    //   }}
                    //   label={editIndex == null ? "Add" : "Save"}
                    label="Save"
                  />
                </div>
              </FormikProvider>
            </>
          </div>
        </Modal>
      </div>
    </Fade>
  );
}
