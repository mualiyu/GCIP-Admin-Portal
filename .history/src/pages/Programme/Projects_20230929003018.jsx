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
    maxHeight: "80vh",
    minWidth: "50vw",
    overflowX: "auto",
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

  const initialProjectDocument = {
    name: "",
    url: "",
  };

  const initialProjectRequirement = {
    name: "",
  };

  const [projectForm, setProjectForm] = useState({
    lot_name: "",
    description: "",
    state: "",
    lga: "",
    name_of_community: "",
    coordinate: "",
    project_documents: [initialProjectDocument],
    project_requirements: [initialProjectRequirement],
  });

  const handleDocumentInputChange = (index, fieldName, value) => {
    const updatedProjectDocuments = projectForm.project_documents.map(
      (doc, i) => (i === index ? { ...doc, [fieldName]: value } : doc)
    );
    setProjectForm({
      ...projectForm,
      project_documents: updatedProjectDocuments,
    });
  };

  const handleRequirementInputChange = (index, fieldName, value) => {
    const updatedProjectRequirements = projectForm.project_requirements.map(
      (req, i) => (i === index ? { ...req, [fieldName]: value } : req)
    );

    setProjectForm({
      ...projectForm,
      project_requirements: updatedProjectRequirements,
    });
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedProjectDocuments = projectForm.project_documents.map(
      (doc, i) => (i === index ? { ...doc, [fieldName]: value } : doc)
    );

    const updatedProjectRequirements = projectForm.project_requirements.map(
      (req, i) => (i === index ? { ...req, [fieldName]: value } : req)
    );
    setProjectForm({
      ...projectForm,
      project_documents: updatedProjectDocuments,
      project_requirements: updatedProjectRequirements,
    });
  };

  const addProjectDocument = () => {
    setProjectForm({
      ...projectForm,
      project_documents: [
        ...projectForm.project_documents,
        initialProjectDocument,
      ],
    });
  };

  const addProjectRequirement = () => {
    setProjectForm({
      ...projectForm,
      project_requirements: [
        ...projectForm.project_requirements,
        initialProjectRequirement,
      ],
    });
  };
  const removeProjectRequirement = (index) => {
    const updatedRequirements = projectForm.project_requirements.filter(
      (_, i) => i !== index
    );
    setProjectForm({
      ...projectForm,
      project_requirements: updatedRequirements,
    });
  };
  const updateProject = (project) => {
    setIsOpen(true);
    console.log(project);
    setProjectForm({
      ...projectForm,
      ...project,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(projectForm);
    const { success, data, error } = await query({
      method: "POST",
      url: `/api/admin/projects/1/create`,
      token: programData.user.user.token,
      bodyData: projectForm,
    });
    setLoading(false);
    if (success) {
      console.log(data);
      setIsOpen(false);
      getAllProjects(programId);
    }
  };

  const viewProgramDetails = (projectId) => {
    console.log(projectId);
    navigate(`/Programme/Projects/${programId}/${projectId}`);
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
      setAllProjects(data.data.projects);
      console.log(data);
    }
  };

  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>

        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <div>
            <h3> All Projects</h3>
          </div>
          <button
            style={{
              border: "none",
              backgroundColor: "#006439",
              border: "none",
              color: "white",
              marginRight: 150,
              padding: "9px 22px",
              cursor: "pointer",
              fontSize: 12,
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
                            backgroundColor: "#ffffff",
                            border: "thin solid #006439",
                            color: "#006439",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                          }}
                          onClick={() => updateProject(project)}>
                          Edit
                        </button>

                        {/* <button
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
                        </button> */}
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
          {/* <Alert text={alertText} /> */}
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
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Header text="ADD NEW PROJECT" style={{ fontSize: 12 }} />

            <form onSubmit={handleSubmit}>
              <div className="project_row">
                <div className="project_division">
                  <label className="formControlLabel"> Lot Name </label>
                  <input
                    className="formControl"
                    type="text"
                    name="lot_name"
                    value={projectForm.lot_name}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        lot_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="project_division">
                  <label className="formControlLabel"> State </label>
                  <input
                    className="formControl"
                    type="text"
                    name="state"
                    value={projectForm.state}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, state: e.target.value })
                    }
                  />
                </div>
                <div className="project_division">
                  <label className="formControlLabel"> LGA </label>
                  <input
                    className="formControl"
                    type="text"
                    name="lga"
                    value={projectForm.lga}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, lga: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="project_row">
                <div className="project_division">
                  <label className="formControlLabel">
                    {" "}
                    Name of Community{" "}
                  </label>
                  <input
                    className="formControl"
                    type="text"
                    name="name_of_community"
                    value={projectForm.name_of_community}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        name_of_community: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="project_division">
                  <label className="formControlLabel"> Coordinates </label>
                  <input
                    className="formControl"
                    type="text"
                    name="coordinate"
                    value={projectForm.coordinate}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        coordinate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="project_row">
                <div className="project_division">
                  <label className="formControlLabel"> Description</label>
                  <textarea
                    name="description"
                    className="formControl"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }></textarea>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                <h4>Add Project Requirments</h4>
                {projectForm.project_requirements.map((doc, index) => (
                  <div className="project_row">
                    <div className="project_division">
                      <label className="formControlLabel">
                        {" "}
                        Requirement {index + 1}{" "}
                      </label>
                      <input
                        className="formControl"
                        type="text"
                        value={doc.name}
                        onChange={(e) =>
                          handleRequirementInputChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  style={{
                    backgroundColor: "#ffffff",
                    border: "thin solid #006439",
                    color: "#006439",
                    marginRight: 4,
                    padding: "9px 22px",
                    cursor: "pointer",
                    fontWeight: 900,
                    fontSize: 9,
                  }}
                  onClick={addProjectRequirement}>
                  ADD MORE REQUIREMENTS
                </button>
              </div>
              <div style={{ marginTop: "15px" }}>
                <h4>Upload Project Documents</h4>
                {projectForm.project_documents.map((document, index) => (
                  <div className="project_row">
                    <>
                      <div className="project_division">
                        <label className="formControlLabel">
                          {" "}
                          Name of Document {index + 1}
                        </label>
                        <input
                          className="formControl"
                          type="text"
                          value={document.name}
                          onChange={(e) =>
                            handleDocumentInputChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="project_division">
                        <label className="formControlLabel">
                          {" "}
                          Upload Document{" "}
                        </label>
                        <input
                          className="formControl"
                          onChange={(e) => {
                            const formData = new FormData();
                            const files = e.target.files;
                            files?.length && formData.append("file", files[0]);
                            setLoading(true);
                            fetch(
                              "https://api.grants.amp.gefundp.rea.gov.ng/api/admin/projects/file/upload",
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
                                  // formik.values.coren_license_document =
                                  //   data.data.url;
                                  handleInputChange(
                                    index,
                                    "url",
                                    data.data.url
                                  );
                                  setAlert("Uplaoded Succefully");
                                } else {
                                  setAlert(
                                    "Something went wrong. Kindly Upload again"
                                  );
                                }
                                setTimeout(() => {
                                  setAlert("");
                                }, 2000);
                              });
                          }}
                          type="file"
                          // style={{ width: "50%" }}
                          label="License Document"
                        />
                        {/* <input
                          className="formControl"
                          type="text"
                          value={document.url}
                          onChange={(e) =>
                            handleInputChange(index, "url", e.target.value)
                          }
                        /> */}
                      </div>
                    </>
                  </div>
                ))}
                {/* <button type="button" onClick={addProjectDocument}>
                  Add More
                </button> */}

                <button
                  style={{
                    backgroundColor: "#ffffff",
                    border: "thin solid #006439",
                    color: "#006439",
                    marginRight: 4,
                    padding: "9px 22px",
                    cursor: "pointer",
                    fontWeight: 900,
                    fontSize: 9,
                  }}
                  onClick={addProjectDocument}>
                  ADD MORE DOCUMENTS
                </button>
              </div>
              <br /> <br />
              <button
                style={{
                  backgroundColor: "#ffffff",
                  border: "thin solid #006439",
                  color: "#006439",
                  marginRight: 4,
                  padding: "9px 22px",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 9,
                }}
                onClick={() => {
                  setIsOpen(false);
                }}>
                CLOSE
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: "#006439",
                  border: "thin solid #006439",
                  color: "#ffffff",
                  marginRight: 4,
                  padding: "9px 22px",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 9,
                }}>
                {loading ? "SAVING..." : "SAVE"}
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </Fade>
  );
}