import React, { useEffect } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FaEdit, FaTrash, FaTimesCircle, FaFolderOpen } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
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
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};



export default function Applicants() {
  const [loading, setLoading] = useState(true);
  const [allApplicants, setAllApplicants] = useState([]);
  const [alertText, setAlert] = useState("");
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
      let waitlist = data.data.applicants.wait_list
      setAllApplicants(verified.concat(unverified, waitlist));
    }
    console.log(allApplicants);
  };

 

  const updateApplicantStatus =  async (applicantId, status) => {
    const newValue = {
      status
    };

    console.log(applicantId);
    const response = await query({
      method: "POST",
      url: `/api/admin/applicants/accept?applicant_id=${applicantId}`,
      bodyData: newValue,
      token: programData.user.user.token
    });
    
    
console.log(response);
    setAlert("Approved successfully!")
      getAllApplicants();
      setTimeout(()=>{
        setAlert("");
      }, 4000)
};




  useEffect(() => {
    getAllApplicants();
  }, []);
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
         <h1>Applicants <span style={{fontSize: 9, color: 'red'}}>{allApplicants.length}</span></h1>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>


        <table style={{width:' 100%', margin: "25px 0"}} >
        {allApplicants.length > 0 && (
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
                  <tr key={applicant.id} >
                    <td>{index + 1} </td>
                    <td style={{textTransform: 'capitalize'}}>{applicant?.name } ({applicant?.rc_number}) <br/>
                      <span style={{fontSize: 10, color: 'grey'}}>Authorized Rep: {applicant?.person_incharge}</span>
                    </td>
                    <td>P: {applicant.phone} <br/>
                      <span style={{fontSize: 10, color: 'grey', textTransform: 'lowercase'}}>E: {applicant?.email}</span> </td>
                      <td>{moment(applicant?.created_at).format('ll')}</td>
                    <td>{applicant?.isApproved == 1 ? "Approved" : applicant.isApproved == 2 ? "Declined" : "Pending"} </td>
                    <td>
                        <button style={{border: 'none', padding: '9px 22px', cursor: 'pointer' }}  onClick={() => updateApplicantStatus(applicant.id, 1)}>
                        {applicant?.isApproved ? 'Revoke' : 'Approve'}
                        </button>
                    
                    
                    </td>
                  </tr>
                 ))}
              </tbody>
            </>
               )}
        </table>

        {allApplicants.length == 0 && !loading && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  flexDirection: "column",
                  marginTop: "7%",
                }}
              >
                <FaFolderOpen />
                <span id="empty">
                  {" "}
                  Oops! Nothing here.{" "}
                </span>
              </div>
            )}


     
        {loading && <MoonLoader id="loader" />}
      </div>
    </Fade>
  );
}
