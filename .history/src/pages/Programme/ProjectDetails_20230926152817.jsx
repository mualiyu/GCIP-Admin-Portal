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
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

import Checkbox from "@mui/material/Checkbox";

function ProjectDetails() {
  const { programId, projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState([]);
  const programData = useSelector((state) => state);

  useEffect(() => {
    getProjectDetails(programId, projectId);
    console.log(programId, projectId);
    // initMap();
  }, []);

  const getProjectDetails = async (proId, projId) => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/projects/${proId}/${projId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      setProjectDetails(data);
      console.log(projectDetails);
    }
  };

  //   const initMap = () => {
  //     let mapOptions,
  //       map,
  //       marker,
  //       infoWindow = "",
  //       element = document.getElementById("map-canvas");
  //     mapOptions = {
  //       zoom: 8,
  //       center: new google.maps.LatLng(12.1923, 10.1644),
  //       disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
  //       scrollWheel: true, // If set to false disables the scrolling on the map.
  //       draggable: true, // If set to false , you cannot move the map around.
  //     };
  //     map = new google.maps.Map(element, mapOptions); // Till this like of code it loads up the map.
  //     marker = new google.maps.Marker({
  //       position: mapOptions.center,
  //       map: map,
  //       icon: "http://pngimages.net/sites/default/files/google-maps-png-image-70164.png",
  //       draggable: true,
  //     });
  //   };

  return (
    <div className="review-container">
      {/* {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )} */}
      <section id="divToPrint" style={{ width: "100%;" }}>
        {/* <Alert text={alertText} /> */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBotton: 60,
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <section className="project">
              <div className="project_details">card 1</div>
              <div className="project_assigned"> card 2</div>
            </section>
            <section className="maps">
              <div className="embed_maps" id="map-canvas">
                This is the maps section
              </div>
            </section>
          </div>
        </div>
      </section>

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
