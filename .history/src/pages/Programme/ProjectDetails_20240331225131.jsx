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
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

import Checkbox from "@mui/material/Checkbox";

function ProjectDetails({ latitude, longitude }) {
  const { programId, projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [alertText, setAlert] = useState("");
  const [mapLocation, setMapLocation] = useState();
  const [projectDetail, setProjectDetails] = useState([]);
  const programData = useSelector((state) => state);
  const [selectedApplicant, setSelectedApplicant] = React.useState([]);
  const [shortlistedApplicants, setShortlistedApplicants] = useState([]);
  const [updatedApplicants, setUpdatedApplicants] = useState([]);
  const [openAssignProject, setOpenAssignProject] = useState(false);
  const [allApplicants, setAllApplicants] = useState([]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "60vw",
      minWidth: "50vw",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  useEffect(() => {
    getProjectDetails(programId, projectId);
    getAllApplicants(programId);
    console.log(programId, projectId);
  }, [loading]);

  const mapStyles = {
    height: "760px",
    width: "100%",
  };

  const assignProject = async () => {
    setLoading(true);
    const bodyDatar = {
      applicant_id: selectedApplicant.id,
      project_id: projectDetail.id,
    };
    console.log(bodyDatar);
    const { success, data, error } = await query({
      method: "POST",
      url: `/api/admin/projects/allocate-project-to-applicant`,
      token: programData.user.user.token,
      bodyData: bodyDatar,
    });
    setLoading(false);
    // console.log(data);
    if (success) {
      console.log(data);
      setAlert(data.message);
      setLoading(false);
      setOpenAssignProject(false);
      getProjectDetails();
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
    console.log(data);
  };

  const resignApplicantFromProject = async (id) => {
    console.log(id);
    setLoading(true);
    const bodyDatar = {
      applicant_id: id,
      project_id: projectDetail.id,
    };
    console.log(bodyDatar);
    const { success, data, error } = await query({
      method: "POST",
      url: `/api/admin/projects/remove-project-from-applicant`,
      token: programData.user.user.token,
      bodyData: bodyDatar,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      console.log(data);
      setAlert(data.message);
      setLoading(false);
      getProjectDetails();
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
    console.log(error);
  };

  const handleOptionChange = (selection) => {
    setSelectedApplicant(selection);
    console.log(selection);
  };

  const getProjectDetails = async (proId, projId) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/projects/${proId}/${projId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      setProjectDetails(data.data.projects);
      console.log(data.data.projects);
      const latlngStr = data?.data?.projects?.coordinate.split(",", 2);
      //   console.log(latlngStr);
      const latlng = {
        lat: parseFloat(latlngStr[0]),
        lng: parseFloat(latlngStr[1]),
      };
      setMapLocation(latlng);
      console.log(mapLocation);
    }
  };

  const getAllApplicants = async (proId) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/applications/getAll?program_id=${proId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      let submit = data.data.applications.submited_applications;
      let declined = data.data.applications.unsuccessful_applications;
      let query = data.data.applications.queried_applications;
      let review = data.data.applications.under_review_applications;
      let passed = data.data.applications.successful_applications;
      let setAll = submit.concat(passed, declined, review, query);
      console.log(setAll);
      setAllApplicants(setAll);
    }
  };

  return (
    <div className="review-container">
      {loading && <Loading loading={loading} />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <h2 style={{ marginBottom: 20, color: "#5c5c5c" }}>Project Details</h2>
        <div>
          <div style={{ width: 400, display: "inline-flex" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Assign this Project to
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Select Applicant"
                onChange={(e) => handleOptionChange(e.target.value)}>
                {allApplicants?.map((applicant, index) => (
                  <MenuItem value={applicant.applicant} key={applicant.id}>
                    {index + 1} &nbsp;
                    {applicant.applicant.name} - (RC:
                    {applicant.applicant.rc_number})
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp;Person in Charge -{" "}
                    {applicant.applicant.person_incharge}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <button
            style={{
              backgroundColor: "#ffffff",
              border: "thin solid #006439",
              color: "#006439",
              marginRight: 4,
              padding: "20px 22px",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 9,
            }}
            onClick={() => {
              // setOpenAssignProject(true);
              assignProject();
            }}>
            ASSIGN PROJECT
          </button>
        </div>
      </div>

      <section
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          marginBotton: 60,
        }}>
        <section className="project" style={{ width: "48%" }}>
          <div className="project_details">
            <div>
              <p className="b-b"> Project Details</p>
            </div>

            <section
              style={{
                padding: "13px 7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>
                <p className="details__name"> {projectDetail.lot_name} </p>
                <p className="details__label"> Lot Name </p>
              </div>
              <div>
                <p className="details__name"> {projectDetail.coordinate} </p>
                <p className="details__label"> Coordinates </p>
              </div>
              <div>
                <p className="details__name">
                  {" "}
                  {moment(projectDetail.created_at).format("ll")}{" "}
                </p>
                <p className="details__label"> Created At </p>
              </div>
            </section>
            <section
              style={{
                padding: "13px 7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>
                <p className="details__name"> {projectDetail.state} </p>
                <p className="details__label"> State </p>
              </div>
              <div>
                <p className="details__name"> {projectDetail.lga} </p>
                <p className="details__label"> LGA </p>
              </div>
              <div>
                <p className="details__name">
                  {" "}
                  {projectDetail.name_of_community}{" "}
                </p>
                <p className="details__label"> Community</p>
              </div>
            </section>
            <section>
              <div>
                <p className="details__label" style={{ paddingBottom: 4 }}>
                  {" "}
                  Description
                </p>
                <p className="details__name"> {projectDetail.description} </p>
              </div>
            </section>
          </div>
          <div className="project_assigned project_details">
            <p className="b-b">Project Requirements </p>

            <div style={{ padding: 15 }}>
              {
                <ol className="req">
                  {projectDetail?.project_requirements?.map((req, index) => (
                    <li key={req.id}> {req.name}</li>
                  ))}
                </ol>
              }
            </div>
          </div>

          <div className="project_assigned project_details">
            <p className="b-b">Project Documents </p>

            <div style={{ padding: 15 }}>
              {
                <ol className="req">
                  {projectDetail?.project_documents?.map((doc, index) => (
                    <li key={doc.id}>
                      {" "}
                      {doc.name} -{" "}
                      <span
                        onClick={() => {
                          let a = document.createElement("a");
                          a.href = doc.url;
                          a.download = doc.name;
                          a.target = "_blank";
                          a.click();
                        }}>
                        {" "}
                        Click to Download{" "}
                      </span>{" "}
                    </li>
                  ))}
                </ol>
              }
            </div>
          </div>

          <div className="project_assigned project_details">
            <p className="b-b">Project Assigned To:</p>
            {projectDetail?.assigned_applicants?.length > 0 && (
              <div style={{ padding: 15 }}>
                {
                  <ol className="req">
                    {projectDetail?.assigned_applicants?.map(
                      (assigned, index) => (
                        <li key={assigned.id}>
                          {" "}
                          {assigned.name} -{" "}
                          <span> ({assigned.rc_number}) </span> <br />
                          Person in Charge - {assigned.person_incharge} - (0
                          {assigned.phone})
                          <button
                            style={{
                              backgroundColor: "#ffffff",
                              border: "thin solid #006439",
                              color: "#006439",
                              marginLeft: 20,
                              padding: "9px 22px",
                              cursor: "pointer",
                              fontWeight: 900,
                              fontSize: 9,
                            }}
                            onClick={() => {
                              resignApplicantFromProject(assigned.id);
                            }}>
                            RESIGN
                          </button>
                        </li>
                      )
                    )}
                  </ol>
                }
              </div>
            )}
            {projectDetail?.assigned_applicants?.length == 0 && (
              <p className="details__name" style={{ padding: 35 }}>
                This project has not been assigned to anyone yet... Assign
                Project?
              </p>
            )}
          </div>
        </section>
        <section className="maps" style={{ width: "50%" }}>
          <div>
            {/* <p className="details__label"> Coordinates </p> */}
            <div className="embed_maps project_details" id="map-canvas">
              <div>
                <LoadScript googleMapsApiKey="AIzaSyCq0FkBTNIx5IuAea1vMP2WXr1YMkQdj3o">
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={8}
                    center={mapLocation}
                    options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}>
                    <Marker position={mapLocation} />
                    <Marker position={mapLocation} />
                    <Marker position={mapLocation} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Modal
        isOpen={openAssignProject}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <div style={{ marginTop: 35 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Applicant
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Select Applicant"
                onChange={(e) => handleOptionChange(e.target.value)}>
                {allApplicants?.map((applicant, index) => (
                  <MenuItem value={applicant.applicant} key={applicant.id}>
                    {index + 1} &nbsp;
                    {applicant.applicant.name} - (RC:
                    {applicant.applicant.rc_number})
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp;Person in Charge -{" "}
                    {applicant.applicant.person_incharge}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                setOpenAssignProject(false);
              }}
              fontStyle={{
                color: "#006439!important",
              }}
              style={{
                width: 134,
                backgroundColor: "#006439!important",
                color: "#FFF!important",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              lineButton
              label="CANCEL"
            />
            <Button
              onClick={() => {
                assignProject();
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
              label={loading ? "LOADING..." : "ASSIGN"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
