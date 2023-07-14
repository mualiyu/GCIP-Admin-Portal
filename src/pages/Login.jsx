import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/or_logo.png";
import { Header, RegularText } from "../components/Common";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import * as Yup from "yup";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import Loading from "../components/Loading";
import query from "../helpers/query";
import Alert from "../components/Alert";
import {
  setEducatioanlQualification,
  setMembership,
  setPersonalDetails,
  setSupportingDocs,
} from "../redux/user/userDetailSlice";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be more than six characters")
      .required(),
    username: Yup.string().min(5,"Must have at least 5 chars").required(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      values.device_name=123
        setLoading(true);
        const response = await query({
          method: "POST",
          url: "/api/admin/login",
          bodyData: values,
        });
        setLoading(false);
       
        if (response.success) {
          setAlert(response.data.message);
          dispatch(setUser({
            user:{
              email:response.data.data.user.email,
              firstName:response.data.data.user.name,
              isLoggedIn:true,
              token:response.data.data.token
            }
          }))
          navigate("/Home");
        }else{
          setAlert('Something went wrong with your login')
          
        }
       
        
        setTimeout(() => {
          setAlert("");
        }, 3000);
        
    
    },
    validationSchema
  });
  return (

    <Fade>
      <div className="auth_container">
        <Loading loading={loading} />
        <Alert text={alertText} />

        <div className="auth_display">
          <div className="display_message">
            <h2>Africa Minigrids Program (AMP) 
Grant Management Platform</h2>
<p>Pilot Minigrids in Rural Communities </p>
          </div>
        </div>


        <div className="auth_inner_container">
          <div className="auth_logos">
          <img src="log.png" alt="logo" />
          <img src="svg.svg" alt="logo" />
          </div>
          <Header text="Sign in to AFM-ADMIN" />
          {/* <RegularText text="Welcome back!"/> */}
          
          <div className="inputs_container">
            
          <Input
              outlined
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              id="username"
              onChange={formik.handleChange}
              placeholder="username here"
              label="User Name"
            />
            <Input
              outlined
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              id="password"
              onChange={formik.handleChange}
              type="password"
              label="Password"
              placeholder="type Password here..."
            />
            <div className="forgot_password">
              <RegularText style={{marginLeft:'auto',cursor:'pointer'}} onClick={() => {
                  navigate("forgot")
                }} text="Forgotten ?" />
            
            </div>

            <div className="auth_bottom">
            <Button
              onClick={formik.handleSubmit}
              
              label="Login"
            />

          
         
            </div>
            
          </div>
        </div>
      </div>
     
    </Fade>
  );
}

export default Login;
