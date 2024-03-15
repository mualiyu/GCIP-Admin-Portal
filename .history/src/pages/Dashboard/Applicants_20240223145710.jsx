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
import Loading from "../../components/Loading";
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
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      let waitlist = data.data.applicants.wait_list;
      setApproved(verified);
      setRejected(declined);
      setPending(waitlist);
      setAllApplicants(verified.concat(waitlist, declined));
    }
    // console.log(allApplicants);
  };

  const options = [
    { name: "All Applicants", value: "all" },
    { name: "Pending", value: "pending" },
    { name: "Approved", value: "approved" },
    { name: "Declined", value: "declined" },
  ];

  const handleOptionChange = (selection) => {
    setSelectedOption(selection);
    switch (selection) {
      case "approved":
        setAllApplicants(approved);
        break;
      case "pending":
        setAllApplicants(pending);
        break;
      case "declined":
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
    window.open(url, "_blank");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = allApplicants.filter(
      (row) =>
        row.name.toLowerCase().match(searchTerm.toLowerCase()) ||
        row.rc_number.toString().match(searchTerm)
    );
    setAllApplicants(filteredData);
  };

  const updateApplicantStatus = async (applicantId, status, buttonIndex) => {
    console.log(buttonIndex);
    setButtonLoading((prevState) => ({
      ...prevState,
      [buttonIndex]: true,
    }));
    const newValue = {
      status,
    };
    // console.log(applicantId);
    // console.log(status)
    const response = await query({
      method: "POST",
      url: `/api/admin/applicants/accept?applicant_id=${applicantId}`,
      bodyData: newValue,
      token: programData.user.user.token,
    });

    console.log(response);

    setTimeout(() => {
      setAlert("");
      setButtonLoading((prevState) => ({
        ...prevState,
        [buttonIndex]: false,
      }));
    }, 1000);
    setAlert("Updated successfully!");
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
          <h4 class="header-title">Fixed Columns</h4>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title">Fixed Columns</h4>
                  <p class="text-muted fs-14">
                    When making use of DataTables' x-axis scrolling feature you
                    may wish to fix the left or right most columns in place
                  </p>

                  <table
                    id="fixed-columns-datatable"
                    class="table table-striped nowrap row-border order-column w-100">
                    <thead>
                      <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                        <th>Extn.</th>
                        <th>E-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cara</td>
                        <td>Stevens</td>
                        <td>Sales Assistant</td>
                        <td>New York</td>
                        <td>46</td>
                        <td>2011/12/06</td>
                        <td>$145,600</td>
                        <td>3990</td>
                        <td>c.stevens@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Hermione</td>
                        <td>Butler</td>
                        <td>Regional Director</td>
                        <td>London</td>
                        <td>47</td>
                        <td>2011/03/21</td>
                        <td>$356,250</td>
                        <td>1016</td>
                        <td>h.butler@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Lael</td>
                        <td>Greer</td>
                        <td>Systems Administrator</td>
                        <td>London</td>
                        <td>21</td>
                        <td>2009/02/27</td>
                        <td>$103,500</td>
                        <td>6733</td>
                        <td>l.greer@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Jonas</td>
                        <td>Alexander</td>
                        <td>Developer</td>
                        <td>San Francisco</td>
                        <td>30</td>
                        <td>2010/07/14</td>
                        <td>$86,500</td>
                        <td>8196</td>
                        <td>j.alexander@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Shad</td>
                        <td>Decker</td>
                        <td>Regional Director</td>
                        <td>Edinburgh</td>
                        <td>51</td>
                        <td>2008/11/13</td>
                        <td>$183,000</td>
                        <td>6373</td>
                        <td>s.decker@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Michael</td>
                        <td>Bruce</td>
                        <td>Javascript Developer</td>
                        <td>Singapore</td>
                        <td>29</td>
                        <td>2011/06/27</td>
                        <td>$183,000</td>
                        <td>5384</td>
                        <td>m.bruce@datatables.net</td>
                      </tr>
                      <tr>
                        <td>Donna</td>
                        <td>Snider</td>
                        <td>Customer Support</td>
                        <td>New York</td>
                        <td>27</td>
                        <td>2011/01/25</td>
                        <td>$112,000</td>
                        <td>4226</td>
                        <td>d.snider@datatables.net</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <h1>
            Applicants{" "}
            <span style={{ fontSize: 9, color: "red" }}>
              {allApplicants.length}
            </span>
          </h1>

          {/* <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      /> */}

          <FormControl sx={{ m: 1, minWidth: 300 }} style={{ marginLeft: 200 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={selectedOption}
              label="Age"
              onChange={(e) => handleOptionChange(e.target.value)}
              defaultValue={"all"}>
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {applicant?.name} (RC: {applicant?.rc_number}) <br />
                    <span style={{ fontSize: 10, color: "grey" }}>
                      Authorized Rep: {applicant?.person_incharge}
                    </span>
                  </TableCell>
                  <TableCell>
                    P: 0{applicant.phone} <br />
                    <span
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textTransform: "lowercase",
                      }}>
                      E: {applicant?.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(applicant?.created_at).format("ll")}
                    <br />
                    <span style={{ fontSize: 10, color: "grey" }}>
                      At: {moment(applicant?.created_at).format("LT")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleDownload(applicant.cac_certificate, index)
                      }>
                      Download CAC
                    </p>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleDownload(
                          applicant.tax_clearance_certificate,
                          index
                        )
                      }>
                      Download Tax
                    </p>
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        applicant?.isApproved == 1
                          ? "#aabf10"
                          : applicant.isApproved == 2
                          ? "green"
                          : "red",
                    }}>
                    {applicant?.isApproved == 1
                      ? "Pending"
                      : applicant.isApproved == 2
                      ? "Approved"
                      : "Declined"}
                  </TableCell>

                  <TableCell>
                    {applicant.isApproved == 2 && (
                      <button
                        style={{
                          border: "thin solid green",
                          backgroundColor: "white",
                          color: "green",
                          marginRight: 4,
                          padding: "9px 22px",
                          cursor: "pointer",
                        }}
                        disabled={buttonLoading[index]}
                        onClick={() =>
                          updateApplicantStatus(applicant.id, 3, index)
                        }>
                        {buttonLoading[index] ? "Loading..." : "Revoke"}
                      </button>
                    )}
                    {applicant.isApproved != 2 && (
                      <button
                        style={{
                          backgroundColor: "#006439",
                          border: "none",
                          color: "white",
                          marginRight: 4,
                          padding: "9px 22px",
                          cursor: "pointer",
                        }}
                        disabled={buttonLoading[index]}
                        onClick={() =>
                          updateApplicantStatus(applicant.id, 2, index)
                        }>
                        {buttonLoading[index] ? "Loading..." : "Approve"}
                      </button>
                    )}
                    {applicant?.isApproved == 1 && (
                      <button
                        style={{
                          border: "thin solid red",
                          color: "red",
                          backgroundColor: "white",
                          marginRight: 4,
                          padding: "9px 22px",
                          cursor: "pointer",
                        }}
                        disabled={buttonLoading[index]}
                        onClick={() =>
                          updateApplicantStatus(applicant.id, 3, index)
                        }>
                        {buttonLoading[index] ? "Loading..." : "Decline"}
                      </button>
                    )}
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
            }}>
            <FaFolderOpen />
            <span id="empty"> Oops! Nothing here. </span>
          </div>
        )}

        <Loading loading={loading} />
      </div>
    </Fade>
  );
}
