import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { Header } from "../../components/Common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import nProgress from "nprogress";
import { formatCurrency } from "../../helpers/formatCurrency";
import Modal from "react-modal";
import TextExtractor from "../../helpers/textExtractor";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import {
  FaPhoneVolume,
  FaEnvelope,
  FaUserTie,
  FaMapLocationDot,
  FaIdCardClip,
} from "react-icons/fa6";
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
      url: `/api/admin/program/applications/get-single-application?program_id=${programId}&applicant_id=${currLocation?.state?.selectedCompany?.applicant_id}`,
      token: programData?.user.user.token,
    });
    nProgress.done();
    console.log(data);
    setLoading(false);
    if (success) {
      console.log(data?.data?.application);
      setCurrent(data?.data?.application);
      setProposalId(data?.data?.application?.proposal_id);
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

  // const handleMultiSelectConcernsChange = (listofConcernsxx) => {
  //   console.log("Selected Concerns:", listofConcernsxx);
  //   const newArray = [];
  //   let newConcerns = listofConcernsxx;
  //   console.log(newConcerns);
  //   newConcerns.map((item) => {
  //     newArray.push(item.concern);
  //   });
  //   console.log(newArray);
  //   setSelectedConcern(listofConcernsxx);
  //   setWhatToSend(newArray);
  // };

  const handleDecision = async () => {
    setLoading(true);
    const remarkInput = document.getElementById("remarkInput");
    const remark = remarkInput.value;

    const requestData = {
      application_id: current.id,
      status: selectedOption,
      remark: remark,
      concerns: [],
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
        `https://api.gcip.rea.gov.ng/api/admin/download/applicationDocuments?application=${current.id}`
      );
      console.log(response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${userInfo?.name}.zip`;
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
      // link.download = `${current?.application_profile[0].name}.zip`;
      link.download = `${userInfo?.name[0]}.zip`;
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
    convertToPDF("divToPrint", `${userInfo?.name}`, setIsConverting);
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
            {/* <Header
              style={{ color: "var(--primary)", textTransform: "uppercase" }}
              text={userInfo?.name}
            /> */}
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
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="no-print">
            <button
              onClick={handleConvertToPDF}
              className="no-print"
              style={{
                border: "none",
                padding: "12px 20px",
                backgroundColor: "#124d92",
                color: "white",
                float: "right",
                // marginTop: 35,
                cursor: "pointer",
                borderTopLeftRadius: 10,
              }}
              disabled={isConverting == "Converting PDF"}>
              {" "}
              {isConverting ? "Converting PDF" : "Download PDF"}
            </button>

            <button
              onClick={() => downloadDocumentsInZip()}
              className="no-print"
              style={{
                border: "none",
                padding: "12px 20px",
                backgroundColor: "orange",
                color: "white",
                float: "right",
                // marginTop: 35,
                cursor: "pointer",
                // borderRight: "2px solid white",
              }}
              disabled={loading}>
              {" "}
              Download ZIP
            </button>
            <button
              onClick={() => setOpenReview(true)}
              className="no-print"
              style={{
                border: "none",
                padding: "12px 20px",
                backgroundColor: "#124d92",
                color: "white",
                float: "right",
                // marginTop: 35,
                cursor: "pointer",
                borderTopRightRadius: 10,
              }}
              disabled={loading}>
              {" "}
              Make Decision
            </button>

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

        <div class="row" style={{}}>
          <div class="col-xxl-12 col-xl-12 col-lg-12">
            <div class="card ">
              <div class="card-body">
                <div class="welcome-profile">
                  <div class="card-header flex-row"></div>
                  <div class="d-flex align-items-center">
                    <div className="short_name">
                      <span style={{ textTransform: "uppercase" }}>
                        {userInfo?.name[0]}
                        {userInfo?.name[1]}
                      </span>
                    </div>
                    <div class="ms-3">
                      <h4>{userInfo?.name}</h4>
                      <p>
                        <span style={{ paddingRight: 10 }}>
                          <FaUserTie />
                        </span>
                        <span className="inffdgshd">
                          {userInfo?.person_incharge}{" "}
                        </span>
                        <span style={{ padding: "0 10px" }}>
                          <FaIdCardClip />
                        </span>
                        RC-{userInfo?.rc_number} |{" "}
                        <span style={{ padding: "0 10px" }}>
                          <FaPhoneVolume />
                        </span>
                        0{userInfo?.phone}
                        <span style={{ padding: "0 10px" }}>
                          <FaEnvelope />
                        </span>
                        <span className="inffdgshd">{userInfo?.email} </span>
                      </p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          <span style={{ marginRight: 10 }}>
                            <FaMapLocationDot />
                          </span>
                          <span className="inffdgshd">
                            {userInfo?.address}{" "}
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Date Submitted :{" "}
                          <span className="inffdgshd">
                            {moment(current?.created_at).format("ll")} @
                            {moment(current?.created_at).format("LT")}
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Review Status :{" "}
                          <span className="inffdgshd">
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
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Selected Lot : &nbsp;
                          <span
                            className="inffdgshd"
                            style={{ textTransform: "capitalize" }}>
                            {current?.lots[0].name}
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="user-info">
                          Reason : &nbsp;
                          <span
                            className="inffdgshd"
                            style={{ textTransform: "capitalize" }}>
                            {TextExtractor(current?.lots[0].choice)}
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {current !== null && (
          <div style={{ fontSize: 11, textAlign: "left" }}>
            <h2 className="review_title">Application Eligibility</h2>
            <table
              className="review_table"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: "11px",
                textTransform: "capitalize",
              }}>
              {/* <thead>
                <th>S/N</th>
                <th style={{ width: "90%" }}>Document</th>
              </thead> */}
              <tbody>
                <tr>
                  <td>1</td>
                  <td> Is Company a Nigerian Origin?</td>
                  <td>
                    {current?.application_eligibility.nigerian_origin == 1
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td> Company Has Been in existence for</td>
                  <td>{current?.application_eligibility.years_of_existence}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td> Company Possesses Innovative Ideas</td>
                  <td>
                    {
                      current?.application_eligibility
                        .does_your_company_possess_an_innovative_idea
                    }
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td> Company Require Assistance to Upscale</td>
                  <td>
                    {
                      current?.application_eligibility
                        .does_your_company_require_assistance_to_upscale
                    }
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td> Extent Company Challenges Financial in Nature</td>
                  <td>
                    {
                      current?.application_eligibility
                        .to_what_extent_are_your_challenges_financial_in_nature
                    }
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    {" "}
                    Is Company Incorporated for Profit Clean-Tech in Nigeria?
                  </td>
                  <td>
                    {current?.application_eligibility
                      .incorporated_for_profit_clean_tech_company == "1"
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

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
            <h2 className="review_title">Application Company Information</h2>
            <table
              className="review_table"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: "11px",
                textTransform: "capitalize",
              }}>
              <thead>
                <th>S/N</th>
                <th style={{ width: "300px" }}>Question</th>
                <th>Response</th>
              </thead>
              <tbody>
                <>
                  <tr key={current?.id}>
                    <td>1</td>
                    <td style={{ width: 300 }}>
                      Describe your company’s corporate profile showing your
                      operational and service areas
                    </td>
                    <td>
                      {TextExtractor(current?.application_company_info.profile)}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td style={{ width: 300 }}>
                      Provide a description of the product/solution that you
                      offer (include product specification and product
                      certification details)
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_company_info
                          .description_of_products
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td style={{ width: 300 }}>
                      Short term objectives for current year
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_company_info.short_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td style={{ width: 300 }}>
                      Medium term objectives (next 1-2 years)
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_company_info.medium_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td style={{ width: 300 }}>
                      Long Term Objectives (3 years and beyond)
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_company_info.long_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td style={{ width: 300 }}>
                      Number of Staff currently employed by your company
                    </td>
                    <td>{current?.application_company_info.number_of_staff}</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td style={{ width: 300 }}> Company Organogram</td>
                    <td>
                      <a
                        style={{ cursor: "pointer" }}
                        href={
                          current?.application_company_info.organizational_chart
                        }
                        target="_blank">
                        {current?.application_company_info
                          .organizational_chart !== null
                          ? "Download"
                          : "N/A"}
                      </a>
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        )}
 {current?.application_business_proposal.length > 0 && (
          <div style={{ fontSize: 11, textAlign: "left" }}>
            <h2 className="review_title">Application Business Proposal</h2>
            <table
              className="review_table"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: "11px",
                textTransform: "capitalize",
              }}>
              <thead>
                <th>S/N</th>
                <th style={{ width: "300px" }}>Question</th>
                <th>Response</th>
              </thead>
              <tbody>
                <>
                  <tr>
                    <td>1</td>
                    <td style={{ width: 300 }}>
                      Have you acquired patency or authority of the patent
                      owners to demonstrate the technology{" "}
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          ?.acquired_authority_of_the_patent_owners
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td style={{ width: 300 }}>
                      Explain/demonstrate the critical need for the
                      technology/solution (i.e. carbon and Global Warming
                      Potential (GWP) reduction, energy efficiency, job
                      creation, rural/urban development etc)
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          .the_critical_need_for_the_technology
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td style={{ width: 300 }}>
                      State the critical needs for the grant and identify areas
                      for intervention
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          .the_critical_needs_for_the_grant
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td style={{ width: 300 }}>
                      Demonstrate consideration for direct and indirect carbon
                      emissions in the design and deployment of your
                      technology/solution, include illustrations, diagrammatic
                      and pictorial references as applicable.
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          .acquired_authority_of_the_patent_owners
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td style={{ width: 300 }}>
                      Have you carried out a market survey to verify that the
                      business can generate enough profit, such that it would
                      not require a continuous subsidy covering operation costs
                      and/or end-user consumption costs;
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          .carried_out_market_survey
                      )}{" "}
                      -
                      <a
                        href={
                          current?.application_business_proposal[0].survey_doc
                        }
                        target="_blank">
                        {current?.application_business_proposal[0]
                          .survey_doc !== null
                          ? "Download Survey Document"
                          : "N/A"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td style={{ width: 300 }}>
                      Value additions that makes your technology/solution stand
                      out in comparison with existing non-clean-tech and
                      clean-tech alternatives to your technology/solution. i.e.
                      innovative business model, cost comparison, technological
                      advantages etc.
                    </td>
                    <td>
                      {TextExtractor(
                        current?.application_business_proposal[0]
                          .valuable_additions_that_makes_your_technology_stand_out
                      )}
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        )}
        {current !== null && (
          <div style={{ fontSize: 11, textAlign: "left" }}>
            <h2 className="review_title">Application Documents</h2>
            <table
              className="review_table"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: "11px",
                textTransform: "capitalize",
              }}>
              <thead>
                <th>S/N</th>
                <th style={{ width: "70%" }}>Document</th>
                <th> Action</th>
              </thead>
              <tbody>
                {current.application_documents.map((item, index) => {
                  return (
                    <tr key={item?.id}>
                      <td>{++index}</td>
                      <td>{item?.name}</td>
                      <td>
                        <a
                          style={{ cursor: "pointer" }}
                          href={item?.url}
                          target="_blank">
                          {item?.url}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {current?.application_decisions !== 0 && !loading && (
          <div className="my-60" style={{ padding: "10px 0" }}>
            <h2
              className="review_title"
              style={{ color: "red", fontWeight: 900 }}>
              Application Status & Reviews
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
                  {/* <th>Observations</th> */}
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
                        {/* <td>
                          <ol type="a">
                            {decision?.concerns.map((concern) => {
                              return <li key={concern.id}>{concern}</li>;
                            })}
                          </ol>
                        </td> */}
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
              <button
                onClick={() => removeLastPathSegment()}
                className="no-print"
                style={{
                  border: "none",
                  padding: "12px 20px",
                  backgroundColor: "#124d92",
                  color: "white",
                  float: "right",
                  marginTop: 35,
                  cursor: "pointer",
                  marginBottom: 60,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                disabled={loading}>
                {" "}
                Back to Submission
              </button>

              <button
                onClick={() => setOpenReview(true)}
                className="no-print"
                style={{
                  border: "none",
                  padding: "12px 20px",
                  backgroundColor: "#124d92",
                  color: "white",
                  float: "right",
                  marginTop: 35,
                  cursor: "pointer",
                  marginBottom: 60,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  borderLeft: "3px solid white",
                }}
                disabled={loading}>
                {" "}
                Make Decision
              </button>
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
              sx={{ m: 1, minWidth: "100%" }}
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

            {/* <Autocomplete
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
            /> */}
          </div>

          <div style={{ marginTop: 20 }}>
            <textarea
              name="remark"
              id="remarkInput"
              cols="120"
              rows="12"
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

            <button
              style={{
                // border: "none",
                border: "thin solid #006439",
                color: "#006439",
                backgroundColor: "white",
                marginRight: 4,
                padding: "9px 22px",
                cursor: "pointer",
              }}
              disabled={loading}
              onClick={() => handleDecision()}>
              {loading ? "Loading..." : "SUBMIT"}
            </button>

            {/* <Button
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
            /> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ApplicantDetails;
