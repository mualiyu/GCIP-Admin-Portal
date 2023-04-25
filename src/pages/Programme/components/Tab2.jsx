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
import Alert from "../../../components/Alert";
import query from "../../../helpers/query";
export default function Tab2({ moveToTab }) {
  const dispatch = useDispatch();
  const [alertText,setAlert]=useState('')
  const programData = useSelector((state) => state);
  const [regions,setRegions]=useState([])
  const [categories,setCategories]=useState([])
  const [assignedLots,setAssigned]=useState([])
  const initialValues = {
    lots:assignedLots,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(val)
      dispatch(setProgramLots(val.lots));
      moveToTab(2);
    },
  });


  const addSubLot = (arrayHelpers, index) => {
    const current = [...formik.values.lots[index].subLots];
   
    current.push({ name: "", category: "" });
    
    const newLots = [...formik.values.lots];
    
    newLots[index].subLots.push(current) 
    console.log(newLots)

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
  const getRegions=async ()=>{
   const {success,data,error} = await query({
    method:'GET',
    url:'/api/admin/regions',
    token:programData.user.user.token
  })
  if (success) {
    const regionsArray=[]
    data.data.regions.map(reg=>regionsArray.push({name:reg.name,value:reg.id}))
    setRegions(regionsArray)
    
  }
  }
  const getCategories=async ()=>{
    const {success,data,error} = await query({
     method:'GET',
     url:'/api/admin/category/list',
     token:programData.user.user.token
   })
   
   if (success) {
    const catsArray=[]
    data.data.categories.map(cat=>catsArray.push({name:cat.name,value:cat.id}))
    setCategories(catsArray)
   }
   }
  useEffect(()=>{
  getRegions()
  getCategories()
  const newData=[]
  programData.program.program.lots.map(lts=>newData.push(lts))
  formik.setValues({lots:newData})
  setAssigned(newData)
  },[])

  return (
    <div className="lot_container">
      <Alert text={alertText}/>
      <Button
        style={{
          marginTop: 10,
          width: 100,
          marginLeft: "auto",
          marginBottom: 50,
        }}
        label="Add Category"
      />
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
                            options={regions}
                            label="Region"
                            placeholder={formik.values.lots[index].region}
                          />
                          <Select
                            {...formik.getFieldProps(`lots.${index}.category`)}
                            onChange={formik.handleChange}
                            options={categories}
                            label="Category"
                            placeholder={formik.values.lots[index].category}
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
                                    category: "",
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
                              // value={lots[index].subLots[subIndex].name}
                            />
                            <Select
                            options={categories}
                              {...formik.getFieldProps(
                                `lots.${index}.subLots${subIndex}.category`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Category"
                              placeholder={lots[index].subLots[subIndex].category}
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
      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramLots(formik.values.lots));
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
