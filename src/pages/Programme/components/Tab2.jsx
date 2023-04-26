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
import Alert from "../../../components/Alert";
import query from "../../../helpers/query";
import { RegularText } from "../../../components/Common";
import { FcCheckmark } from "react-icons/fc";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";

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
  const [isEdit, setIsedit] = useState(false);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [presentLots, setPresentLots] = useState([
    ...programData.program.program.lots,
  ]);

  const initialValues = {
    lots: [
      {
        name: "",
        category: "",
        region: "",
        subLots: [],
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

  const addSubLot = (arrayHelpers, index) => {
    const current = [...formik.values.lots[index].subLots];

    current.push({ name: "", category: "" });

    const newLots = [...formik.values.lots];
    current.map((cur) => newLots[index].subLots.push(cur));

    console.log(newLots);

    formik.setValues({ lots: newLots });
  };

  const convertCategory = (id) => {
    if (categories.length == 0 || id == "") {
      return;
    }
    const filtered = categories.filter((cat) => cat.value == id);
    const name = filtered[0].name;
    return name;
  };
  const convertRegion = (id) => {
    if (regions.length == 0 || id == "") {
      return;
    }
    const name = regions[Number(id)].name;
    return name;
  };

  const removeSubLot = (index, subIndex) => {
    const current = [...formik.values.lots[index].subLots];
    const filtered = current.filter((cur, ind) => ind !== subIndex);
    const newLots = [...formik.values.lots];
    newLots[index].subLots = filtered;
    console.log(filtered);
    formik.setValues({ lots: newLots });
  };
  const getRegions = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/regions",
      token: programData.user.user.token,
    });
    if (success) {
      const regionsArray = [];
      data.data.regions.map((reg) =>
        regionsArray.push({ name: reg.name, value: reg.id })
      );
      setRegions(regionsArray);
    }
  };
  const getCategories = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/category/list",
      token: programData.user.user.token,
    });

    if (success) {
      const catsArray = [];
      data.data.categories.map((cat) =>
        catsArray.push({ name: cat.name, value: cat.id })
      );
      setCategories(catsArray);
    }
  };
  useEffect(() => {
    getRegions();
    getCategories();
  }, []);

  return (
    <div className="lot_container">
      <RegularText
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase",
          marginTop: 20,
        }}
        text="LOTS"
      />
      <Alert text={alertText} />
      <Button
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: 10,
          width: 100,
          marginLeft: "auto",
          marginBottom: 50,
        }}
        label="Add"
      />
      <table className="home_table">
        {presentLots.length > 0 && (
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Lots</th>
                <th>Sub Lots</th>
                <th>Region</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presentLots.map((lots, ind) => (
                <>
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{lots.name}</td>
                    <td></td>
                    <td>{convertRegion(lots.region)}</td>
                    <td>{convertCategory(lots.category)}</td>
                    <td>
                      <div className="table_actions">
                        <FaEdit
                          onClick={() => {
                            formik.setValues({ lots: [lots] });
                            setIsedit(true);
                            setIsOpen(true);
                          }}
                        />
                        <FaTrash
                          onClick={() => {
                            const filtered = presentLots.filter(
                              (prs, filInd) => filInd !== ind
                            );
                            setPresentLots(filtered);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <>
                    {lots.subLots.length > 0 &&
                      lots.subLots.map((subl, index) => (
                        <tr key={index}>
                          <td></td>
                          <td></td>
                          <td>{subl.name}</td>
                          <td></td>
                          <td>{convertCategory(subl.category)}</td>
                          <td></td>
                        </tr>
                      ))}
                  </>
                </>
              ))}
            </tbody>
          </>
        )}
      </table>
      {presentLots.length == 0 && (
        <>
          <img id="empty" src="38.png" />
          <span id="empty">No added lots yet</span>
        </>
      )}

      <div className="save_next">
        <Button
          onClick={() => {
            dispatch(setProgramLots(presentLots));
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
            dispatch(setProgramLots(presentLots));
            moveToTab(2);
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
              setIsedit(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Lots"
          />
          <div className="divider" />
          <>
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
                                  {...formik.getFieldProps(
                                    `lots.${index}.name`
                                  )}
                                  onChange={formik.handleChange}
                                  outlined
                                  label="Lot Name"
                                />
                                <Select
                                  {...formik.getFieldProps(
                                    `lots.${index}.region`
                                  )}
                                  onChange={formik.handleChange}
                                  options={regions}
                                  label="Region"
                                  placeholder={convertRegion(
                                    formik.values.lots[index].region
                                  )}
                                />
                                <Select
                                  {...formik.getFieldProps(
                                    `lots.${index}.category`
                                  )}
                                  onChange={formik.handleChange}
                                  options={categories}
                                  label="Category"
                                  placeholder={convertCategory(
                                    formik.values.lots[index].category
                                  )}
                                />
                                <div className="delete-lot">
                                  {index !== 0 && (
                                    <DeleteIcon
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  )}
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
                                    value={
                                      formik.values.lots[index].subLots[
                                        subIndex
                                      ].name
                                    }
                                  />
                                  <Select
                                    options={categories}
                                    {...formik.getFieldProps(
                                      `lots.${index}.subLots${subIndex}.category`
                                    )}
                                    onChange={formik.handleChange}
                                    label="Category"
                                    name={`lots.${index}.subLots.${subIndex}.category`}
                                    placeholder={convertCategory(
                                      formik.values.lots[index].subLots[
                                        subIndex
                                      ].category
                                    )}
                                  />
                                  <div className="lot_icon">
                                    <DeleteIcon
                                      onClick={() =>
                                        removeSubLot(index, subIndex)
                                      }
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
          </>
          <div style={{display:'flex',marginTop:10}}>
            <Button
              onClick={() => {
                const newFormikVals = [...formik.values.lots];
                newFormikVals[0].subLots.push({ name: "", category: "" });
                formik.setValues({ lots: newFormikVals });
              }}
              style={{ marginTop: 10, width: 100,marginRight:10 }}
              label="Add Sublot"
            />
            <Button
              onClick={() => {
                const newData = [...presentLots];
                newData.push(formik.values.lots[0]);
                setIsedit(false);
                setPresentLots(newData);
                formik.setValues({ lots: initialValues.lots });
              }}
              style={{ marginTop: 10, width: 100 }}
              label={isEdit ? "Save" : "Add Lot"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

// <>
// <FormikProvider value={formik}>
//         <FieldArray
//           name="lots"
//           render={(arrayHelpers) => {
//             const lots = formik.values.lots;
//             return (
//               <>
//                 {lots.length > 0
//                   ? formik.values.lots.map((item, index) => (
//                       <>
//                         <div className="lot_add">
//                           <Input
//                             {...formik.getFieldProps(`lots.${index}.name`)}
//                             onChange={formik.handleChange}
//                             outlined
//                             label="Lot Name"
//                           />
//                           <Select
//                             {...formik.getFieldProps(`lots.${index}.region`)}
//                             onChange={formik.handleChange}
//                             options={regions}
//                             label="Region"
//                             placeholder={convertRegion(
//                               formik.values.lots[index].region
//                             )}
//                           />
//                           <Select
//                             {...formik.getFieldProps(`lots.${index}.category`)}
//                             onChange={formik.handleChange}
//                             options={categories}
//                             label="Category"
//                             placeholder={convertCategory(
//                               formik.values.lots[index].category
//                             )}
//                           />
//                           <div className="delete-lot">
//                             {index !== 0 && (
//                               <DeleteIcon
//                                 onClick={() => arrayHelpers.remove(index)}
//                               />
//                             )}
//                           </div>

//                           <div className="lot-buttons">
//                             <Button
//                               onClick={() => {
//                                 addSubLot(arrayHelpers, index);
//                               }}
//                               style={{ marginTop: 10, width: 100 }}
//                               label="Add Sublot"
//                             />
//                             {index == lots.length - 1 && (
//                               <Button
//                                 onClick={() => {
//                                   arrayHelpers.push({
//                                     name: "",
//                                     region: "",
//                                     category: "",
//                                     subLots: [],
//                                   });
//                                 }}
//                                 style={{
//                                   width: 100,
//                                   marginLeft: "auto",
//                                   marginTop: 20,
//                                   marginBottom: 40,
//                                 }}
//                                 label="Add Lot"
//                               />
//                             )}
//                             <div></div>
//                           </div>
//                         </div>

//                         {lots[index].subLots.map((subLot, subIndex) => (
//                           <div className="lot_add sub" key={subIndex}>
//                             <Input
//                               {...formik.getFieldProps(
//                                 `lots.${index}.subLots${subIndex}.name`
//                               )}
//                               onChange={formik.handleChange}
//                               outlined
//                               label="Sub-lot Name"
//                               name={`lots.${index}.subLots.${subIndex}.name`}
//                               value={formik.values.lots[index].subLots[subIndex].name}

//                             />
//                             <Select
//                               options={categories}
//                               {...formik.getFieldProps(
//                                 `lots.${index}.subLots${subIndex}.category`
//                               )}
//                               onChange={formik.handleChange}
//                               label="Category"
//                               name={`lots.${index}.subLots.${subIndex}.category`}
//                               placeholder={convertCategory(formik.values.lots[index].subLots[subIndex].category)}
//                             />
//                             <div className="lot_icon">
//                               <DeleteIcon
//                                 onClick={() => removeSubLot(index, subIndex)}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </>
//                     ))
//                   : null}
//               </>
//             );
//           }}
//         />
//       </FormikProvider>
// </>

{
  /* <thead>
            <tr>
              <th>S/N</th>
              <th>Lots</th>
              <th>Sub Lots</th>
              <th>Region</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Web Dev</td>
              <td></td>
              <td>Region1</td>
              <td>Category1</td>
              <td>
                <div className="table_actions">
                  <FaEdit />
                  <FaTrash />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Sublot1</td>
              <td></td>
              <td>Category1</td>
              <td>
                {/* <div className="table_actions">
                  <FaEdit />
                  <FaTrash />
                </div> */
}
//       </td>
//     </tr>
//     <tr>
//       <td></td>
//       <td></td>
//       <td>Sublot1</td>
//       <td></td>
//       <td>Category1</td>
//       <td>
//         {/* <div className="table_actions">
//           <FaEdit />
//           <FaTrash />
//         </div> */}
//       </td>
//     </tr>

//     <tr>
//       <td>2</td>
//       <td>Web Dev</td>
//       <td></td>
//       <td>Region1</td>
//       <td>Category1</td>
//       <td>
//         <div className="table_actions">
//           <FaEdit />
//           <FaTrash />
//         </div>
//       </td>
//     </tr>

//   </tbody>
// </table> */}
