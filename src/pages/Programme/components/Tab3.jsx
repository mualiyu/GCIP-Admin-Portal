import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../../components/Alert";
import { FcCheckmark } from "react-icons/fc";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import { setProgramStages } from "../../../redux/program/programSlice";
import Select from "../../../components/Select";
export default function Tab3({ moveToTab }) {
  const dispatch = useDispatch();
  const programData = useSelector((state) => state.program);
  const [alertText, setAlert] = useState("");
  const [presentStage, setPresentStage] = useState([
    ...programData.program.stages,
  ]);
  const assignedStages = [].concat(programData.program.stages, []);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editIndex, setIsedit] = useState(null);
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

  const initialValues = {
    stages: [
      {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        key:''
      },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch(setPresentStage(val.stages));
      moveToTab(3);
    },
  });
  const addStage = () => {
    const current = [...formik.values.stages];
    current.push({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    formik.setValues({ stages: current });
  };

  const removeStage = (index) => {
    const current = [...formik.values.stages];
    const filtered = current.filter((cur, ind) => ind !== index);

    formik.setValues({ stages: filtered });
  };
  return (
    <div className="stages_container">
      <Alert text={alertText} />
      <RegularText
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase",
          marginTop: 20,
        }}
        text="STAGES"
      />
      <Button
        onClick={() => setIsOpen(true)}
        style={{
          marginLeft: "auto",
          width: 200,
          marginTop: 20,
        }}
        label="Add Stage"
      />
      <table className="home_table">
        {presentStage.length > 0 && (
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Sart Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presentStage.map((prs, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{prs.name}</td>
                  <td>{prs.startDate}</td>
                  <td>{prs.endDate}</td>
                  <td>{prs.description}</td>
                  <td>
                    <div className="table_actions">
                      <FaEdit
                        onClick={() => {
                          formik.setValues({ stages: [prs] });
                          setIsedit(ind);
                          setIsOpen(true);
                        }}
                      />
                      <FaTrash
                        onClick={() => {
                          const filtered = presentStage.filter(
                            (prs, filInd) => filInd !== ind
                          );
                          setPresentStage(filtered);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      {presentStage.length == 0 && (
        <>
          <img id="empty" src="38.png" />
          <span id="empty">No added stages yet</span>
        </>
      )}

      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramStages(presentStage));
            setAlert("Data Saved");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />
        <Button
          onClick={() => {
            if (presentStage.length == 0) {
              setAlert("At least one Stage is required");
              setTimeout(() => {
                setAlert("");
              }, 2000);
              return;
            }
            dispatch(setProgramStages(presentStage));
            moveToTab(3);
          }}
          style={{
            width: 200,
          }}
          label="Next"
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
              setIsedit(null);
              formik.setValues({stages:initialValues.stages})
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Stage"
          />
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
                              options={['Expression of interest','Request of proposal']}
                                {...formik.getFieldProps(
                                  `stages.${index}.name`
                                )}
                                onChange={formik.handleChange}
                                label="Name"
                                outlined
                                value={formik.values.stages[index].name}
                              />
                              <Input
                                type="date"
                                {...formik.getFieldProps(
                                  `stages.${index}.startDate`
                                )}
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
                                onChange={formik.handleChange}
                                label="End Date"
                                outlined
                                placeholder="Stage Name"
                              />
                              <textarea
                                style={{ width: "90%", marginTop: 10 }}
                                {...formik.getFieldProps(
                                  `stages.${index}.description`
                                )}
                                onChange={formik.handleChange}
                                rows={3}
                                placeholder="Description"
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
                  if (editIndex!==null) {
                    const newData=[...presentStage]
                    newData[editIndex]= formik.values.stages[0]
                  
                    setPresentStage(newData);
                   setIsedit(null)
                   setIsOpen(false)
                  formik.setValues({ stages: initialValues.stages });
                    return

                  }
                  const currentStage = [...presentStage];
                  formik.values.stages[0].key=`${Math.floor(Math.random()*10)}`
                  console.log(formik.values)
                  currentStage.push(formik.values.stages[0]);
                  setPresentStage(currentStage);

                  formik.setValues({ stages: initialValues.stages });
                }}
                style={{ width: 100 }}
                label={editIndex!==null?"Save":"Add"}
              />
            </FormikProvider>
          </div>
        </div>
      </Modal>
    </div>
  );
}
