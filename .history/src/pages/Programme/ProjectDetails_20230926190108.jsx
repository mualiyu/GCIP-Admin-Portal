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
// import { Map, Marker, GoogleApiWrapper } from ‘google-maps-react’
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import moment from "moment";
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
  }, []);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const handleProjectAssignment = async () => {
    setLoading(true);
    const remarkInput = document.getElementById("remarkInput");
    const remark = remarkInput.value;

    const requestData = {
      applicant_id: current.id,
      project_id: projectDetail.id,
    };
  };

  const defaultCenter = {
    lat: 7.4887,
    lng: 9.0729,
    // lat: projectDetail.latitude,
    // lng: projectDetail.longitude
  };

  const assignProject = (id) => {
    console.log(id);
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
      console.log(projectDetail);
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
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}>
        <h2 style={{ marginBottom: 20, color: "#5c5c5c" }}>Project Details</h2>
        <button
          style={{
            backgroundColor: "#ffffff",
            border: "thin solid #006439",
            color: "#006439",
            marginRight: 4,
            padding: "9px 22px",
            cursor: "pointer",
            fontWeight: 900,
            fontSize: 9,
          }}
          onClick={() => {
            setOpenAssignProject(true);
          }}>
          ASSIGN PROJECT
        </button>
      </div>

      <section
        style={{
          display: "flex",
          alignItems: "baseline",
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
                    <li key={req.id}>
                      {" "}
                      {req.name} - <span> Click to Download </span>{" "}
                    </li>
                  ))}
                </ol>
              }
            </div>
          </div>

          <div className="project_assigned project_details">
            <p className="b-b">Project Assigned To</p>
            <p className="details__name" style={{ margin: 30 }}>
              This project has not been assigned to anyone yet... Assign
              Project?
            </p>
          </div>
        </section>
        <section className="maps" style={{ width: "48%" }}>
          <div
            className="embed_maps project_details"
            id="map-canvas"
            style={{ minHeight: 500 }}>
            <p className="b-b">Location on Maps</p>

            <div>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={8}
                  center={defaultCenter}>
                  <Marker position={defaultCenter} />
                </GoogleMap>
              </LoadScript>
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
                // onChange={handleChange}
              >
                {allApplicants?.map((applicant, index) => (
                  <MenuItem value={applicant.id} key={applicant.id}>
                    {index + 1} &nbsp;
                    {applicant.applicant.name} - (RC:
                    {applicant.applicant.rc_number})
                    <br />
                    &nbsp; &nbsp; Person in Charge -{" "}
                    {applicant.applicant.person_incharge}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ marginTop: 20 }}>
            <textarea
              name="remark"
              id="remarkInput"
              //   cols="100"
              //   rows="10"
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
              label={loading ? "LOADING..." : "ASSIGN"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
