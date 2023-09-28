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
  const initialProjectDocument = {
    name: '',
    url: '',
  };
  
  const initialProjectRequirement = {
    name: '',
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
  const addProjectDocument = () => {
    setProjectForm({
      ...projectForm,
      project_documents: [...projectForm.project_documents, initialProjectDocument],
    });
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedProjectDocuments = projectForm.project_documents.map((doc, i) =>
      i === index ? { ...doc, [fieldName]: value } : doc
    );

    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProjectDocument();
    console.log(projectForm);
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
            }}>
            <Header text="ADD PROJECT" />
            <span style={{ marginTop: 10 }}>Create Project</span>

            <form onSubmit={handleSubmit}>
              Lot Name{" "}
              <input type="text" name="lot_name" onChange={handleChange} />
              State <input type="text" name="state" onChange={handleChange} />
              LGA <input type="text" name="lga" onChange={handleChange} />
              Name of Community{" "}
              <input
                type="text"
                name="name_of_community"
                onChange={handleChange}
              />
              Description
              <input type="text" name="description" onChange={handleChange} />
              Coordinate{" "}
              <input type="text" name="coordinate" onChange={handleChange} />

              {projectForm.project_documents.map((document, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Document Name"
            value={document.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Document URL"
            value={document.url}
            onChange={(e) => handleInputChange(index, 'url', e.target.value)}
          />
        </div>
      ))}



              <button type="submit"> Save </button>
            </form>
          </div>
        </Modal>
      </div>
    </Fade>
  );
}
