import React, { useEffect } from "react";
import "../styles/home.css";
import { Fade } from "react-awesome-reveal";
import { FaEdit, FaTrash, FaTimesCircle, FaFolderOpen } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

function createData(
  sn,
  company,
  contact,
  registered,
  cac,
  tax,
  actions,
  status
) {
  return { name, calories, fat, carbs, protein };
}



export default function Submissions() {
  const [buttonLoading, setButtonLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state);
  const navigate = useNavigate();
  const { programId } = useParams();

  const getAllSubmissions = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/getAll?program_id=${programId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      setAllSubmissions(data.data.applications);
    }
  };


  const downloadDocumentsInZip = async (id, title, rowIndex) => {
    setRowLoadingState(rowIndex, true);
    try {
      const response = await fetch(`https://api.grants.amp.gefundp.rea.gov.ng/api/admin/download/applicationDocuments?application=${id}`); 
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.zip`;
      link.click();
      URL.revokeObjectURL(url);
      setRowLoadingState(rowIndex, false);
    } catch (error) {
      console.error('Error downloading document:', error);
      setRowLoadingState(rowIndex, false);
    }
  };


  const setRowLoadingState = (rowIndex, isLoading) => {
    setButtonLoading((prevState) => ({
      ...prevState,
      [rowIndex]: isLoading,
    }));
  };

  const seeDetails = (applicant_id) => {
    console.log(window.location.pathname);
    let programmePath = '/Programme/Application/Submissions/${applicant_id}' ;
    console.log(programmePath);
    if(window.location.pathname == 'programmePath'){
      navigate(`/Programme/Application/Submissions/${programId}/Applicant/${applicant_id}`);
    } else {
      navigate(`/Home/Submissions/${programId}/applicant/${applicant_id}`);
    }
    
  };


  useEffect(() => {
    console.log({programId});
    getAllSubmissions();
  }, []);

  
  return (
    <Fade>
      <div className="home_container">
      <Alert text={alertText} />
        <div className="home_top" style={{ width: "90%" }}>
         <h1>Submissions <span style={{fontSize: 9, color: 'red'}}>{allSubmissions.length}</span></h1>
          <div className="home_user">
            <span>A</span>
          </div>
        </div>

       
        <TableContainer component={Paper} style={{marginTop: 35}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell style={{width: 200}}>Company</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Date of Submission</TableCell>
            <TableCell>Account Status</TableCell>
            <TableCell>Evaluation Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSubmissions.map((applicant, rowIndex) => (
            <TableRow
            key={applicant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {rowIndex + 1}
              </TableCell>
              <TableCell style={{textTransform: 'capitalize'}}>
                {applicant?.applicant?.name } (RC: {applicant?.applicant.rc_number}) <br/>
                <span style={{fontSize: 10, color: 'grey'}}>Authorized Rep: {applicant?.applicant.person_incharge}</span>
              </TableCell>
              <TableCell>
                P: 0{applicant?.applicant.phone} <br/>
                <span style={{fontSize: 10, color: 'grey', textTransform: 'lowercase'}}>E: {applicant?.applicant.email}</span>
              </TableCell>
              <TableCell>{moment(applicant?.updated_at).format('ll')}<br/>
                <span style={{fontSize: 10, color: 'grey'}}>At: {moment(applicant?.updated_at).format('LT')}</span>
              </TableCell>
             
              <TableCell style={{ color: applicant.applicant.isApproved == 2 ? 'green' : 'red',}} >
              {applicant.applicant.isApproved == 2 ? "Active" : "Deactivated"} 
              </TableCell>
              <TableCell style={{ color: applicant.applicant.isApproved == 2 ? 'green' : 'orange',}} >
                  Pending
              </TableCell>
              <TableCell> 
                <button style={{border: 'none', border: 'thin solid green', backgroundColor: 'white', color: 'green', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} disabled={buttonLoading[rowIndex]}  onClick={() => downloadDocumentsInZip(applicant.id, applicant?.applicant?.name, rowIndex)}>
                          {buttonLoading[rowIndex] ? 'Downloading...' : 'Download'}
                        </button>
                        <button style={{border: 'none', backgroundColor: '#006439', border: 'none', color: 'white', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} disabled={buttonLoading[rowIndex]}  onClick={() => seeDetails(applicant.applicant_id)}>
                         See More
                        </button>
                </TableCell>




            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        {allSubmissions.length == 0 && !loading && (
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
