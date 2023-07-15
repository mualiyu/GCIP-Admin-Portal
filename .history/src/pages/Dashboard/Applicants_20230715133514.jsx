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
import moment from "moment";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

export default function Applicants() {
  const [loading, setLoading] = useState(true);
  const [allApplicants, setAllApplicants] = useState([]);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const getAllApplicants = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/applicants/list",
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      let verified = data.data.applicants.verified;
      let unverified = data.data.applicants.unverified;
      setAllApplicants(verified.concat(unverified));
    }
    console.log(allApplicants);
  };
  useEffect(() => {
    getAllApplicants();
  }, []);
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
         <h1>Applicants</h1>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>
        <table style={{width:' 100%', margin: "25px 0"}} >
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Registered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
             

            
              <tbody>
              {allApplicants.map((applicant, index)=>(
                  <tr key={applicant.id}>
                    <td>{index + 1} </td>
                    <td style={{textTransform: 'titlecase'}}>{applicant.name }({applicant.rc_number}) <br/>
                      <span>Rep: {applicant.person_incharge}</span>
                    </td>
                    <td>{applicant.phone} <br/>
                      <span>{applicant.email}</span> </td>
                      <td>{moment(applicant.created_at).format('ll')}</td>
                    <td>{applicant.isApproved == 1 ? "Approved" : applicant.isApproved == 2 ? "Declined" : "Pending"} </td>
                    <td>Pending Review </td>
                  </tr>
                 ))}
              </tbody>
            </>
        </table>
        {loading && <MoonLoader id="loader" />}
      </div>
    </Fade>
  );
}
