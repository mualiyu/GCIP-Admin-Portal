import React from "react";
import "./styles/tab2.css";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import { useState } from "react";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "react-modal";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProgramLots } from "../../../redux/program/programSlice";
import { useEffect } from "react";
import nProgress from "nprogress";
import Alert from "../../../components/Alert";
import query from "../../../helpers/query";
import { RegularText } from "../../../components/Common";
import { FcCheckmark } from "react-icons/fc";
import Loading from "../../../components/Loading";
import { FaEdit, FaTrash, FaTimesCircle, FaFolderOpen } from "react-icons/fa";
import * as Yup from "yup";
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

export default function Tab2({ moveToTab }) {
  const dispatch = useDispatch();
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [presentLots, setPresentLots] = useState([
    ...programData?.program.program.lots,
  ]);

  const initialValues = {
    lots: [
      {
        name: "",
      },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(val);
      dispatch(setProgramLots(val.lots));
      moveToTab(2);
    },
  });

  useEffect(() => {
    console.log(programData.program.program, "pppo");
  }, []);

  return (
    <section style={{ width: "85%", margin: "0 auto" }}>
      <div className="flex ertynmsba">
        <Input
          id="lotTitle"
          required
          outlined
          style={{ width: "70%" }}
          label="Lot Title"
          {...formik.getFieldProps(`lots.${index}.name`)}
          onChange={formik.handleChange}
        />
        <Button
          style={{
            marginRight: 20,
            marginTop: 15,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438",
          }}
          onClick={() => {
            if (isEdit !== null) {
              const newData = [...presentLots];
              newData[isEdit] = formik.values.lots[0];
              setPresentLots(newData);
              formik.setValues({ lots: initialValues.lots });
              setIsOpen(false);
              setIsedit(null);
              return;
            }

            const newData = [...presentLots];
            newData.push(formik.values.lots[0]);
            setIsedit(null);
            setPresentLots(newData);
            formik.setValues({ lots: initialValues.lots });
            setIsOpen(false);
          }}
          label="Save Record"
        />
      </div>

      <section>
        <table style={{ width: "100%" }}>
          <thead>
            <th style={{ width: 20 }}>S/N</th>
            <th>Lot</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lot 2: Nam of New Lot</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Lot 2: Nam of New Lot</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Lot 2: Nam of New Lot</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Lot 2: Nam of New Lot</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
}
