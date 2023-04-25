import React from "react";
import "../styles/home.css";
import MenuCards from "./components/MenuCards";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark } from "react-icons/fc";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <div className="home_top" style={{width:'90%'}}>
        <img id="bg" src="bg.png" alt="m" />
        <Button
          style={{
            marginLeft: "auto",
            marginTop: 30,
            width:200
          }}
          onClick={() => navigate("/Programme")}
          label="Create Program"
        />
        </div>

        <table className="home_table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Stages</th>
              <th>Total Applicants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WEB DEV</td>
              <td>
                <div className="table_stage">
                  <span>stage1</span>
                  <span>
                    stage2 <FcCheckmark />
                  </span>
                  <span>stage3</span>
                </div>
              </td>
              <td>400</td>
              <td>
                <div className="table_actions">
                  <Button
                    style={{
                      width: 70,
                      backgroundColor: "#1094ff",
                      marginBottom: 10,
                    }}
                    label="View"
                  />
                  <Button style={{ width: 70 }} label="Edit" />
                </div>
              </td>
            </tr>

            <tr>
              <td>IOT</td>
              <td>
                <div className="table_stage">
                  <span>
                    stage1
                    <FcCheckmark />
                  </span>
                  <span>stage2 </span>
                  <span>stage3</span>
                </div>
              </td>
              <td>400</td>
              <td>
                <div className="table_actions">
                  <Button
                    style={{
                      width: 70,
                      backgroundColor: "#1094ff",
                      marginBottom: 10,
                    }}
                    label="View"
                  />
                  <Button style={{ width: 70 }} label="Edit" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fade>
  );
}
