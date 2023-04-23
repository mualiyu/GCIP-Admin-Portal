import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {setProgramDesc,setProgramName} from '../../../redux/program/programSlice'
import { useEffect } from "react";

export default function Tab1({moveToTab}) {
  const editorRef = useRef(null);
  const dispatch=useDispatch()
  const programData=useSelector(state=>state.program)
  const initialValues = {
    programName: programData.program.programName,
    programDescription:programData.program.programDescription,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
     if (editorRef.current) {
      formik.values.programDescription=editorRef.current.getContent()
     }
     dispatch(setProgramDesc(val.programDescription))
     dispatch(setProgramName(val.programName))
     moveToTab(1)
    },
  });

  return (
    <>
      <span style={{ marginTop: 20 }}>General Program Settings</span>
      <Input
        id="programName"
        onChange={(e) => formik.handleChange(e)}
        required
        outlined
        style={{ width: "90%" }}
        label="Program Name"
      />

      <div className="program_editor">
        <div>
          <RegularText
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 0,
            }}
            text={`Description`}
          />
          <span>*</span>
        </div>
        <Editor
          apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
         <Button onClick={()=>{
           formik.handleSubmit()
         }} style={{
        width:200,
        marginTop:20,
        marginBottom:20,
        marginLeft:'auto'
      }} label="Next"/>
      </div>
     
    </>
  );
}
