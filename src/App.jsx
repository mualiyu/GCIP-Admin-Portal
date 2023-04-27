import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LayOut from "./pages/Dashboard/LayOut";
import Home from "./pages/Dashboard/Home";
import "./App.css";
import Verify from "./pages/Verify";
import ProgramHome from "./pages/Programme/ProgramHome";
import ProgramLayOut from "./pages/Programme/ProgramLayOut";
import Application from "./pages/Programme/Application";
import ProgramPage from "./pages/Dashboard/ProgramPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<Verify />} path="/verify/:token" />
      <Route path="Home" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="Program/:id" element={<ProgramPage/>}/>
      </Route>
      <Route path="Programme" element={<ProgramLayOut />}>
        <Route index element={<ProgramHome />} />
        <Route path="Application" element={<Application />} />
        <Route path="Message" element={<Application />} />
        <Route path="Document" element={<Application />} />
      </Route>
    </Routes>
  );
}
