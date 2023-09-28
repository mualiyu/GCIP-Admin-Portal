import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { programId } = useParams();

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
            onClick={() => createProject()}>
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
      </div>
    </Fade>
  );
}
