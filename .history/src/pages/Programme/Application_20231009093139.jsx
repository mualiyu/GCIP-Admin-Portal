import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

export default function Application() {
  const [loading, setLoading] = useState(true);
  const [allPrograms, setAllPrograms] = useState([]);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const getAllPrograms = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/program/list",
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      setAllPrograms(data.data.programs);
    }
  };

  const handleViewSubmissions = (programId) => {
    navigate(`/Programme/Application/Submissions/${programId}`);
  };
  const handleViewProposalSubmissions = (programId) => {
    navigate(`/Programme/Application/Submissions/${programId}`);
  };

  useEffect(() => {
    getAllPrograms();
  }, []);

  const getAllApplicants = async (id) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/getAll?program_id=${id}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      // setAllPrograms(data.data.programs);
      console.log(id);
      console.log(data);
    }
  };

  const getAllProposals = async (id) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/proposals/${id}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      console.log(id);
      console.log(data);
    }
  };

  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          {/* <img id="bg" src="bg.png" alt="m" /> */}
          <div className="home_user">
            <span>A</span>
          </div>
        </div>
        <table className="home_table_main">
          {allPrograms.length > 0 && (
            <>
              <thead>
                <tr>
                  <th style={{ width: 550 }}>Program</th>
                  <th>Stage</th>
                  <th>Start Date</th>
                  <th>End Date </th>
                  <th> Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allPrograms.map((prg, ind) => (
                  <tr key={ind.toString()}>
                    <td onClick={() => getAllApplicants(prg.id)}>{prg.name}</td>
                    <td>
                      <span>{prg.activeStage.name}</span>
                    </td>
                    <td> {moment(prg.activeStage.start).format("ll")}</td>
                    <td> {moment(prg.activeStage.end).format("ll")}</td>
                    <td>
                      {" "}
                      {prg.activeStage.isActive == 1 ? "Open" : "Closed"}
                    </td>
                    {/* <td>{prg.noApplicants}</td> */}
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
                          onClick={() => handleViewSubmissions(prg.id)}>
                          Submissions
                        </button>
                        <button
                          style={{
                            border: "none",
                            border: "thin solid green",
                            backgroundColor: "white",
                            color: "green",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch(setId(prg.id));
                            navigate(`/Programme/Projects/${prg.id}`);
                          }}>
                          Projects
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td onClick={() => getAllApplicants(1)}>REQUEST FOR GRANT</td>
                  <td>
                    <span> - </span>
                  </td>
                  <td> N/A</td>
                  <td> N/A</td>
                  <td> Open</td>
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
                        onClick={() => handleViewProposalSubmissions(1)}>
                        Submissions
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          )}
        </table>
        {loading && <MoonLoader />}
      </div>
    </Fade>
  );
}
