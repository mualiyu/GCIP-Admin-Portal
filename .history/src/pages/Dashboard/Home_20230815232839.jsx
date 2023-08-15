import React, { useEffect } from "react";
import "../styles/home.css";
import moment from "moment";
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
  const navigate = useNavigate();

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


  const getAllApplicants = async (programId) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/getAll?program_id=${programId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      // setAllPrograms(data.data.programs);
      let sum =  data.data.count.queried_applications +
      data.data.count.submited_applications +
      data.data.count.successful_applications +
      data.data.count.unsuccessful_applications;
      console.log(sum);
      return sum;
    }
  };



  useEffect(() => {
    getAllPrograms();
    getAllApplicants();
  }, []);

 
  const handleViewSubmissions = (programId) => {
    navigate(`/Home/Submissions/${programId}`);
  };
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          <img id="bg" src="bg.png" alt="m" />
          <div className="home_user">
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
                  <th style={{width: 300}}>Program</th>
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
                    <td onClick={()=> getAllApplicants(prg.id)}>{prg.name}</td>
                    <td>
                      <span>
                        {prg.activeStage.name}
                      </span>
                    </td>
                    <td> {moment(prg.activeStage.start).format('ll')}</td>
                    <td> {moment(prg.activeStage.end).format('ll')}</td>
                    <td> {prg.activeStage.isActive ==  1 ? "Open" : "Closed" }</td>
                    <td>
                        {/* {getAllApplicants(prg?.activeStage?.program_id)} */}
                        {prg.activeStage.program_id}
                      </td>
                    <td style={{display: 'flex'}}>
                        <button style={{border: 'none', border: 'thin solid green', backgroundColor: 'white', color: 'green', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} onClick={() => {
                        dispatch(setId(prg.id));
                        navigate(`/Programme`);
                      }}>
                         View Programme
                        </button>
                        {/* <button style={{border: 'none', backgroundColor: '#006439', border: 'none', color: 'white', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }}  onClick={() => handleViewSubmissions(prg.id)}>
                         View Submissions
                        </button> */}




                      {/* <Button label="View Submissions" 
                      onClick={() => handleViewSubmissions(prg.id)}
                      fontStyle={{
                        color: "var(--primary)",
                      }}
                       style={{
                        marginLeft: 10,
                        backgroundColor: "#fff",
                        border: "1px solid var(--primary)",
                        minWidth: 100,
                      }}
                 /> */}
                     
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
