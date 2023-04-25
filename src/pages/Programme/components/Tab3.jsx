import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import { useDispatch, useSelector } from "react-redux";
import { setProgramStages } from "../../../redux/program/programSlice";
import Alert from "../../../components/Alert";
export default function Tab3({moveToTab}) {
  const dispatch=useDispatch()
  const programData=useSelector(state=>state.program)
  const [alertText,setAlert]=useState('')
  const assignedStages = [].concat(programData.program.stages,[])
  
  const initialValues = {
    stages:assignedStages
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch(setProgramStages(val.stages))
      moveToTab(4)
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
      <Alert text={alertText}/>
      <RegularText text="Create Stages Of The Program" />
      <Button
        onClick={() => addStage()}
        style={{
          marginLeft: "auto",
          width: 200,
          marginTop: 20,
        }}
        label="Add Stage"
      />
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
                          <Input
                            {...formik.getFieldProps(`stages.${index}.name`)}
                            onChange={formik.handleChange}
                            label="Name"
                            outlined
                            placeholder="Stage Name"
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
                            {...formik.getFieldProps(`stages.${index}.endDate`)}
                            onChange={formik.handleChange}
                            label="End Date"
                            outlined
                            placeholder="Stage Name"
                          />
                          <textarea
                            {...formik.getFieldProps(
                              `stages.${index}.description`
                            )}
                            onChange={formik.handleChange}
                            rows={3}
                            placeholder="Description"
                          />
                          {index !== 0 && (
                            <DeleteIcon onClick={() => removeStage(index)} />
                          )}
                        </div>
                      ))
                    : null}
                </>
              );
            }}
          />
        </FormikProvider>
      </div>

      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramStages(formik.values.stages))
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
          formik.handleSubmit();
        }}
        style={{
          width: 200,
         
        }}
        label="Next"
      />
      </div>
      
    </div>
  );
}
