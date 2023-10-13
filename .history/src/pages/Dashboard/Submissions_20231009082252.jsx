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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

export default function Submissions() {
  const [buttonLoading, setButtonLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [successful, setSuccessful] = useState([]);
  const [review, setReview] = useState([]);
  const [unSuccessful, setUnSuccessful] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState([]);
  const [queried, setQueried] = useState([]);
  const [submissionType, setSubmissionType] = useState(null);
  // const [allSubmissions, setAllSubmissions] = useState([]);
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
      console.log(data.data);
      let submit = data.data.applications.submited_applications;
      let declined = data.data.applications.unsuccessful_applications;
      let query = data.data.applications.queried_applications;
      let review = data.data.applications.under_review_applications;
      let passed = data.data.applications.successful_applications;

      setSubmitted(submit);
      setSuccessful(passed);
      setUnSuccessful(declined);
      setReview(review);
      setQueried(query);

      let allTheApplications = submit.concat(passed, declined, query);
      // setAllSubmissions(submitted);

      const sortedByDate = allTheApplications.sort(
        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
      );
      setAllSubmissions(sortedByDate);
    }
  };

  const options = [
    { name: "All Submissions", value: "all" },
    { name: "Queried", value: "queried" },
    { name: "Successful", value: "successful" },
    { name: "UnSuccessful", value: "unSuccessful" },
    { name: "Under Review", value: "under_review" },
  ];

  const handleOptionChange = (selection) => {
    setSelectedOption(selection);
    switch (selection) {
      case "successful":
        setAllSubmissions(successful);
        break;
      case "unSuccessful":
        setAllSubmissions(unSuccessful);
        break;
      case "under_review":
        setAllSubmissions(review);
        break;
      case "all":
        setAllSubmissions(
          submitted.concat(unSuccessful, queried, review, successful)
        );
        break;
      case "queried":
        setAllSubmissions(queried);
        break;
      default:
        setAllSubmissions(
          submitted.concat(unSuccessful, review, queried, successful)
        );
        break;
    }
  };

  // const handleProgramOptionChange = (selection) => {
  //   setSubmissionType(selection);
  //   switch (selection) {
  //     case "prequalification":
  //       setAllSubmissions(successful);
  //       break;
  //     case "unSuccessful":
  //       setAllSubmissions(unSuccessful);
  //       break;
  //     case "under_review":
  //       setAllSubmissions(review);
  //       break;
  //     case "all":
  //       setAllSubmissions(
  //         submitted.concat(unSuccessful, queried, review, successful)
  //       );
  //       break;
  //     case "queried":
  //       setAllSubmissions(queried);
  //       break;
  //     default:
  //       setAllSubmissions(
  //         submitted.concat(unSuccessful, review, queried, successful)
  //       );
  //       break;
  //   }
  // };

  const downloadDocumentsInZip = async (id, title, rowIndex) => {
    setRowLoadingState(rowIndex, true);
    try {
      const response = await fetch(
        `https://api.grants.amp.gefundp.rea.gov.ng/api/admin/download/applicationDocuments?application=${id}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.zip`;
      link.click();
      URL.revokeObjectURL(url);
      setRowLoadingState(rowIndex, false);
    } catch (error) {
      console.error("Error downloading document:", error);
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
    if (
      window.location.toString().includes("/Programme/Application/Submissions")
    ) {
      navigate(
        `/Programme/Application/Submissions/${programId}/Applicant/${applicant_id}`
      );
    } else {
      navigate(`/Home/Submissions/${programId}/applicant/${applicant_id}`);
    }
  };

  useEffect(() => {
    console.log({ programId });
    getAllSubmissions();
  }, []);

  return (
    <Fade>
      <div className="home_container">
        <Alert text={alertText} />
        <div className="home_top" style={{ width: "90%" }}>
          <h1>
            Submissions
            <span style={{ fontSize: 9, color: "red" }}>
              {allSubmissions?.length}
            </span>
          </h1>

          <FormControl sx={{ m: 1, minWidth: 300 }} style={{ marginLeft: 200 }}>
            <InputLabel>Select Prgram Type</InputLabel>
            <Select
              value={submissionType}
              label="Filter"
              onChange={(e) => handleProgramOptionChange(e.target.value)}
              defaultValue={"prequalification"}>
              <MenuItem value="prequalification"> Pre-Qualification</MenuItem>
              <MenuItem value="proposal"> Request for Proposal </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }} style={{ marginLeft: 200 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={selectedOption}
              label="Filter"
              onChange={(e) => handleOptionChange(e.target.value)}
              defaultValue={"successful"}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {" "}
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="home_user">
            <span>A</span>
          </div>
        </div>

        <TableContainer component={Paper} style={{ marginTop: 35 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell style={{ width: 200 }}>Company</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date of Submission</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell>Evaluation Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSubmissions?.map((applicant, rowIndex) => (
                <TableRow
                  key={applicant.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {rowIndex + 1}
                  </TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {applicant?.applicant?.name} (RC:{" "}
                    {applicant?.applicant.rc_number}) <br />
                    <span style={{ fontSize: 10, color: "grey" }}>
                      Authorized Rep: {applicant?.applicant.person_incharge}
                    </span>
                  </TableCell>
                  <TableCell>
                    P: 0{applicant?.applicant.phone} <br />
                    <span
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textTransform: "lowercase",
                      }}>
                      E: {applicant?.applicant.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(applicant?.updated_at).format("ll")}
                    <br />
                    <span style={{ fontSize: 10, color: "grey" }}>
                      At: {moment(applicant?.updated_at).format("LT")}
                    </span>
                  </TableCell>

                  <TableCell
                    style={{
                      color:
                        applicant.applicant.isApproved == 2 ? "green" : "red",
                    }}>
                    {applicant.applicant.isApproved == 2
                      ? "Active"
                      : "Deactivated"}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        applicant?.status == 2
                          ? "#aabf10"
                          : applicant.status == 3
                          ? "green"
                          : applicant.status == 1
                          ? "black"
                          : "red",
                    }}>
                    {/* Pending */}
                    {applicant.status == 1
                      ? "Submitted"
                      : applicant.status == 2
                      ? "Queried"
                      : applicant.status == 3
                      ? "Successful"
                      : applicant.status == 5
                      ? "Under Review"
                      : "Unsuccessful"}
                  </TableCell>
                  <TableCell>
                    {/* <button style={{border: 'none', border: 'thin solid green', backgroundColor: 'white', color: 'green', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }} disabled={buttonLoading[rowIndex]}  onClick={() => downloadDocumentsInZip(applicant.id, applicant?.applicant?.name, rowIndex)}>
                          {buttonLoading[rowIndex] ? 'Downloading...' : 'Download'}
                        </button> */}
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#006439",
                        border: "none",
                        color: "white",
                        marginRight: 4,
                        padding: "9px 22px",
                        cursor: "pointer",
                      }}
                      disabled={buttonLoading[rowIndex]}
                      onClick={() => seeDetails(applicant.applicant_id)}>
                      See More
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {allSubmissions?.length == 0 && !loading && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              flexDirection: "column",
              marginTop: "7%",
            }}>
            <FaFolderOpen />
            <span id="empty"> Oops! Nothing here. </span>
          </div>
        )}

        {loading && <MoonLoader id="loader" />}
      </div>
    </Fade>
  );
}
