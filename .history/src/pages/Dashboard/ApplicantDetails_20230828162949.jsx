import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { Header } from "../../components/Common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import nProgress from "nprogress";
import { formatCurrency } from "../../helpers/formatCurrency";
import Modal from "react-modal";
import { useFormik } from "formik";
import "../styles/styles.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../components/Button";
import { MoonLoader } from "react-spinners";
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [whatToSend, setWhatToSend] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const { applicant_id, programId } = useParams();
  const [selectedConcern, setSelectedConcern] = React.useState([]);
  const programData = useSelector((state) => state);
  // const history = useHistory();

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
      console.log(data.data.application);
      setCurrent(data?.data?.application);
      let status =
        data?.data?.application?.application_decisions[
          data?.data?.application?.application_decisions?.length - 1
        ].status;
      setApplicationStatus(status);
    }
    console.log(current);
    console.log(applicationStatus);
  };

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

  const handleConvertToPDF = () => {
    console.log("begin");
    convertToPDF(
      "divToPrint",
      `${current.application_profile[0]?.name}`,
      // setBtnLoader
      btnLoader
    );
    console.log(btnLoader);
    if (btnLoader == false) {
      console.log("end");
    }
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
    console.log({ applicant_id, programId });
  }, []);

  return (
    <div className="review-container">
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <section id="divToPrint">
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
              text={
                current?.application_profile?.length > 0 &&
                current?.application_profile[0].name
              }
            />
            <sup>
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
            </sup>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleConvertToPDF}
              className="no-print"
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                color: "#006439!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              disabled={isConverting}
              label="DOWNLOAD SUMMARY"
            />
            <Button
              onClick={() => downloadDocumentsInZip()}
              className="no-print"
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
              disabled={loading}
              label="DOWNLOAD ZIP"
            />

            <Button
              onClick={() => setOpenReview(true)}
              className="no-print"
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
        {loading && (
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
        )}
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
              <p>
                {" "}
                {current?.application_profile.length > 0 &&
                  current?.application_profile[0].name}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">RC Number</h2>
              <p>
                {current?.application_profile.length > 0 &&
                  current?.application_profile[0].cac_number}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">date of incorporation</h2>
              <p>
                {" "}
                {current?.application_profile.length > 0 &&
                  moment(
                    current?.application_profile[0].registration_date
                  ).format("MMM Do YYYY")}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">parent company/owner</h2>
              <p>
                {" "}
                {current?.application_profile[0].owner == null
                  ? "N/A"
                  : current?.application_profile[0].owner}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">Authorized Personnel</h2>
              <p>
                {" "}
                {current?.application_profile.length > 0 &&
                current?.application_profile[0].authorised_personel
                  ? current?.application_profile[0].authorised_personel
                  : "N/A"}{" "}
              </p>
            </div>

            {/* <div className="lh-2">
              <h2 className="review_title">EVIDENCE OF EQUIPMENT <br/> OWNERSHIP</h2>
              <p>
                {" "}
                {current?.evidence_of_equipment_ownership == null ? 'N/A' : "UPLOADED"}{" "}
              </p>
            </div> */}
          </div>
        )}

        {current !== null && (
          <div className="lh-2">
            <h2 className="review_title">Business Description</h2>
            <p>
              {current?.application_profile.length > 0 &&
                current?.application_profile[0].description}{" "}
            </p>
          </div>
        )}
        {current !== null && (
          <div className="lh-2">
            <h2 className="review_title">Business Address</h2>
            <p>
              {current?.application_profile.length > 0 &&
                current?.application_profile[0].address}{" "}
            </p>
            <span>{current?.application_profile[0].website}</span>
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">JOINT VENTURE</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current.jvs?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current.jvs?.length > 0 && (
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>Business Name</th>
                  <th>Contact</th>
                  <th> CAC</th>
                  <th> Audited A/C</th>
                  <th> Income Tax</th>
                  <th> Letter of Auth</th>
                  <th> Affidavit</th>
                </thead>
                <tbody>
                  {current.jvs?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          {item.name} <br />
                          <span>RC:{item.rc_number}</span>
                        </td>
                        <td>
                          {item.email} <br />
                          <span>Phone: {item.phone}</span>
                        </td>
                        <td>{item.evidence_of_cac ? "Uploaded" : "N/A"}</td>
                        <td>{item.audited_account ? "Uploaded" : "N/A"}</td>
                        <td>{item.company_income_tax ? "Uploaded" : "N/A"}</td>
                        <td>
                          {item.letter_of_authorization ? "Uploaded" : "N/A"}
                        </td>
                        <td>{item.sworn_affidavits ? "Uploaded" : "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {current !== null && (
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
        )}

        {current !== null && (
          <div className="directors-container">
            <div className="first f-11">
              <h2 className="review_title">Directors information</h2>
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>FULL Name</th>
                  <th>Contact </th>
                </thead>
                <tbody>
                  {current?.application_profile.length > 0 &&
                    current?.application_profile[0].share_holders.map(
                      (item, index) => {
                        return (
                          <tr key={item?.id}>
                            <td>{++index}</td>
                            <td>{item?.name}</td>
                            <td>{item?.phone}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>

            <div className="f-11">
              <h2 className="review_title"> Contact Person</h2>
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>FULL Name</th>
                  <th>Contact </th>
                  <th>EMAIL</th>
                </thead>
                <tbody>
                  {current?.application_profile.length > 0 &&
                    current?.application_profile[0].contact_persons.map(
                      (item, index) => {
                        return (
                          <tr key={item?.id}>
                            <td>{++index}</td>
                            <td>{item?.name}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.email}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
            <h2 className="review_title">technical requirements (staff)</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current?.application_staff.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current?.application_staff.length > 0 && (
              <table
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}
                className="review_table">
                <thead>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>COREN Member</th>
                  <th>COREN ID</th>
                  <th>Position</th>
                  <th>
                    Uploaded <br /> Educational Cert
                  </th>
                  <th>
                    Uploaded <br /> Coren
                  </th>
                  <th>
                    Uploaded <br /> Professional Cert
                  </th>
                  <th>
                    Uploaded <br /> Resume{" "}
                  </th>
                </thead>

                <tbody>
                  {current?.application_staff.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td>{++index}</td>
                        <td>{item?.name}</td>
                        <td>{item?.gender}</td>
                        <td>
                          {item?.coren_license_number == null ? "NO" : "YES"}
                        </td>
                        <td>
                          {item?.coren_license_number == null
                            ? "N/A"
                            : item?.coren_license_number}
                        </td>
                        <td>
                          {item?.current_position == null
                            ? "N/A"
                            : item?.current_position.position}
                        </td>
                        <td>
                          {item?.education_certificate == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>
                          {item?.coren_license_document == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>
                          {item?.professional_certificate == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>{item?.cv == null ? "N/A" : "UPLOADED"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">reference-project(s)</h2>
            <div style={{ paddingBottom: 20 }}></div>
            {current?.application_projects?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current?.application_projects?.length > 0 && (
              <>
                {current?.application_projects.map((item, index) => {
                  return (
                    <div
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                      }}
                      key={item.id}>
                      <div className="project_details">
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                              color: "#514f4fcc",
                            }}>
                            Project Title :
                          </div>
                          <p> {item.name}</p>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                              color: "#514f4fcc",
                            }}>
                            Employer :
                          </div>
                          <p> {item.employer}</p>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                              color: "#514f4fcc",
                            }}>
                            Project Location :
                          </div>
                          <p> {item?.location}</p>
                        </section>
                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "1px solid #ccc",
                            padding: 10,
                            marginTop: 20,
                          }}>
                          {/* <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                                color: "#514f4fcc",
                              }}>
                              Project Cost :
                            </div>
                            <p> {formatCurrency(item?.project_cost)}</p>
                          </section> */}
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                                color: "#514f4fcc",
                              }}>
                              Award Date:
                            </div>
                            <p>{moment(item?.date_of_contract).format("L")}</p>
                          </section>

                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                                color: "#514f4fcc",
                              }}>
                              Award Letter:
                            </div>
                            <p>
                              {item?.award_letter == null ? "N/A" : "UPLOADED"}
                            </p>
                          </section>
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                                color: "#514f4fcc",
                              }}>
                              Completion date:
                            </div>
                            <p>
                              {" "}
                              {moment(item?.date_of_completion).format("L")}
                            </p>
                          </section>
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                                color: "#514f4fcc",
                              }}>
                              Geo Coordinate:
                            </div>
                            <p> {item?.geocoordinate}</p>
                          </section>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                              color: "#514f4fcc",
                            }}>
                            Description
                          </div>
                          <p style={{ lineHeight: "2em" }}>
                            {" "}
                            {item?.description}
                          </p>
                        </section>
                        <section style={{ display: "flex", margin: "25px 0" }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                              color: "#514f4fcc",
                            }}>
                            Sub Contracted?
                          </div>
                          <p>
                            {" "}
                            {item?.subcontactor_role ? "Yes" : "No"} - &nbsp;{" "}
                            <span style={{ fontWeight: 900 }}> Role</span>{" "}
                            &nbsp; (
                            {item?.subcontactor_role
                              ? item?.subcontactor_role
                              : "N/A"}
                            )
                          </p>
                        </section>

                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "1px solid #ccc",
                            padding: "0 5px",
                            marginTop: 20,
                          }}>
                          {item?.sub_contractors?.length > 0 &&
                            item?.sub_contractors?.map((sc, index) => {
                              return (
                                <section
                                  style={{
                                    borderRight: "thin solid #ccc",
                                    paddingRight: "20%",
                                  }}>
                                  <section
                                    style={{
                                      display: "flex",
                                      margin: "22px 7px",
                                    }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                        color: "#514f4fcc",
                                      }}>
                                      Sub Contractor - {index + 1}
                                    </div>
                                    <p> {sc?.name}</p>
                                  </section>
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
                                    <p> {sc?.address}</p>
                                  </section>
                                </section>
                              );
                            })}

                          {item?.referees?.length > 0 &&
                            item?.referees?.map((rf, index) => {
                              return (
                                <section style={{ display: "flex" }}>
                                  <section style={{ margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                        color: "#514f4fcc",
                                      }}>
                                      Referee - {index + 1}
                                    </div>
                                    <p> {rf?.name}</p>
                                  </section>
                                  <section style={{ margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                        color: "#514f4fcc",
                                      }}>
                                      phone
                                    </div>
                                    <p> {rf?.phone}</p>
                                  </section>
                                </section>
                              );
                            })}
                        </section>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
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
              <p className="review_title"> No review yet</p>
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
                disabled={loading}
                label="BACK TO SUBMISSIONS"
              />

              <Button
                onClick={() => setOpenReview(true)}
                className="no-print"
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
