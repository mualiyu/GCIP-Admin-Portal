import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { Header } from "../../components/Common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import "../styles/styles.css";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import moment from "moment";

import Checkbox from "@mui/material/Checkbox";

function ProgramDetails() {
  const [loading, setLoading] = useState(true);
  const [program, setProgramDetails] = useState(null);
  const { programId } = useParams();
  const navigate = useNavigate();
  const programData = useSelector((state) => state);

  const getData = async () => {
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/info?programId=${programId}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    if (success) {
      setProgramDetails(data.data.program);
    } else {
      setAlert(error);
      setLoading(false);
    }
    setAlert("Oops! Something didn't go quite right there...");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="review-container">
      {loading && <Loading loading={loading} />}
      <section id="divToPrint" style={{ width: "100%" }}>
        {/* <Alert text={alertText} /> */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBotton: 60,
          }}>
          <div>
            <Header
              style={{ color: "var(--primary)", textTransform: "uppercase" }}
              text={program?.programName}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            marginTop: "70px",
            borderBottom: "1px dashed #ccc",
            paddingBottom: 20,
            fontSize: 11,
          }}>
          <div className="lh-2">
            <h2 className="review_title">Business name</h2>
          </div>

          <div className="lh-2">
            <h2 className="review_title">parent company/owner</h2>
            <p>parent Company</p>
          </div>

          <div className="lh-2">
            <h2 className="review_title">Authorized Personnel</h2>
            <p>Ahmed Peter</p>
          </div>
        </div>

        <div className="lh-2">
          <h2 className="review_title">Business Description</h2>
          <p>Business Description</p>
        </div>

        <div className="lh-2">
          <h2 className="review_title">Business Address</h2>
          <p>Address here</p>
        </div>

        <div className="my-60">
          <h2 className="review_title">Program Lots</h2>
          <div
            style={{
              borderBottom: "1px dashed #ccc",
              paddingBottom: 20,
            }}>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <thead>
                <th>S/N</th>
                <th>Lot</th>
              </thead>
              <tbody>
                {program?.lots.map((lot, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{lot.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProgramDetails;
