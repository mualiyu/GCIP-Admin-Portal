import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LayOut from "./pages/Dashboard/LayOut";
import Home from "./pages/Dashboard/Home";
import Applicants from "./pages/Dashboard/Applicants";
import Submissions  from "./pages/Dashboard/Submissions";
import ApplicantDetails  from "./pages/Dashboard/ApplicantDetails";
import "./App.css";
import Verify from "./pages/Verify";
import ProgramHome from "./pages/Programme/ProgramHome";
import ProgramLayOut from "./pages/Programme/ProgramLayOut";
import Application from "./pages/Programme/Application";
import ProgramPage from "./pages/Dashboard/ProgramPage";
import Settings from "./pages/Dashboard/Settings";
import Messages from "./pages/Programme/Messages";

import "nprogress/nprogress.css";
export default function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<Verify />} path="/verify/:token" />
      <Route path="Home" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="Applicants" element={<Applicants />} />
        <Route path="submissions/:programId" element={<Submissions />} />
        <Route path="submissions/:programId/applicant/:applicant_id" element={<ApplicantDetails />} />
        <Route path="Program/:id" element={<ProgramPage/>}/>
        <Route path="Settings" element={<Settings />} />
      </Route>
      <Route path="Programme" element={<ProgramLayOut />}>
        <Route index element={<ProgramHome />} />
        <Route path="Application" element={<Application />} />
        <Route path="Application/Submissions/:programId" element={<Submissions />} />
        <Route path="Application/Submissions/:programId/Applicant/:applicant_id" element={<ApplicantDetails />} />
        <Route path="Message" element={<Messages />} />
        <Route path="Document" element={<Application />} />
      </Route>
    </Routes>
  );
}



