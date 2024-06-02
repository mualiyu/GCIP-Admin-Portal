import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Modal from "@mui/material/Modal";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "react-modal";
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
  const [newBusModal, setNewBusModal] = useState(false);
  const handleModalClose = () => setNewBusModal(false);
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    console.log(programData?.user.user.token, "llllll");
  }, []);

  return (
    <section style={{ width: "85%", margin: "0 auto" }}>
      <div className="">
        <button
          className="btn btn-primary p-25"
          onClick={() => setNewBusModal(true)}>
          Add Stage
        </button>
      </div>
      <div className="ertynmsba">
        <div className="flex">
          <Input
            id="stagename"
            required
            outlined
            style={{ width: "50%" }}
            label="Stage Name"
          />
          <Input
            type="file"
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
                    Authorization: "Bearer " + programData.user.user.token,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setLoading(false);
                  if (data.status) {
                    formik.values.stages[index].document = data.data.url;
                    setAlert("Uplaoded Successfully");
                  } else {
                    setAlert("Oops! something didn't go right there");
                  }
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);
                });
            }}
            label="Document"
          />
        </div>
        <div className="flex">
          <Input
            type="date"
            style={{ width: "50%" }}
            label="Start Date"
            outlined
          />
          <Input
            type="date"
            style={{ width: "50%" }}
            label="End Date"
            outlined
          />
        </div>

        <textarea
          style={{ width: "100%", marginTop: 25 }}
          rows={5}
          placeholder="Description"
        />
        <Button
          style={{
            marginRight: 20,
            marginTop: 15,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438",
          }}
          label="Save Record"
        />
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
      <Modal
        open={newBusModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Buses</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" />
                <button className="btn btn-primary p-25 mt-15">
                  Upload Photo
                </button>
              </div>
            </div>
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Bus Make</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="username"
                    placeholder="e.g Honda"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Bus Model</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="username"
                    placeholder="e.g Honda 2010"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> seats</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="seats"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Company of Purchase</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="company_of_purchase"
                    placeholder="Hooli Global Ltd"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Purchase Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="purchase_price"
                    placeholder="0.00"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Purchase Date</label>
                  <input
                    type="date"
                    className="form-control-input "
                    name="purchase_date"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Registration Date</label>
                  <input
                    type="date"
                    className="form-control-input "
                    name="registration_date"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Branch</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Branch</option>
                    <option value="Status 1"> Status 1</option>
                    <option value="Status 2"> Status 2</option>
                    <option value="Status 3"> Status 3</option>
                    <option value="Status 4"> Status 4</option>
                  </select>
                </div>
                <div className="pos-rel w100-m10 "></div>
              </section>
              <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right">
                  Save
                </button>
              </div>
            </form>
          </section>
        </Box>
      </Modal>
    </section>

    // <div className="stages_container">
    //   <Alert text={alertText} />
    //   <RegularText
    //     style={{
    //       fontWeight: "bold",
    //       fontSize: 20,
    //       textTransform: "uppercase",
    //       marginTop: 20,
    //     }}
    //     text="STAGES"
    //   />
    //   <Button
    //     style={{
    //       marginLeft: "auto",
    //       marginTop: 20,
    //     }}
    //     label="Add Stage"
    //   />
    //   <table className="home_table">
    //     <>
    //       <thead>
    //         <tr>
    //           <th>S/N</th>
    //           <th>Name</th>
    //           <th>Sart Date</th>
    //           <th>End Date</th>
    //           <th>Description</th>
    //           <th>Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>1</td>
    //           <td>Name</td>
    //           <td>22/03/2025</td>
    //           <td>22/03/2025</td>
    //           <td>Describe</td>
    //           <td>Edit and Delete</td>
    //         </tr>
    //       </tbody>
    //     </>
    //   </table>

    /* <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div className="inner_modal">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <RegularText
              style={{ textAlign: "Left", fontWeight: "bold", fontSize: 18 }}
              text="Add New Stage"
            />
            <FaTimesCircle
              onClick={() => {
                setIsOpen(false);
                setIsedit(null);
                formik.setValues({ stages: initialValues.stages });
              }}
              style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
            />
          </div>
          <div className="divider" />
          <div className="stage_list">
            <FormikProvider value={formik}>
              <FieldArray
                name="stages"
                render={(arrayHelpers) => {
                  const stages = formik.values.stages;
                  return (
                    <>
                      {stages.length > 0
                        ? formik.values.stages.map((item, index) => (
                            <div className="stages">
                              <Select
                                options={[
                                  "Expression of interest",
                                  "Request of proposal",
                                ]}
                                {...formik.getFieldProps(
                                  `stages.${index}.name`
                                )}
                                onChange={formik.handleChange}
                                label="Name"
                                outlined
                                value={formik.values.stages[index].name}
                              />

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}>
                                <Input
                                  type="date"
                                  {...formik.getFieldProps(
                                    `stages.${index}.startDate`
                                  )}
                                  style={{ width: "50%" }}
                                  onChange={formik.handleChange}
                                  label="Start Date"
                                  outlined
                                  placeholder="Stage Name"
                                />
                                <Input
                                  type="date"
                                  {...formik.getFieldProps(
                                    `stages.${index}.endDate`
                                  )}
                                  style={{ width: "50%" }}
                                  onChange={formik.handleChange}
                                  label="End Date"
                                  outlined
                                  placeholder="Stage Name"
                                />
                              </div>

                              <textarea
                                style={{ width: "100%", marginTop: 25 }}
                                {...formik.getFieldProps(
                                  `stages.${index}.description`
                                )}
                                onChange={formik.handleChange}
                                rows={5}
                                placeholder="Description"
                              />
                              <Input
                                type="file"
                                onChange={(e) => {
                                  const formData = new FormData();
                                  const files = e.target.files;
                                  files?.length &&
                                    formData.append("file", files[0]);
                                  console.log(files[0]);
                                  setLoading(true);
                                  fetch(
                                    "https://api.grants.amp.gefundp.rea.gov.ng/api/admin/program/file/upload",
                                    {
                                      method: "POST",
                                      body: formData,
                                      headers: {
                                        Authorization:
                                          "Bearer " +
                                          programData.user.user.token,
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
                                        setAlert(
                                          "Oops! something didn't go right there"
                                        );
                                      }
                                      setTimeout(() => {
                                        setAlert("");
                                      }, 2000);
                                    });
                                }}
                                label="Document"
                              />
                              {index !== 0 && (
                                <DeleteIcon
                                  onClick={() => removeStage(index)}
                                />
                              )}
                            </div>
                          ))
                        : null}
                    </>
                  );
                }}
              />
              <Button
                onClick={() => {
                  if (editIndex !== null) {
                    const newData = [...presentStage];
                    newData[editIndex] = formik.values.stages[0];

                    setPresentStage(newData);
                    setIsedit(null);
                    setIsOpen(false);
                    formik.setValues({ stages: initialValues.stages });
                    return;
                  }
                  const currentStage = [...presentStage];
                  formik.values.stages[0].key = `${Math.floor(
                    Math.random() * 10
                  )}`;
                  console.log(formik.values.stages);

                  currentStage.push(formik.values.stages[0]);
                  setPresentStage(currentStage);

                  formik.setValues({ stages: initialValues.stages });
                }}
                style={{ width: 100 }}
                label={editIndex !== null ? "Save" : "Add"}
              />
            </FormikProvider>
          </div>
        </div>
      </Modal> */
    // </div>
  );
}
