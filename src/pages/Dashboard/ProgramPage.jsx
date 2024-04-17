import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../components/Button";
import query from "../../helpers/query";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/mainProgram.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  FaArrowLeft,
  FaHandHolding,
  FaHome,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import Input from "../../components/Input";

function ProgramPage() {
  const programData = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentProgram, setCurrent] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const convertCategory = (id) => {
    if (categories.length == 0 || id == "") {
      return;
    }
    const filtered = categories.filter((cat) => cat.value == id);
    const name = filtered[0].name;
    return name;
  };
  const convertRegion = (id) => {
    if (regions.length == 0 || id == "") {
      return;
    }
    const name = regions[Number(id)].name;
    return name;
  };
  const getProgram = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/admin/program/info?programId=${id}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    if (success) {
      setCurrent(data.data.programs);
    }
  };
  const getRegions = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/regions",
      token: programData.user.user.token,
    });
    if (success) {
      const regionsArray = [];
      data.data.regions.map((reg) =>
        regionsArray.push({ name: reg.name, value: reg.id })
      );
      setRegions(regionsArray);
    }
  };
  const getCategories = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/category/list",
      token: programData.user.user.token,
    });

    if (success) {
      const catsArray = [];
      data.data.categories.map((cat) =>
        catsArray.push({ name: cat.name, value: cat.id })
      );
      setCategories(catsArray);
    }
  };
  useEffect(() => {
    getProgram();
    getCategories();
    getRegions();
  }, []);
  return (
    <div className="main_program_container">
      {loading && <img src="/loading.gif" id="loader" />}

      {!loading && (
        <div className="main_program_holder">
          <div className="home_top">
            <div style={{ marginBottom: 30 }} className="home_user">
              <FaUser />
              <span>Admin</span>
            </div>
          </div>
          <div className="main_program_head">
            <FaArrowLeft
              onClick={() => navigate("/Home")}
              style={{
                backgroundColor: "#9b9b9b16",
                height: 25,
                width: 25,
                borderRadius: 20,
                padding: 10,
                cursor: "pointer",
              }}
            />
            <Button onClick={() => console.log(currentProgram)} label="Edit" />
          </div>

          <div className="program_content">
            {currentProgram !== null && (
              <>
                <h2>{currentProgram.name}</h2>
                <Editor
                  apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
                  disabled
                  initialValue={currentProgram.description}
                  init={{
                    height: 400,
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

                <table
                  className="home_table"
                  style={{ backgroundColor: "white", width: "100%" }}>
                  {currentProgram.lots.length > 0 && (
                    <>
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Lots</th>
                          <th>Sub Lots</th>
                          <th>Region</th>
                          <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProgram.lots.map((lots, ind) => {
                          const subLots = currentProgram.lots.filter(
                            (sub) => sub.program_id == lots.program_id
                          );
                          return (
                            <>
                              <tr>
                                <td>{ind + 1}</td>
                                <td>{lots.name}</td>
                                <td></td>
                                <td>{convertRegion(lots.region_id)}</td>
                                <td>{convertCategory(lots.category_id)}</td>
                              </tr>
                              <>
                                {subLots.length > 0 &&
                                  subLots.map((subl, index) => (
                                    <tr key={index}>
                                      <td></td>
                                      <td></td>
                                      <td>{subl.name}</td>
                                      <td></td>
                                      <td>
                                        {convertCategory(subl.category_id)}
                                      </td>
                                      <td></td>
                                    </tr>
                                  ))}
                              </>
                            </>
                          );
                        })}
                      </tbody>
                    </>
                  )}
                </table>

                <div className="divider" />
                <h4>STAGES</h4>

                <div className="program_stages">
                  {currentProgram.stages.map((stage, ind) => (
                    <div key={ind} className="stage_det">
                      <div className="stage_det_row">
                        <span>Name:</span>
                        <span>{stage.name}</span>
                      </div>
                      <div className="stage_det_row">
                        <span>Start Date:</span>
                        <span>{stage.start}</span>
                      </div>
                      <div className="stage_det_row">
                        <span>End Date:</span>
                        <span>{stage.end}</span>
                      </div>
                      <div className="stage_det_row">
                        <span>Status</span>
                        <span
                          style={{
                            backgroundColor:
                              stage.isActive == "1" ? "lightgreen" : "orange",
                            height: 20,
                            width: 100,
                            borderRadius: 10,
                            textAlign: "center",
                            color: "white",
                          }}>
                          {stage.isActive == "1" ? "Active" : "Not Active"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider" />
                <h4>REQUIREMENTS</h4>
                <div className="prog_app_req">
                  <ul>
                    {currentProgram.requirements.map((req, ind) => (
                      <Input
                        key={ind}
                        style={{ marginBottom: 10 }}
                        outlined
                        disabled
                        label={req.name}
                        placeholder={req.type}
                      />
                    ))}
                  </ul>
                </div>

                <div className="divider" />
                <h4>DOCUMENTS</h4>
                <div className="prg_file">
                  <ul>
                    {currentProgram.documents.map((req, ind) => (
                      <li key={ind}>
                        <h3>{req.name}</h3>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgramPage;
