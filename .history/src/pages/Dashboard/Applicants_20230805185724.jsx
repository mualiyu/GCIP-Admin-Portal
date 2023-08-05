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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
  {'name': 'All Applicants', 'value': 'all'},
  {'name': 'Pending', 'value': 'pending'},
  {'name': 'Approved', 'value': 'approved'},
  {'name': 'Declined', 'value': 'declined'}
]


const handleOptionChange = (selection) => {
  setSelectedOption(selection);
  switch (selection) {
    case 'approved':
      setAllApplicants(approved);
      break;
    case 'pending':
      setAllApplicants(pending);
      break;
    case 'declined':
      setAllApplicants(rejected);
      break;
    default:
      setAllApplicants(approved.concat(rejected, pending));
      break;
  }
};

  const handleDownload = (documentName, index) => {
    console.log(index);
    const url = `${documentName}`; 
    window.open(url, '_blank');
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm != '') {
    const filteredData = allApplicants.filter((row) =>
      row.name.toLowerCase().match(searchTerm.toLowerCase()) ||
      row.rc_number.toString().match(searchTerm)
    );
    setAllApplicants(filteredData);
    }
// console.log(event.target.value);
//     event.preventDefault();
//     setSearchTerm(event.target.value);

  
//     allApplicants.filter((row) => {
//       return row.name.match(event.target.value)


//   });

}


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


         <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />


{/* <button onClick={handleSearch}>Search</button> */}

         <FormControl sx={{ m: 1, minWidth: 300 }} style={{marginLeft: 200}}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={selectedOption}
          label="Age"
          onChange={(e) => handleOptionChange(e.target.value)} 
          defaultValue={'all'}
        >
          {options.map((option) => (
          <MenuItem key={option.value} value={option.value} > {option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
            <TableCell>Registered</TableCell>
            <TableCell>CAC</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allApplicants.map((applicant, index) => (
            <TableRow
            key={applicant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {index + 1}
              </TableCell>
              <TableCell style={{textTransform: 'capitalize'}}>
                {applicant?.name } (RC: {applicant?.rc_number}) <br/>
                <span style={{fontSize: 10, color: 'grey'}}>Authorized Rep: {applicant?.person_incharge}</span>
              </TableCell>
              <TableCell>
                P: 0{applicant.phone} <br/>
                <span style={{fontSize: 10, color: 'grey', textTransform: 'lowercase'}}>E: {applicant?.email}</span>
              </TableCell>
              <TableCell>{moment(applicant?.created_at).format('ll')}
              <br/>
                <span style={{fontSize: 10, color: 'grey'}}>At: {moment(applicant?.created_at).format('LT')}</span>
              </TableCell>
              <TableCell>
              <p style={{cursor: "pointer"}} onClick={()=> handleDownload(applicant.cac_certificate, index)}>
                       Download CAC
                        </p> 
              </TableCell>
              <TableCell>
              <p style={{cursor: "pointer"}} onClick={()=> handleDownload(applicant.tax_clearance_certificate, index)}>
                       Download Tax
                        </p> 
              </TableCell>
              <TableCell style={{ color: applicant?.isApproved == 1 ? '#aabf10' : applicant.isApproved == 2 ? 'green' : 'red',}} >
              {applicant?.isApproved == 1 ? "Pending" : applicant.isApproved == 2 ? "Approved" : "Declined"} 
              </TableCell>

              <TableCell>
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
                    
              </TableCell>




            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

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
