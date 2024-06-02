import React from "react";
import "./styles/overview.css";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RegularText } from "../../../components/Common";
import Input from "../../../components/Input";
import { Editor } from "@tinymce/tinymce-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import query from "../../../helpers/query";
import Loading from "../../../components/Loading";
import { useState } from "react";
import Alert from "../../../components/Alert";
import { resetProgram } from "../../../redux/program/programSlice";
import { useNavigate } from "react-router-dom";

export default function Overview({moveToTab}) {
  const programData = useSelector((state) => state);
  const [loading,setLoading]=useState(false)
  const [alertText,setAlert]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
    console.log(programData);
  }, []);
  return (
    <>
     <Loading loading={loading}/>
     <Alert text={alertText}/>
      <h3>Milestone & Claims</h3>

      <div className="overview_container">
      
        <div className="general_overview">
          <h2>GENERAL</h2>
          <Input
            outlined
            label="Program Name"
            disabled
            value={programData.program.program.programName}
          />
          <RegularText text="Description" />
          <Editor
            disabled
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            initialValue={programData.program.program.programDescription}
            init={{
              height: 200,
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
        </div>

        <div className="lots_overview">
          <h2>LOTS</h2>
          {programData.program.program.lots.map((lot, ind) => (
            <>
              <div key={ind.toString()} className="lot_add">
                <Input disabled value={lot.name} outlined label="Lot Name" />
                <Input disabled value={lot.region} outlined label="Region" />
                <Input
                  disabled
                  value={lot.category}
                  outlined
                  label="Category"
                />

                <div className="delete-lot"></div>
              </div>
              {lot.subLots.map((sublot, subIndex) => (
                <div className="lot_add sub" key={subIndex}>
                  <Input
                    value={sublot.name}
                    disabled
                    outlined
                    label="Sub-lot Name"
                  />
                  <Input
                    value={sublot.category}
                    disabled
                    outlined
                    label="Category"
                  />
                  <div className="lot_icon"></div>
                </div>
              ))}
            </>
          ))}
        </div>

        <div className="general_overview">
          <h2>Stages</h2>
          {programData.program.program.stages.map((stage, ind) => (
            <div className="stages">
              <Input
                disabled
                value={stage.name}
                label="Name"
                outlined
                placeholder="Stage Name"
              />
              <Input
                disabled
                value={stage.startDate}
                label="Start Date"
                outlined
                placeholder="Stage Name"
              />
              <Input
                disabled
                value={stage.endDate}
                type="date"
                label="End Date"
                outlined
                placeholder="Stage Name"
              />
              <textarea
                disabled
                value={stage.description}
                rows={3}
                placeholder="Description"
              />
            </div>
          ))}
        </div>

        <div className="general_overview">
          <h2>Requirements</h2>
          {programData.program.program.requirements.map((req, ind) => (
            <Input
              outlined
              key={ind}
              disabled
              label={req.type}
              value={req.name}
            />
          ))}
        </div>

        <div className="general_overview">
        <h2>UPLOADS</h2>
          {programData.program.program.uploads.map((upl, ind) => (
            <Input
              type="file"
              outlined
              key={ind}
              disabled
              label={upl.name}
              
            />
          ))}
        </div>


        <div className="general_overview">
          <h2>STATUS</h2>
          {
            programData.program.program.status.map((sta,ind)=>(
              <div key={ind} className="status_overview">
              <span>{sta.name}</span>
              <span>Is Editable{sta.isEditable=='1'?<FaCheck/>:<FaTimes color="red" />}</span>
              <span>Is Initial{sta.isInitial=='1'?<FaCheck/>:<FaTimes color="red" />}</span>
              <span style={{background:sta.color,color:'white'}}>Color</span>
              </div>
            ))
          }
        </div>
      </div>
      <Button
      onClick={async ()=>{
        setLoading(true)
        const {success,data,error} = await query({
          method:'POST',
          url:'/api/admin/program/create',
          token:programData.user.user.token,
          bodyData:programData.program
        })
      setLoading(false)
      if(success) {
        setAlert('Program Created Successfuly')
        dispatch(resetProgram())
        navigate('/Home')
      }else{
        setAlert('Something went wrong')
      }
      setTimeout(()=>{
      setAlert('')
      },2000)
      }}
       style={{
        width:'50%',
        marginBottom:20,
        marginTop:20
      }} label="Submit"/>
    </>
  );
}
