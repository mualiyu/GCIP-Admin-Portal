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
  const [savedLotInfo, setSavedLotInfo] = useState([]);
  const [lotData, setLotData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];
    savedData.push(formData);
    localStorage.setItem("formData", JSON.stringify(savedData));
    setFormData({
      name: "",
    });
    console.log(savedData);
  };

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("formData"));
    console.log(records);
    if (records) {
      console.log(records);
      setLotData(records);
    }
  }, [formData]);

  return (
    <section style={{ width: "85%", margin: "0 auto" }}>
      <div className="flex ertynmsba">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          outlined
          style={{ width: "70%" }}
          label="Lot Title"
          placeholder="e.g. Lot 103 : Title of Lot"
        />
        <Button
          disabled={!formData.name}
          style={{
            marginRight: 20,
            marginTop: 15,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438",
          }}
          onClick={handleSubmit}
          label="Save Record"
        />
      </div>

      <section>
        {lotData.length > 0 && (
          <table style={{ width: "100%" }}>
            <thead>
              <th style={{ width: 20 }}>S/N</th>
              <th>Lot</th>
            </thead>
            <tbody>
              {lotData?.map((lot, ind) => (
                <>
                  <tr key={ind + 1}>
                    <td>{ind + 1}</td>
                    <td>{lot.name}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}
