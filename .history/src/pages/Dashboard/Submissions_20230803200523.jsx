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
import { setId, setProgram } from "../../redux/program/programSlice";
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
  const [selectedOption, setSelectedOption] = useState('');
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


  const handleDownload = (documentName, index) => {
    console.log(index);
    const url = `${documentName}`; 
    window.open(url, '_blank');
  };

  useEffect(() => {
    console.log({programId});
    getAllSubmissions();
  }, []);

  const navigate = useNavigate();
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSubmissions.map((applicant, index) => (
            <TableRow
            key={applicant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {index + 1}
              </TableCell>
              <TableCell style={{textTransform: 'capitalize'}}>
                {applicant?.applicant?.name } (RC: {applicant?.applicant.rc_number}) <br/>
                <span style={{fontSize: 10, color: 'grey'}}>Authorized Rep: {applicant?.applicant.person_incharge}</span>
              </TableCell>
              <TableCell>
                P: 0{applicant?.applicant.phone} <br/>
                <span style={{fontSize: 10, color: 'grey', textTransform: 'lowercase'}}>E: {applicant?.applicant.email}</span>
              </TableCell>
              <TableCell>{moment(applicant?.created_at).format('ll')}</TableCell>
             
              <TableCell style={{ color: applicant.applicant.isApproved == 2 ? 'green' : 'red',}} >
              {applicant.applicant.isApproved == 2 ? "Active" : "Deactivated"} 
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