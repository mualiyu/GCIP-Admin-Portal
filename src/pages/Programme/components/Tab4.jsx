import React, { useState } from "react";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import "./styles/tab3.css";
import Input from "../../../components/Input";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import { useDispatch, useSelector } from "react-redux";
import { setProgramUploads } from "../../../redux/program/programSlice";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";
export default function Tab4({ moveToTab }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const initialValues = {
    uploads: programData.program.program.uploads,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch(setProgramUploads(val.uploads));
      moveToTab(5);
    },
  });
  const addStage = () => {
    const current = [...formik.values.uploads];
    current.push({
      name: "",
      file: "",
    });

    formik.setValues({ uploads: current });
  };

  const removeStage = (index) => {
    const current = [...formik.values.uploads];
    const filtered = current.filter((cur, ind) => ind !== index);

    formik.setValues({ uploads: filtered });
  };
  return (
    <div className="stages_container">
      <Loading loading={loading} />
      <Alert text={alertText} />
      <RegularText text="Upload Documents" />
      <Button
        onClick={() => addStage()}
        style={{
          marginLeft: "auto",
          width: 200,
          marginTop: 20,
        }}
        label="Add File"
      />
      <div className="stage_list">
        <FormikProvider value={formik}>
          <FieldArray
            name="uploads"
            render={(arrayHelpers) => {
              const uploads = formik.values.uploads;
              return (
                <>
                  {uploads.length > 0
                    ? formik.values.uploads.map((item, index) => (
                        <div className="uploads">
                          <Input
                            label="Name"
                            {...formik.getFieldProps(`uploads.${index}.name`)}
                            onChange={formik.handleChange}
                            outlined
                            placeholder="File Name"
                          />
                          <Input
                            onChange={(e) => {
                              // formik.values.uploads[index].file = "myUrlll";
                              const formData = new FormData();
                              const files = e.target.files;
                              files?.length &&
                                formData.append("file", files[0]);
                              console.log(files[0]);
                              setLoading(true);
                              // const response= await query({url:'/file',method:'POST',bodyData:formData})
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
                                    formik.values.uploads[index].file =
                                      data.data.url;
                                    setAlert("Uplaoded Succefully");
                                  } else {
                                    setAlert("Something went wrong");
                                  }
                                  setTimeout(() => {
                                    setAlert("");
                                  }, 2000);
                                });
                            }}
                            label="Upload"
                            outlined
                            type="file"
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
            dispatch(setProgramUploads(formik.values.uploads));
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
