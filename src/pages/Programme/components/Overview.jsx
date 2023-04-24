import React from "react";
import "./styles/overview.css";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RegularText } from "../../../components/Common";
import Input from "../../../components/Input";
import { Editor } from "@tinymce/tinymce-react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Overview() {
  const programData = useSelector((state) => state.program);
  useEffect(() => {
    console.log(programData);
  }, []);
  return (
    <>
      <h3>Milestone & Claims</h3>

      <div className="overview_container">
        <div className="general_overview">
          <h2>GENERAL</h2>
          <Input
            outlined
            label="Program Name"
            disabled
            value={programData.program.programName}
          />
          <RegularText text="Description" />
          <Editor
            disabled
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            initialValue={programData.program.programDescription}
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
          {programData.program.lots.map((lot, ind) => (
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
          {programData.program.stages.map((stage, ind) => (
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
          {programData.program.requirements.map((req, ind) => (
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
          {programData.program.uploads.map((upl, ind) => (
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
          <h2>STASUS</h2>
          {
            programData.program.status.map((sta,ind)=>(
              <div key={ind} className="status_overview">
              <span>{sta.name}</span>
              <span>Is Editable{sta.isEditable?<FaCheck/>:<FaTimes color="red" />}</span>
              <span style={{background:sta.color,color:'white'}}>Color</span>
              </div>
            ))
          }
        </div>
      </div>
      <Button style={{
        width:'50%',
        marginBottom:20,
        marginTop:20
      }} label="Submit"/>
    </>
  );
}
