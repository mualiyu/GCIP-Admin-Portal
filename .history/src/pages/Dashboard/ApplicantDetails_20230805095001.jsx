import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { Header } from "../../components/Common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import nProgress from "nprogress";
import Modal from "react-modal";
import Button from "../../components/Button";
import { MoonLoader } from "react-spinners";
import moment from "moment";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function ApplicantDetails() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const [openSubmittedModal, setOpenSubmittedModal] = useState(false);
  const navigate = useNavigate();
  const [isConverting, setIsConverting] = useState(false);
  const { applicant_id, programId } = useParams();
  const programData = useSelector((state) => state);
  const getData = async () => {
    nProgress.start();
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/getOne?program_id=${programId}&applicant_id=${applicant_id}`,
      token: programData.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (success) {
        console.log(data.data.application)
      setSummary(data.data.application);
      console.log(summary)
    }
  };
  const handleConvertToPDF = () => {
    convertToPDF('divToPrint', `${current.application_profile[0]?.name}`, setIsConverting);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "90vh",
      minWidth: "40vw",
      overflowX: "hidden",
      maxWidth: "40vw",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  useEffect(() => {
    getData();
    console.log({applicant_id, programId});
  }, []);
  

  return (
    <div className="review-container" style={{padding: 30}}>
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <section id="divToPrint">

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Company's Staff Members">
        <TableHead>
          <TableRow>
          <TableCell>S/N</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Current Position</TableCell>
            <TableCell>Coren Member</TableCell>
            <TableCell>Coren License No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary?.application_staff?.map((staff, rowIndex) => (
            <TableRow
              key={staff.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                {rowIndex + 1}
              </TableCell>

              <TableCell component="th" scope="row" style={{textTransform: 'capitalize'}}>
                {staff.name}
              </TableCell>
              <TableCell style={{textTransform: 'capitalize'}}>{staff.gender}</TableCell>
              <TableCell>{staff.current_position == null ? 'N/A': staff.current_position}</TableCell>
              <TableCell>{staff.membership == null ? 'N/A': staff.membership }</TableCell>
              <TableCell>{staff.coren_license_number == null ? 'N/A': staff.coren_license_number  }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
      

       
        


      </section>
      {/* </Preview> */}








      <Modal
        isOpen={openSubmittedModal}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header text="Application submitted" />
            <div className="">
             <p style={{lineHeight: '2em'}}>
             Thank you for your interest in the UNDP-GEF Africa Minigrids Program (AMP). Your application has been submitted successfully. <span style={{fontWeight: 900}}>Your application will be opened in a hybrid physical-virtual ceremony at 1.00pm (WAT) on Thursday 17th August 2023.   </span>

<br/> <br/>The virtual link is attached in the confirmation email sent to you.

For further enquiry, kindly drop a message on the platform. Thank you!
             </p>
            </div>




            <div
              style={{
                display: "flex",
                width: "25%",
                marginTop: 48,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={() => {
                  setOpenSubmittedModal(false);
                  navigate("/Home")
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="Return to Home"
              />
             
            </div>
          </div>
      </Modal>
    </div>
  );
}

export default ApplicantDetails;
