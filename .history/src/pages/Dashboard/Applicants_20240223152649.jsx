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
        <div className="home_top" style={{ width: "90%", overflow: "scroll" }}>
          <div class="row">
            <div class="col-12">
              <div class="card" style={{ width: "100%" }}>
                <div class="card-body">
                  <h4 class="header-title">
                    Applicants
                    <span style={{ fontSize: 9, color: "red" }}>
                      {allApplicants.length}
                    </span>
                  </h4>
                  <p class="text-muted fs-14">
                    When making use of DataTables' x-axis scrolling feature you
                    may wish to fix the left or right most columns in place
                  </p>

                  <table
                    id="fixed-columns-datatable"
                    class="table table-striped nowrap row-border order-column w-100">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Company</th>
                        <th>Representative</th>
                        <th>Contact</th>
                        <th>Registered</th>
                        <th>CAC</th>
                        <th>Tax</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>E-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                    {allApplicants.map((applicant, index) => (
                      <tr key={applicant.id}>
                        <td>{index + 1}</td>
                        <td>{applicant?.name} (RC: {applicant?.rc_number})</td>
                        <td>{applicant?.person_incharge}</td>
                        <td>0{applicant.phone}</td>
                        <td>{applicant.email}</td>
                        <td>
                            {moment(applicant?.created_at).format("ll")} @ 
                            {moment(applicant?.created_at).format("LT")}
                        </td>
                        <td>
                              <p
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleDownload(applicant.cac_certificate, index)
                                }>
                                Download CAC
                              </p>
                        </td>
                        <td>
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleDownload(applicant.tax_clearance_certificate, index)
                              }>
                              Download CAC
                            </p>
                        </td>
                       
                      </tr>
})}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

         

      
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
        </div>

        

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
