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
  const [alertText, setAlert] = useState("");
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

  const getDocumentName = (tit) => {
    return tit?.substring(tit?.lastIndexOf("/") + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="" style={{ padding: "20px 50px" }}>
      {loading && <Loading loading={loading} />}
      <section style={{ width: "100%" }}>
        {/* <Alert text={alertText} /> */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBotton: 60,
            borderBottom: "1px dashed #ccc",
          }}>
          <div>
            <Header
              style={{ color: "var(--primary)", textTransform: "uppercase" }}
              text={program?.programName}
            />
          </div>
        </div>

        <div className="lh-2">
          <p>{program?.programDescription}</p>
        </div>

        <div className="my-60">
          <h4 className="">Program Lots</h4>
          <div
            style={{
              paddingBottom: 20,
            }}>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <tr>
                <th style={{ width: 50 }}>S/N</th>
                <th>Lot</th>
              </tr>
              <tbody>
                {program?.lots.map((lot, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{lot.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-60">
          <h4
            className=""
            style={{ borderBottom: "1px dashed #ccc", paddingBottom: 5 }}>
            Program Stages
          </h4>
          <div
            style={{
              paddingBottom: 20,
            }}>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <tr>
                <th style={{ width: 50 }}>S/N</th>
                <th>Stage</th>
                <th style={{ width: 600 }}>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th style={{ width: 100 }}>Document</th>
              </tr>
              <tbody>
                {program?.stages.map((stage, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{stage.name}</td>
                    <td>{stage.description}</td>
                    <td>{moment(stage.startDate).format("ll")} </td>
                    <td>{moment(stage.endDate).format("ll")} </td>
                    <td>{getDocumentName(stage?.document)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-60">
          <h4
            className=""
            style={{ borderBottom: "1px dashed #ccc", paddingBottom: 5 }}>
            Program Documents
          </h4>
          <div
            style={{
              //   borderBottom: "1px dashed #ccc",
              paddingBottom: 20,
            }}>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <tr>
                <th style={{ width: 50 }}>S/N</th>
                <th style={{ width: 300 }}>Title of Document</th>
                <th>File</th>
              </tr>
              <tbody>
                {program?.uploads.map((document, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{document.name}</td>
                    <td>{getDocumentName(document?.file)}</td>
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
