import React from "react";
import "./styles/tab2.css";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import { useState } from "react";
import { DeleteIcon } from "../../../assets/Svg/Index";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProgramLots } from "../../../redux/program/programSlice";
import { useEffect } from "react";
export default function Tab2({moveToTab}) {
  const dispatch=useDispatch()
  const programData=useSelector(state=>state.program)
  const initialValues = {
    lots: programData.program.lots
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch(setProgramLots(val.lots))
      moveToTab(2)
    },
  });

  const addSubLot = (arrayHelpers, index) => {
    const current = [...formik.values.lots[index].subLots];
    current.push({ name: "", category: "" });
    const newLots = [...formik.values.lots];
    newLots[index].subLots = current;

    formik.setValues({ lots: newLots });
  };

  const removeSubLot = (index, subIndex) => {
    const current = [...formik.values.lots[index].subLots];
    const filtered = current.filter((cur, ind) => ind !== subIndex);
    const newLots = [...formik.values.lots];
    newLots[index].subLots = filtered;
    console.log(filtered);
    formik.setValues({ lots: newLots });
  };
 
  return (
    <div className="lot_container">
      <FormikProvider value={formik}>
        <FieldArray
          name="lots"
          render={(arrayHelpers) => {
            const lots = formik.values.lots;
            return (
              <>
                {lots.length > 0
                  ? formik.values.lots.map((item, index) => (
                      <>
                        <div className="lot_add">
                          <Input
                            {...formik.getFieldProps(`lots.${index}.name`)}
                            onChange={formik.handleChange}
                            outlined
                            label="Lot Name"
                          />
                          <Select
                            {...formik.getFieldProps(`lots.${index}.region`)}
                            onChange={formik.handleChange}
                            options={[]}
                            label="Lots Region"
                          />
                          <div className="delete-lot">
                            {index !== 0 && (
                              <DeleteIcon
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            )}
                          </div>

                          <div className="lot-buttons">
                            <Button
                              onClick={() => {
                                addSubLot(arrayHelpers, index);
                              }}
                              style={{ marginTop: 10, width: 100 }}
                              label="Add Sublot"
                            />
                            {index == lots.length - 1 && (
                              <Button
                                onClick={() => {
                                  arrayHelpers.push({
                                    name: "",
                                    region: "",
                                    subLots: [],
                                  });
                                }}
                                style={{
                                  width: 100,
                                  marginLeft: "auto",
                                  marginTop: 20,
                                  marginBottom: 40,
                                }}
                                label="Add Lot"
                              />
                            )}
                            <div></div>
                          </div>
                        </div>

                        {lots[index].subLots.map((subLot, subIndex) => (
                          <div className="lot_add sub" key={subIndex}>
                            <Input
                              {...formik.getFieldProps(
                                `lots.${index}.subLots${subIndex}.name`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Sub-lot Name"
                              name={`lots.${index}.subLots.${subIndex}.name`}
                            />
                            <Input
                              {...formik.getFieldProps(
                                `lots.${index}.subLots${subIndex}.category`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Category"
                              name={`lots.${index}.subLots.${subIndex}.category`}
                            />
                            <div className="lot_icon">
                              <DeleteIcon
                                onClick={() => removeSubLot(index, subIndex)}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    ))
                  : null}
              </>
            );
          }}
        />
      </FormikProvider>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        style={{
          width: 200,
          marginTop: 50,
          marginBottom: 20,
          marginLeft: "auto",
        }}
        label="Next"
      />
    </div>
  );
}
