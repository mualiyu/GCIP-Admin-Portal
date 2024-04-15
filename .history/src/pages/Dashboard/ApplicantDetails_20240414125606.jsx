import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { Header } from "../../components/Common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import nProgress from "nprogress";
import { formatCurrency } from "../../helpers/formatCurrency";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import "../styles/styles.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import moment from "moment";
import axios from "axios";
import convertToPDF from "../../helpers/convertToPDF";
import { TextField, Autocomplete } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Checkbox from "@mui/material/Checkbox";

function ApplicantDetails() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [alertText, setAlert] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [openReview, setOpenReview] = useState(false);
  const navigate = useNavigate();
  const currLocation = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [whatToSend, setWhatToSend] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [proposalId, setProposalId] = useState(null);
  const { applicant_id, programId } = useParams();

  const [selectedConcern, setSelectedConcern] = React.useState([]);
  const programData = useSelector((state) => state);
  const [proposals, setProposals] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  // const history = useHistory();

  const getData = async () => {
    nProgress.start();
    console.log(programData);
    console.log(currLocation);
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/get-single-application?program_id=${programId}&applicant_id=${currLocation?.state.selectedCompany.applicant_id}`,
      token: programData.user.user.token,
    });
    nProgress.done();
    console.log(data);
    setLoading(false);
    if (success) {
      console.log(data.data.application);
      setCurrent(data?.data?.application);
      setProposalId(data.data.application.proposal_id);
      if (data?.data?.application?.application_decisions?.length > 0) {
        let status =
          data?.data?.application?.application_decisions[
            data?.data?.application?.application_decisions?.length - 1
          ].status;
        setApplicationStatus(status);
      }
    }
    console.log(error);
    console.log(current);
    console.log(applicationStatus);
  };

  // Get Proposals for single applicant
  // const getProposalData = async () => {
  //   setLoading(true);
  //   const { success, data, error } = await query({
  //     method: "GET",
  //     url: `/api/admin/proposals/${programId}/${proposalId}`,
  //     token: programData.user.user.token,
  //   });
  //   if (success) {
  //     console.log(data.data.proposals);
  //     setProposals(data?.data?.proposals);
  //   }

  // };

  const handleOptionChange = (selectedValue) => {
    console.log("Selected Option:", selectedValue);
    setSelectedOption(selectedValue);
  };

  const removeLastPathSegment = () => {
    const segments =
      `/Programme/Application/Submissions/${programId}/Applicant/${applicant_id}`.split(
        "/"
      );
    console.log(segments);
    segments.splice(-2); // Remove the last segment
    console.log(segments.join("/"));
    // return segments.join('/');
    window.location.href = segments.join("/");
  };

  const handleMultiSelectConcernsChange = (listofConcernsxx) => {
    console.log("Selected Concerns:", listofConcernsxx);
    const newArray = [];
    let newConcerns = listofConcernsxx;
    console.log(newConcerns);
    newConcerns.map((item) => {
      newArray.push(item.concern);
    });
    console.log(newArray);
    setSelectedConcern(listofConcernsxx);
    setWhatToSend(newArray);
  };

  const handleDecision = async () => {
    setLoading(true);
    const remarkInput = document.getElementById("remarkInput");
    const remark = remarkInput.value;

    const requestData = {
      application_id: current.id,
      status: selectedOption,
      remark: remark,
      concerns: whatToSend,
    };

    console.log(requestData);
    const { success, data, error } = await query({
      method: "POST",
      url: `/api/admin/program/applications/make-decision`,
      token: programData.user.user.token,
      bodyData: requestData,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      console.log(data);
      setAlert(data.message);
      setLoading(false);
      setOpenReview(false);
      getData();
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
    console.log(data);
  };

  const decisionOptions = [
    { name: "Successful", value: "3" },
    { name: "Query", value: "2" },
    { name: "UnSuccessful", value: "4" },
    { name: "Under Review", value: "5" },
  ];

  const listOfConcerns = [
    {
      concern:
        "Less than 3 experts each with up to 5 years’ minigrid experience included",
      category: "Technical Requirements",
    },
    {
      concern:
        "No Female expert with up to 5 years’ minigrid experience included",
      category: "Technical Requirements",
    },
    {
      concern:
        "No COREN registered Electrical Engineer with up to 5 years’ minigrid experience included",
      category: "Technical Requirements",
    },
    {
      concern:
        "No Female expert with up to 3 years’ experience in the use of solar powered equipment in agriculture value chain included",
      category: "Technical Requirements",
    },
    {
      concern:
        "Experience in designing and building of solar PV minigrid projects each with a minimum size of 30kW presented for less than 3 projects in the past 7 years",
      category: "Technical Requirements",
    },
    {
      concern:
        "Experience in operations and maintenance of solar PV minigrid each with a minimum size of 30kw presented for less than 3 projects in the past 7 years",
      category: "Technical Requirements",
    },
    {
      concern:
        "Less than 3 Solar PV minigrid projects deployed in rural off-grid community with a minimum size of 30kw in the past 7 years ",
      category: "Technical Requirements",
    },
    {
      concern:
        "Less than 3 Solar powered equipment projects deployed for agriculture value chain with a minimum total of 15kw power requirement in the past 7 years",
      category: "Technical Requirements",
    },
    {
      concern:
        "Less than 3 rojects financed through acquisition of grants, equity, or debt in the past 7 years",
      category: "Technical Requirements",
    },
    {
      concern:
        "Inadequate amount raised in grant, equity, or debt for the Applicants’ Eligible Projects",
      category: "Financial Requirements",
    },
    {
      concern:
        "Inadequate average turnover for the recent 3 (three) full financial Requirements years",
      category: "Financial Requirements",
    },
    {
      concern:
        "The last 3 years’ audited account (2020, 2021, 2022) and statement of account for the immediate past six (6) months (January – June 2023)",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of current Pension Compliance Certificate valid until 31st December 2023",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of Industrial Training Fund (ITF) Compliance Certificate valid until 31st December 2023",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing current Nigerian Social Insurance Trust Fund (NSITF) Compliance Certificate valid until 31st December 2023",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing current valid NEMSA License for project developers in the Electric Power Sector issued by the National Electricity Management Services Agency (NEMSA)",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of registration on the National DataBase of Federal project developers, consultants, and service providers by submission of Interim Registration Report (IRR) expiring on 31st December 2023 or valid Certificate issued by the Bureau of Public Procurement",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing duly executed Power of attorney or Board Resolution authorizing a designated officer of the company to act as a representative and to bind the company by signing all bids, contract agreement, and other documents with REA on behalf of the company, duly signed by the chairman and secretary",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of certificate of incorporation with the Corporate Affairs Commission (CAC) including copies of CAC forms 1.1, CO2, and CO7 attached",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of Company Income Tax clearance certificate for the last three years that is 2020, 2021 and 2022",
      category: "Eligibility Requirements",
    },
    {
      concern: "Missing Sworn Affidavit ",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing covering/forwarding letter on the company’s letter Head paper, bearing among other things the Registration Number (RC) as issued by Corporate Affairs Commission (CAC), Contact Address, Telephone Number (Preferable GSM No.) and Email Address. The Letterhead Paper must indicate the names and Nationalities of Directors of the company at the bottom of the page duly signed by the authorized person of the company",
      category: "Eligibility Requirements",
    },
    {
      concern:
        "Missing evidence of Financial capability to execute the project by submission of reference letter and statement of account from a reputable commercial bank in Nigeria, indicating a willingness to provide credit facility for the execution of the project when needed.",
      category: "Eligibility Requirements",
    },
  ];

  const downloadDocumentsInZip = async () => {
    console.log("downloading");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.grants.amp.gefundp.rea.gov.ng/api/admin/download/applicationDocuments?application=${current.id}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${current?.application_profile[0].name}.zip`;
      link.click();
      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading document:", error);
      setLoading(false);
    }
  };

  const downloadProposalDocumentsInZip = async () => {
    console.log("downloading");
    console.log(proposalId);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.grants.amp.gefundp.rea.gov.ng/api/admin/proposals/${programId}/${proposalId}/downloadzip`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${current?.application_profile[0].name}.zip`;
      link.click();
      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading document:", error);
      setLoading(false);
    }
  };

  const handleConvertToPDF = () => {
    console.log("begin");
    convertToPDF(
      "divToPrint",
      `${current.application_profile[0]?.name}`,
      // setBtnLoader
      setIsConverting
    );
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
      minWidth: "60vw",
      overflowX: "hidden",
      maxWidth: "60vw",
      minHeight: "50vh",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  useEffect(() => {
    getData();
    // console.log(currLocation.state);
    setUserInfo(currLocation?.state.selectedCompany.applicant);
    console.log({ applicant_id, programId });
  }, []);

  return (
    <div className="review-container">
      {loading && <Loading loading={loading} />}
      <section id="divToPrint" style={{ width: "100%" }}>
        <Alert text={alertText} />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBotton: 60,
          }}>
          <div>
            <Header
              style={{ color: "var(--primary)", textTransform: "uppercase" }}
              text={userInfo?.name}
            />
            {/* <sup>
              {applicationStatus == 1
                ? "Submitted"
                : applicationStatus == 2
                ? "Queried"
                : applicationStatus == 3
                ? "Successful"
                : applicationStatus == 4
                ? "Unsuccessful"
                : applicationStatus == 5
                ? "Under Review"
                : "Not Reviewed Yet"}
            </sup> */}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleConvertToPDF}
              className="no-print"
              fontStyle={{
                color: "#ffffff",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#ffffff!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              disabled={isConverting == "Converting PDF"}
              label={isConverting ? "Converting PDF" : "Download PDF"}
            />
            <Button
              onClick={() => downloadDocumentsInZip()}
              className="no-print"
              fontStyle={{
                color: "#fff!important",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#fff!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              disabled={loading}
              label="DOWNLOAD ZIP"
            />

            <Button
              onClick={() => setOpenReview(true)}
              className="no-print"
              fontStyle={{
                color: "#fff!important",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#fff!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              disabled={loading}
              label="DECISION"
            />
            {/* <Button
                  className="no-print"
                  fontStyle={{
                    color: "var(--primary)",
                  }}
                  style={{
                    width: 134,
                    backgroundColor: "red",
                    marginRight: 15,
                  }}
                  label="Decline"
                  disabled={loading}
                /> */}
            {/* <Button
                  className="no-print"
                  label="MAKE REVIEW"
                  disabled={loading}
                /> */}
          </div>
        </div>
        {/* {loading && <img src="/loading.gif" id="loader" />} */}
        {/* {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}
        {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )} */}
        {current !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textTransform: "uppercase",
              marginTop: "70px",
              borderBottom: "1px dashed #ccc",
              paddingBottom: 20,
              fontSize: 11,
            }}>
            <div className="lh-2">
              <h2 className="review_title">Business name</h2>
              <p> {userInfo?.name} </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">RC Number</h2>
              <p>{userInfo?.rc_number} </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">Contact</h2>
              <p>
                {userInfo.email} <br />
                {userInfo.phone}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">Authorized Personnel</h2>
              <p>{userInfo.person_incharge}</p>
            </div>
          </div>
        )}

        {current !== null && (
          <div className="lh-2">
            <h2 className="review_title">Business Address</h2>
            <p>{userInfo.address} </p>
          </div>
        )}

        <div class="row" style={{ marginTop: 35 }}>
          <div class="col-xxl-8 col-xl-8 col-lg-8">
            <div class="card ">
              <div class="card-body">
                <div class="welcome-profile">
                  <div class="card-header flex-row"></div>
                  <div class="d-flex align-items-center">
                    <div className="short_name">
                      <span>AB</span>
                    </div>
                    <div class="ms-3">
                      <h4>Welcome, Ahmed Peter !</h4>
                      <p>Here is a summary of your business profile</p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Company Name :{" "}
                          <span className="inffdgshd">Company Name</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          RC Number :{" "}
                          <span className="inffdgshd">RC : 122345</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Username : <span className="inffdgshd">Usrname</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Email :{" "}
                          <span className="inffdgshd">email@ema.coo</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Phone : <span className="inffdgshd">0987654321</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Address :{" "}
                          <span className="inffdgshd">100 main sreet</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Update Your Business Profile</h4>
              </div>
              <div class="card-body">
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5>Update Profile</h5>
                    <a class="" href="#">
                      Update
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5>Change Password</h5>
                    <a class="" href="#">
                      Change
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5>Add JV/Consortium</h5>
                    <a class="" href="#">
                      Update
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {current !== null && (
          <div className="my-60">
            <h2 className="review_title">Selected Program</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current?.application_sublots?.length == 0 && (
              <p className="no-record">No Record was added</p>
            )}
            {current?.application_sublots?.length > 0 && (
              <table
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}
                className="review_table">
                <thead>
                  <th>S/N</th>
                  <th>Lot</th>
                  <th>Sub Lot</th>
                  <th>Region</th>
                </thead>

                <tbody>
                  {current.application_sublots.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td>{++index}</td>
                        <td>{item?.lot_name}</td>
                        <td>{item?.sublot_name}</td>
                        <td>{item?.lot_region}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )} */}

        {/* Assigned Projects */}

        {/* {current !== null && current?.projects_allocated.length > 0 && (
          <div className="my-60">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <h2 className="review_title">PROJECTS ASSIGNED</h2>
              <button
                style={{
                  padding: 9,
                  backgroundColor: "white",
                  border: "thin solid green",
                  color: "green",
                  cursor: "pointer",
                }}
                disabled={loading}
                onClick={() => downloadProposalDocumentsInZip()}>
                Download All Documents
              </button>
            </div>

            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>

            <table
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}
              className="review_table">
              <thead>
                <th>S/N</th>
                <th>Lot</th>
                <th>Location</th>
                <th>Requirements</th>
                <th>Project Documents</th>
                <th>Applicant Uploaded</th>
              </thead>

              <tbody>
                {current?.projects_allocated.map((project, index) => {
                  return (
                    <tr key={project?.id}>
                      <td>{++index}</td>
                      <td>{project?.lot_name}</td>
                      <td style={{ lineHeight: "2em" }}>
                        <strong>State</strong> - {project?.state} <br />
                        <strong>LGA</strong> - {project?.lga} <br />
                        <strong>Community</strong> -{" "}
                        {project?.name_of_community}
                      </td>
                      <td style={{ lineHeight: "2em" }}>
                        {project?.project_requirements.map((req, index) => {
                          return <p> ** {req.name}</p>;
                        })}
                      </td>
                      <td style={{ lineHeight: "2em" }}>
                        {project?.project_documents.map((doc, index) => {
                          return <p> ** {doc.name}</p>;
                        })}
                      </td>

                      <td style={{ lineHeight: "2em" }}>
                        {project?.applicant_uploaded_documents?.map(
                          (uploaded, index) => {
                            return (
                              <p>
                                {uploaded.name} -{" "}
                                <span
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => {
                                    let a = document.createElement("a");
                                    a.href = uploaded.url;
                                    a.download = uploaded.name;
                                    a.target = "_blank";
                                    a.click();
                                  }}>
                                  Download{" "}
                                </span>
                              </p>
                            );
                          }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )} */}

        {/* End Assigned Projects */}

        {current !== null && (
          <div style={{ fontSize: 11, textAlign: "left" }}>
            <h2 className="review_title">Document uploaded</h2>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <thead>
                <th>S/N</th>
                <th style={{ width: "90%" }}>Document</th>
              </thead>
              <tbody>
                {current.application_documents.map((item, index) => {
                  return (
                    <tr key={item?.id}>
                      <td>{++index}</td>
                      <td>{item?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">financial-details</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current?.application_financials?.financial_info?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current?.application_financials?.financial_info?.length > 0 && (
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th></th>
                  <th>Total assets</th>
                  <th>Annual turn over</th>
                  <th>Total networth</th>
                  <th>Total liabilities</th>
                </thead>
                <tbody>
                  {current?.application_financials?.financial_info?.map(
                    (item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.type.toUpperCase()}</td>
                          <td>&#8358;{item?.total_assets}</td>
                          <td>&#8358;{item?.annual_turnover}</td>
                          <td>&#8358;{item?.total_networth}</td>
                          <td>&#8358;{item?.total_liability}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">financial debts information</h2>
            {/* <div
            style={{ borderBottom: "1px dashed #ccc", paddingBottom: 20 }}
          ></div> */}
            {current?.application_financials?.financial_dept_info?.length ==
              0 && <p className="no-record">No Record has been added</p>}
            {current?.application_financials?.financial_dept_info?.length > 0 &&
              current?.application_financials?.financial_dept_info?.map(
                (debt, index) => {
                  return (
                    <div
                      key={debt?.id}
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        marginTop: 12,
                      }}>
                      <div className="project_details">
                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 5,
                          }}>
                          <section
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              // borderTop: "1px dashed #ccc",
                              paddingBottom: 10,
                              marginTop: 20,
                            }}>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Project name
                              </div>
                              <p> {debt?.project_name}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Sector
                              </div>
                              <p>{debt?.sector}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Aggregate
                              </div>
                              <p> {debt?.aggregate_amount}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Evidence of Support
                              </div>
                              <p>
                                {" "}
                                {debt?.evidence_of_support == null
                                  ? "N/A"
                                  : "UPLOADED"}
                              </p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Loaction
                              </div>
                              <p> {debt?.location}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                  color: "#514F4F",
                                }}>
                                Date of Financial Close
                              </div>
                              <p> {debt?.date_of_financial_close}</p>
                            </section>
                          </section>
                        </section>

                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 5,
                            borderTop: "1px solid rgb(204, 204, 204)",
                          }}>
                          {debt?.borrowers?.length > 0 &&
                            debt?.borrowers.map((borrower, index) => {
                              return (
                                <section
                                  style={
                                    {
                                      // borderRight: "thin solid #ccc",
                                      // paddingRight: "20%",
                                    }
                                  }>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                        color: "#514f4fcc",
                                      }}>
                                      Borrower - {++index}
                                    </div>
                                    <p> {borrower?.name}</p>
                                  </section>
                                  {/* <section
                                    style={{ display: "flex", margin: 7 }}
                                  >
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      RC Number
                                    </div>
                                    <p> {borrower?.rc_number}</p>
                                  </section> */}
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                        color: "#514f4fcc",
                                      }}>
                                      Address
                                    </div>
                                    <p> {borrower?.address}</p>
                                  </section>
                                </section>
                              );
                            })}
                        </section>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}

        {current?.application_decisions !== 0 && !loading && (
          <div
            className="my-60"
            style={{ borderTop: "thin dashed grey", padding: "20px 0" }}>
            <h2
              className="review_title"
              style={{ color: "red", fontWeight: 900 }}>
              Application Status Reviews
            </h2>
            {current?.application_decisions?.length == 0 && (
              <p className="review_title"> No reviews yet</p>
            )}
            {current?.application_decisions.length > 0 && (
              <table
                className=""
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>Status</th>
                  <th>Remark</th>
                  <th>Review date</th>
                  <th>Observations</th>
                </thead>
                <tbody>
                  {current?.application_decisions?.map((decision, index) => {
                    return (
                      <tr key={decision.id}>
                        <td>{index + 1}</td>
                        <td>
                          {decision.status == 1
                            ? "Submitted"
                            : decision.status == 2
                            ? "Queried"
                            : decision.status == 3
                            ? "Successful"
                            : decision.status == 5
                            ? "Under Review"
                            : "Unsuccessful"}
                        </td>
                        <td>{decision?.remark}</td>
                        <td>{moment(decision?.updated_at).format("llll")} </td>
                        <td>
                          <ol type="a">
                            {decision?.concerns.map((concern) => {
                              return <li key={concern.id}>{concern}</li>;
                            })}
                          </ol>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {!loading && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "end",
              marginBotton: 60,
            }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => removeLastPathSegment()}
                className="no-print"
                fontStyle={{
                  color: "#ffffff!important",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  color: "#ffffff!important",
                  border: "1px solid var(--primary)",
                  marginRight: 15,
                }}
                lineButton
                disabled={loading}
                label="BACK TO SUBMISSIONS"
              />

              <Button
                onClick={() => setOpenReview(true)}
                className="no-print"
                fontStyle={{
                  color: "#ffffff!important",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  color: "#ffffff!important",
                  border: "1px solid var(--primary)",
                  marginRight: 15,
                }}
                lineButton
                disabled={loading}
                label="DECISION"
              />
            </div>
          </div>
        )}
        {/* <Alert text={alertText} /> */}
      </section>

      <Modal
        isOpen={openReview}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Header text="Review Application" />

            <p>
              Status:{" "}
              {applicationStatus == 1
                ? "Submitted"
                : applicationStatus == 2
                ? "Queried"
                : applicationStatus == 3
                ? "Successful"
                : applicationStatus == 5
                ? "Under Review"
                : "Unsuccessful"}
            </p>
            {/* 1 Submitted 
2 queried
3 successful
4 unsuccessful */}
          </div>
          <div style={{ marginTop: 35 }}>
            <FormControl
              sx={{ m: 1, minWidth: 300 }}
              style={{ width: "28%", marginLeft: 0, marginBottom: 35 }}>
              <InputLabel>Decision</InputLabel>
              <Select
                value={selectedOption}
                id="decided"
                label="Decision"
                style={{ width: "100%" }}
                onChange={(e) => handleOptionChange(e.target.value)}>
                {decisionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              multiple
              id="concernList"
              options={listOfConcerns}
              groupBy={(option) => option.category}
              disableCloseOnSelect
              getOptionLabel={(option) => option.concern}
              value={selectedConcern}
              isOptionEqualToValue={(option, value) =>
                option.concern === value.concern
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.concern}
                </li>
              )}
              style={{ width: "82%" }}
              onChange={(event, newValue) =>
                handleMultiSelectConcernsChange(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select list of concerns..."
                  placeholder="Select one or more"
                />
              )}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <textarea
              name="remark"
              id="remarkInput"
              cols="100"
              rows="10"
              style={{ padding: 18 }}
              placeholder="Add Remark"></textarea>
          </div>

          <div
            style={{
              display: "flex",
              width: "40%",
              marginTop: 48,
              justifyContent: "space-between",
              marginLeft: "auto",
            }}>
            <Button
              onClick={() => {
                setOpenReview(false);
                // navigate("/Home")
              }}
              fontStyle={{
                color: "#006439!important",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#006439!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              label="CANCEL"
            />

            {/* <button style={{border: 'none', border: 'thin solid #006439', color: '#006439', backgroundColor: 'white', marginRight: 4, padding: '9px 22px', cursor: 'pointer' }}  disabled={loading} onClick={() =>  handleDecision()}>
                         {loading ? 'Loading...' : 'SUBMIT'} 
                        </button> */}

            <Button
              onClick={() => {
                handleDecision();
              }}
              disabled={loading}
              fontStyle={{
                color: "#006439!important",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#006439!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              label={loading ? "LOADING..." : "SUBMIT REVISION"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ApplicantDetails;
