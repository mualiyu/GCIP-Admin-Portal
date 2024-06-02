import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Modal from "@mui/material/Modal";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
// import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { FcCheckmark } from "react-icons/fc";
import {
  FaEdit,
  FaTrash,
  FaWindowClose,
  FaFolderOpen,
  FaTimesCircle,
} from "react-icons/fa";
import { setProgramStages } from "../../../redux/program/programSlice";
import Select from "../../../components/Select";
import { useEffect } from "react";

export default function Tab3({ moveToTab }) {
  const dispatch = useDispatch();
  const programData = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [newStageModal, setStageModal] = useState(false);
  const handleModalClose = () => setStageModal(false);
  const [editIndex, setIsedit] = useState(null);

  const initialValues = {
    stages: [
      {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        key: "",
        document: "",
      },
    ],
  };

  useEffect(() => {
    console.log(programData?.user.user.token, "llllll");
  }, []);

  return (
    <section style={{ width: "85%", margin: "0 auto" }}>
      <div style={{ margin: "10px 0" }}>
        <RegularText
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "uppercase",
            marginTop: 20,
          }}
          text="STAGES"
        />
        <button
          className="btn btn-primary p-25"
          style={{
            fontSize: 10,
            marginTop: 20,
            fontWeight: 900,
            padding: "10px 40px",
            float: "right",
          }}
          onClick={() => setStageModal(true)}>
          Add Stage
        </button>
      </div>

      <section>
        <table style={{ width: "100%" }}>
          <thead>
            <th style={{ width: 20 }}>S/N</th>
            <th>Name</th>
            <th>Sart Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Stage Name 1</td>
              <td>22/23/2024</td>
              <td>22/23/2024</td>
              <td>Describe this stage clearly here</td>
              <td>Edit and Delete</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Stage Name 1</td>
              <td>22/23/2024</td>
              <td>22/23/2024</td>
              <td>Describe this stage clearly here</td>
              <td>Edit and Delete</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Stage Name 1</td>
              <td>22/23/2024</td>
              <td>22/23/2024</td>
              <td>Describe this stage clearly here</td>
              <td>Edit and Delete</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Stage Name 1</td>
              <td>22/23/2024</td>
              <td>22/23/2024</td>
              <td>Describe this stage clearly here</td>
              <td>Edit and Delete</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Modal open={newStageModal} onClose={handleModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: "white",
            padding: 32,
            boxShadow:
              "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
          }}>
          <div className="mb-35">
            <h4
              className="summary__title t-xl title-case"
              style={{ fontSize: 11 }}>
              Add Stage
            </h4>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Stage</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="username"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Upload Document</label>
                  <input
                    type="file"
                    className="form-control-input "
                    name="doument_upload"
                    style={{ border: "none" }}
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      console.log(files[0]);
                      setLoading(true);
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/admin/program/file/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization:
                              "Bearer " + programData.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.stages[index].document =
                              data.data.url;
                            setAlert("Uplaoded Successfully");
                          } else {
                            setAlert("Oops! something didn't go right there");
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Start Date</label>
                  <input
                    type="date"
                    className="form-control-input "
                    name="start_date"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> End Date</label>
                  <input
                    type="date"
                    className="form-control-input "
                    name="end_date"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Description</label>
                  <textarea
                    type="text"
                    className="form-control-input "
                    name="Description"
                    rows="7"
                  />
                </div>
              </section>
              <div
                className="flex__normal w-30 pull-right mt-35"
                style={{ marginRight: 30 }}>
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary pull-right mr-10"
                  style={{
                    fontSize: 9,
                    // textTransform: "uppercase",
                    fontWeight: 900,
                    padding: "10px 40px",
                  }}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary pull-right"
                  style={{
                    fontSize: 9,
                    // textTransform: "uppercase",
                    fontWeight: 900,
                    padding: "10px 40px",
                  }}>
                  Save
                </button>
              </div>
            </form>
          </section>
        </div>
      </Modal>
    </section>
  );
}
