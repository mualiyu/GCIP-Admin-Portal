import React from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{ width: "90%" }}>
          <img id="bg" src="bg.png" alt="m" />
          <div className="home_user">
            <FaUser />
            <span>Admin</span>
          </div>
        </div>
        <div style={{ width: "90%" }}>
          <Button
            style={{
              marginLeft: "auto",
              marginTop: 30,
              width: 200,
            }}
            onClick={() => navigate("/Programme")}
            label="Create Program"
          />
        </div>
        <table className="home_table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Active Stage</th>
              <th>Total Applicants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WEB DEV</td>
              <td>
                <span>
                  stage2 <FcCheckmark />
                </span>
              </td>
              <td>400</td>
              <td>
                <div className="table_actions">
                  <FaEdit />
                  <FaTrash />
                </div>
              </td>
            </tr>
            <tr>
              <td>WEB DEV</td>
              <td>
                <span>
                  stage2 <FcCheckmark />
                </span>
              </td>
              <td>400</td>
              <td>
                <div className="table_actions">
                  <FaEdit />
                  <FaTrash />
                </div>
              </td>
            </tr>

            
          </tbody>
        </table>
      </div>
    </Fade>
  );
}
