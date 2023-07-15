import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import { MoonLoader } from "react-spinners";

export default function Applicants() {
  const [loading, setLoading] = useState(true);
  const [allApplicants, setAllApplicants] = useState([]);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const getAllApplicants = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/applicants/list",
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
    // if (success) {
    //   setAllApplicants(data.data.programs);
    // }
  };
  useEffect(() => {
    getAllApplicants();
  }, []);
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          <img id="bg" src="bg.png" alt="m" />
          <div className="home_user">
            <span>A</span>
          </div>
        </div>
        <table className="home_table_main">
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>RC Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>1</td>
                    <td>Hooli Group of Companies <br/>
                      <span>Ahmed Peter</span>
                    </td>
                    <td>08065475245 <br/>
                      <span>talk2ahmedpeter@gmail.com</span> </td>
                      <td>1700056 </td>
                    <td>Pending Review </td>

                    <td>Pending Review </td>
                  </tr>
              </tbody>
            </>
        </table>
        {loading && <MoonLoader id="loader" />}
      </div>
    </Fade>
  );
}
