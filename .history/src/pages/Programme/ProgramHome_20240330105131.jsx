import React, { useRef } from "react";
import "../styles/program.css";
import MenuCards from "./components/MenuCards";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { Editor } from "@tinymce/tinymce-react";
import { RegularText } from "../../components/Common";
import { useState } from "react";

import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import Tab5 from "./components/Tab5/Tab5";
import Tab3 from "./components/Tab3";
import Tab4 from "./components/Tab4";
import Overview from "./components/Overview";
import { Fade } from "react-awesome-reveal";
// import Tab6 from "./components/Tab6";
import Application from "./Application";
import { useEffect } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setProgram } from "../../redux/program/programSlice";

const tabFields = [
  "General",
  "Lots",
  "Stages",
  // "Requirements",
  "Documents",
  // "Status",
  // "Milestone & Claims",
  // "Overview",
];
export default function ProgramHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const programData = useSelector((state) => state);
  const [program, setProgramm] = useState(null);
  const dispatch = useDispatch();
  const { active } = useParams();
  const [isComplete, setIsComplete] = useState(
    Number(programData.program.id) > 0 ? 7 : 0
  );

  const moveToTab = (number) => {
    setActiveTab(number);
    setIsComplete(number);
  };
  const getProgram = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/info/v2?programId=${programData.program.id}`,
      token: programData.user.user.token,
    });
    console.log(data);
    if (success) {
      console.log(data.data.program, "llll");
      dispatch(setProgram({ program: data.data.program }));
    }
  };
  useEffect(() => {
    if (programData.program.id) {
      getProgram();
    } else {
      console.log(programData.program, "ppee");
    }

    // getProgram()
  }, []);

  return (
    <div className="program_home_container">
      <div className="program-head">
        <h3 style={{ fontWeight: "bold", fontSize: 20, margin: "25px" }}>
          Create New Program
        </h3>
      </div>
      {/* <div className="mt-xl">
        <h3>Create New Program</h3>
      </div> */}

      <div className="tab-container">
        {tabFields.map((tab, index) => (
          <span
            style={{ opacity: index > isComplete ? 0.5 : 1 }}
            onClick={() => {
              // if (index > isComplete) {
              //   return;
              // }
              setActiveTab(index);
            }}
            key={tab}
            className={`${index == activeTab ? "active" : null}`}>
            {tab}
          </span>
        ))}
      </div>
      {activeTab == 0 && (
        <Fade>
          <Tab1 moveToTab={moveToTab} />
        </Fade>
      )}
      {activeTab == 1 && (
        <Fade>
          <Tab2 moveToTab={moveToTab} />
        </Fade>
      )}
      {/* {activeTab == 3 && (
        <Fade>
          <Tab6 moveToTab={moveToTab} />
        </Fade>
      )} */}
      {activeTab == 2 && (
        <Fade>
          <Tab3 moveToTab={moveToTab} />
        </Fade>
      )}
      {activeTab == 3 && (
        <Fade>
          <Tab4 moveToTab={moveToTab} />
        </Fade>
      )}
      {/* {activeTab == 5 && (
        <Fade>
          <Tab5 moveToTab={moveToTab} />
        </Fade>
      )}
      {activeTab == 6 && (
        <Fade>
          <Application />
        </Fade>
      )}
      {activeTab == 7 && (
        <Fade>
          <Overview moveToTab={moveToTab} />
        </Fade>
      )} */}
    </div>
  );
}
