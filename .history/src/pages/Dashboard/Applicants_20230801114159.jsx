import React, { useEffect } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FaEdit, FaTrash, FaTimesCircle, FaFolderOpen } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
import Alert from "../../components/Alert";
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
  const [buttonLoading, setButtonLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
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
    // console.log(data);
    if (success) {
      let verified = data.data.applicants.verified;
      
      let declined = data.data.applicants.declined;
      let waitlist = data.data.applicants.wait_list
      setApproved(verified);
      setRejected(declined);
      setPending(waitlist);
      setAllApplicants(verified.concat(waitlist, declined));
    }
    // console.log(allApplicants);
  };

const options = [
  {'name': 'All', 'value': 'all'},
  {'name': 'Pending', 'value': 'pending'},
  {'name': 'Approved', 'value': 'approved'},
  {'name': 'Declined', 'value': 'declined'}
]


const handleFilter =(selection)=>{
  if(selection == 'approved'){
   setAllApplicants(approved)
  }else if(selection== 'pending'){
    setAllApplicants(pending);
  } else if(selection == 'declined'){
    setAllApplicants(rejected)
  } else {
    setAllApplicants(approved.concat(rejected, pending))
  }
}
  const handleDownload = (documentName, index) => {
    console.log(index);
    const url = `${documentName}`; 
    window.open(url, '_blank');
  };

  const updateApplicantStatus =  async (applicantId, status, buttonIndex) => {
    console.log(buttonIndex);
    setButtonLoading((prevState) => ({
      ...prevState,
      [buttonIndex]: true,
    }));
    const newValue = {
      status
    };
    // console.log(applicantId);
    // console.log(status)
    const response = await query({
      method: "POST",
      url: `/api/admin/applicants/accept?applicant_id=${applicantId}`,
      bodyData: newValue,
      token: programData.user.user.token
    });
    
    
// console.log(response);
    
    setTimeout(() => {
      setAlert("");
      setButtonLoading((prevState) => ({
        ...prevState,
        [buttonIndex]: false,
      }));
    }, 1000);
    setAlert("Updated successfully!")
      getAllApplicants();
};


  useEffect(() => {
    getAllApplicants();
  }, []);
  const navigate = useNavigate();
  return (
    <Fade>
      
      <div className="home_container">
      <Alert text={alertText} />
        <div className="home_top" style={{ width: "90%" }}>
         <h1>Applicants <span style={{fontSize: 9, color: 'red'}}>{allApplicants.length}</span></h1>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>

        <select style={{padding : '7px 6px', borderRadius: 13, width: 200, position: 'relative', top: '4%'}}>
        {options.map((option) => (
          <option key={option.value} value={option.value}  onChange={()=> handleFilter(option.value)}>
            {option.name}
          </option>
        ))}
      </select>



        <table style={{width:' 100%', margin: "25px 0"}} >
        {allApplicants.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th style={{width: 200}}>Company</th>
                  <th>Contact</th>
                  <th>Registered</th>
                  <th>CAC</th>
                  <th>Tax </th>
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
                      <td>
                       <p onClick={()=> handleDownload(applicant.cac_certificate, index)}>
                       Download CAC
                        </p> 
                         </td>
                      <td>
                      <p onClick={()=> handleDownload(applicant.tax_clearance_certificate, index)}>
                       Download Tax
                        </p> 
                      </td>
                    <td style={{ color: applicant?.isApproved == 1 ? '#aabf10' : applicant.isApproved == 2 ? 'green' : 'red',}} >
                      {applicant?.isApproved == 1 ? "Pending" : applicant.isApproved == 2 ? "Approved" : "Declined"} 
                    </td>
                    <td>


                      {applicant.isApproved == 2 &&
                        <button style={{border: 'none', border: 'thin solid green', backgroundColor: 'white', color: 'green', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} disabled={buttonLoading[index]}  onClick={() => updateApplicantStatus(applicant.id, 3, index)}>
                          {buttonLoading[index] ? 'Loading...' : 'Revoke'}
                        </button>
                    }
                      {applicant.isApproved != 2  &&
                        <button style={{border: 'none', backgroundColor: '#006439', border: 'none', color: 'white', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} disabled={buttonLoading[index]}  onClick={() => updateApplicantStatus(applicant.id, 2, index)}>
                          {buttonLoading[index] ? 'Loading...' : 'Approve'}
                        </button>
                      }
                        {applicant?.isApproved == 1 && 
                        <button style={{border: 'none', border: 'thin solid red', color: 'red', backgroundColor: 'white', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }}  disabled={buttonLoading[index]} onClick={() => updateApplicantStatus(applicant.id, 3, index)}>
                         {buttonLoading[index] ? 'Loading...' : 'Decline'} 
                        </button>
                        }
                          {/* 1 Pending
                              2 - Approved
                              3 - Declined */}
                    
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
