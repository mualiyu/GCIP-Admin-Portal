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

  useEffect(() => {
    getProjectDetails(programId, projectId);
    console.log(programId, projectId);
    // initMap();
  }, []);

  //   const MapContainer = ({ latitude, longitude }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 9.0729,
    lng: 7.4887,
    // lat: projectDetail.latitude,
    // lng: projectDetail.longitude
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

  return (
    <div className="review-container">
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      {/* <section style={{ width: "100%;" }}> */}
      <h2 style={{ marginBottom: 20, color: "#5c5c5c" }}>Project Details</h2>
      <section
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBotton: 60,
        }}>
        <section className="project" style={{ width: "48%" }}>
          <div className="project_details">
            <p className="b-b"> Project Details</p>
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
                  zoom={10}
                  center={defaultCenter}>
                  <Marker position={defaultCenter} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </section>
      </section>
      {/* </section> */}

      {/* <Modal
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
      </Modal> */}
    </div>
  );
}

export default ProjectDetails;
