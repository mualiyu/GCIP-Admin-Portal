import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

export default function Home() {
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
  useEffect(() => {
    getAllPrograms();
  }, []);

  const getAllApplicants = async (id)=>{
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
  }
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          <img id="bg" src="bg.png" alt="m" />
          <div className="home_user">
            {/* <FaUser /> */}
            <span>A</span>
          </div>
        </div>
        <div style={{ width: "10%" }}>
          <Button
            style={{
              marginLeft: "auto",
              marginTop: 30,
              textTransform: "uppercase",
              fontSize : 11
              // width: 200,
            }}
            onClick={() => {
              dispatch(
                setProgram({
                  program: {
                    programName: "",
                    programDescription: "",
                    lots: [],
                    requirements: [],

                    stages: [],
                    uploads: [],
                    status: [],
                  },
                })
              );
              dispatch(setId(""));
              navigate("/Programme");
            }}
            label="Create Program"
          />
        </div>
        <table className="home_table_main">
          {allPrograms.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Active Stage</th>
                  <th>Total Applicants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allPrograms.map((prg, ind) => (
                  <tr key={ind.toString()}>
                    <td onClick={()=> getAllApplicants(prg.id)}>{prg.name}</td>
                    <td>
                      <span>
                        {prg.activeStage.name} <FcCheckmark />
                      </span>
                    </td>
                    <td>{prg.noApplicants} Applicants</td>
                    <td>
                      <div className="table_actions">
                        <FaArrowRight
                          onClick={() => {
                            dispatch(setId(prg.id));
                            navigate(`/Programme`);
                          }}
                          style={{
                            backgroundColor: "#9b9b9b16",
                            height: 15,
                            width: 15,
                            borderRadius: 20,
                            padding: 10,
                            cursor: "pointer",
                          }}
                        />

              

                      </div>
                      <Button
                label="View Submissions"
              />
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        {loading && <MoonLoader/>}
      </div>
    </Fade>
  );
}
