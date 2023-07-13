import React from "react";
import "./styles/categorysettings.css";
import { useState } from "react";
import { FaTrash, FaWindowClose } from "react-icons/fa";
import Button from "../../../components/Button";
import query from "../../../helpers/query";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "react-modal";
import { RegularText } from "../../../components/Common";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowX: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function CategorySettings() {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const app_data = useSelector((state) => state);
  const [name, setName] = useState("");
  const [alertText, setAlert] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/admin/category/list",
      token: app_data.user.user.token,
    });
    setLoading(false);
    console.log(data);
    if (success) {
      const catsArray = [];
      data.data.categories.map((cat) =>
        catsArray.push({ name: cat.name, value: cat.id })
      );
      setAllCategories(catsArray);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="category-settings">
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        style={{
          // width: 200,
          marginLeft: "auto",
          marginBottom: 20,
          marginTop: 20,
          textTransform: "uppercase",
          width:'10%'
        }}
        label="Add Category"
      />
      <table className="home_table">
        {allCategories.length > 0 && (
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((pres, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{pres.name}</td>

                  <td>
                    <div className="table_actions">
                      <FaTrash
                        onClick={() => {
                          const filtered = allCategories.filter(
                            (prs, filInd) => filInd !== ind
                          );
                          setAllCategories(filtered);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      {!loading && allCategories.length == 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No added Categories Yet</span>
        </div>
      )}
      {loading && <img src="/loading.gif" id="loader" />}

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <Loading loading={loading2} />
        <Alert text={alertText} />
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New Category"
          />
          <div className="divider" />
          <Input
            label="Category Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            outlined
          />
          <Button
            onClick={async () => {
              if (name == "") {
                setAlert("Name is required");
                setTimeout(() => {
                  setAlert("");
                }, 2000);
                return;
              }
              setLoading2(true)
              const bodyData = { name };
              const response = await query({
                method: "POST",
                url: "/api/admin/category/create",
                token: app_data.user.user.token,
                bodyData,
              });
              setLoading2(false)
              if (response.success) {
                  setAllCategories(response.data.data.categories)
                  setAlert('Categry Added')
                  setIsOpen(false)
              }else{
                setAlert('Error adding category')  
              }

              setTimeout(() => {
                setAlert("");
              }, 2000);
              
            }}
            label="Add"
            style={{ marginTop: 20, width: "50%" }}
          />
        </div>
      </Modal>
    </div>
  );
}
