import React, { useEffect } from "react";
import "../styles/home.css";
import moment from "moment";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import Loading from "../../components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [allPrograms, setAllPrograms] = useState([]);
  const [sum, setSum] = useState();
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllPrograms = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/program/list",
      token: programData.user.user.token,
    });

    console.log(data);
    if (success) {
      data.data.programs?.map((program) => {
        getAllApplicants(program?.activeStage?.program_id);
      });
      setAllPrograms(data.data.programs);
      setLoading(false);
    }
  };

  const viewProgramDetails = (programId) => {
    console.log("hey");
    navigate(`/Home/Program/${programId}/details`);
  };

  const getAllApplicants = async (programId) => {
    try {
      const { success, data } = await query({
        method: "GET",
        url: `/api/admin/program/applications/getAll?program_id=${programId}`,
        token: programData.user.user.token,
      });

      if (success) {
        // console.log(data.data);
        const { count } = data.data;
        const sumxx =
          count.queried_applications +
          count.submited_applications +
          count.successful_applications +
          count.unsuccessful_applications;
        setLoading(false);
        setSum(sumxx);
        // console.log(sum);
      } else {
        console.error("API request unsuccessful:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setLoading(false);
    return 0;
  };

  useEffect(() => {
    getAllPrograms();
    // getAllApplicants();
  }, []);

  const handleViewSubmissions = (programId) => {
    navigate(`/Home/Submissions/${programId}`);
  };
  return (
    <Fade>
      <>
        <div
          className="flex"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f3f3f3",
            padding: "0 40px",
          }}>
          {loading && <Loading loading={loading} />}
          <h3>Open Programs</h3>
          <button
            style={{
              border: "thin solid #124d92",
              backgroundColor: "#124d92",
              color: "#fff",
              marginRight: 4,
              padding: "9px 22px",
              cursor: "pointer",
              borderRadius: 5,
              fontWeight: 600,
              marginTop: 20,
            }}
            onClick={() => {
              navigate(`/Programme`);
            }}>
            Create New Program
          </button>
        </div>
        <div className="home_container">
          {allPrograms.length > 0 && (
            <table className="home_table_main">
              <>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th style={{ width: 350 }}>Program</th>
                    <th>Stage</th>
                    <th>Start Date</th>
                    <th>End Date </th>
                    <th> Status</th>
                    <th>Submissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allPrograms.map((prg, ind) => (
                    <tr key={ind.toString()}>
                      <td>{ind + 1} </td>
                      <td onClick={() => getAllApplicants(prg.id)}>
                        {prg.name}
                      </td>
                      <td>
                        <span>{prg.activeStage.name}</span>
                      </td>
                      <td> {moment(prg.activeStage.start).format("ll")}</td>
                      <td> {moment(prg.activeStage.end).format("ll")}</td>
                      <td>
                        {" "}
                        {prg.activeStage.isActive == 1 ? "Open" : "Closed"}
                      </td>
                      <td>{sum}</td>
                      <td style={{ display: "flex" }}>
                        <button
                          style={{
                            border: "thin solid #124d92",
                            backgroundColor: "white",
                            color: "#124d92",
                            marginRight: 4,
                            padding: "9px 22px",
                            cursor: "pointer",
                            borderRadius: 5,
                            fontWeight: 600,
                          }}
                          onClick={() => viewProgramDetails(prg.id)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            </table>
          )}

          {loading && <Loading />}
        </div>
        {allPrograms.length === 0 && !loading && (
          <p
            style={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}>
            <FaFolderOpen /> &nbsp; Oops! There are no programmes yet... Create
            New?
          </p>
        )}
      </>
    </Fade>
  );
}
