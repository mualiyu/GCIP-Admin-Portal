import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/or_logo.png";
import { Header, RegularText } from "../components/Common";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import query from "../helpers/query";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { Fade } from "react-awesome-reveal";
function Login() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callTetx, setCallText] = useState("");

  const setAlert = (text: string) => {
    setCallText(text);
    setTimeout(() => {
      setCallText("");
    }, 3000);
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be more than six characters")
      .required(),
    email: Yup.string().email("Invalid email address").required(),
    confirmPassword: Yup.string().min(6, "Password must match").required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        setAlert("Password must match");
        return;
      }
      setLoading(true);
      const newValue = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      };
      const response = await query({
        method: "POST",
        url: "/users",
        bodyData: newValue,
      });
      setLoading(false);
      setAlert(`${response.success?'Kindly Check Your Mail and verify':response.data.message}`);
      formik.resetForm()
    },
    validationSchema,
  });
  return (
    <Fade>
      <section className="authentication-bg pb-0">
        <Loading loading={loading} />
        {/* <Alert text={alertText} /> */}
        <div className="auth-fluid">
          <div className="auth-fluid-form-box">
            <div className="card-body d-flex flex-column h-100 gap-3">
              <div className="auth-brand text-center text-lg-start">
                {/* <a href="index.html" className="logo-dark"> */}
                  <span>
                    <img
                      src="../../src/assets/images/gcip_logo.png"
                      alt="GCIP Logo"
                      height="50"
                      width="150"
                    />
                  </span>
                {/* </a> */}
                <a href="index.html" className="logo-light">
                  <span>
                    <img
                      src="../../src/assets/images/gcip_logo.png"
                      alt="logo"
                      height="22"
                    />
                  </span>
                </a>
              </div>

              <div className="my-auto">
                <h4 className="mt-0">Admin Register</h4>
                <p className="text-muted mb-4">Create your account, it takes less than a minute</p>

                <form action="#">
                  <div className="mb-3">
                  <Input
                    value={formik.values.email}
                      error={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                      outlined
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      required
                      type="email"
                      placeholder="someone@example.com"
                      label="Email Address"
                    />
                  </div>

                  <div className="mb-3">
                  <Input
                  outlined
                    value={formik.values.firstName}
                      name="firstName"
                      onChange={formik.handleChange}
                      label="First Name"
                      placeholder="Enter first name here."
                      required
                    />
                  </div>

                  <div className="mb-3">
                  <Input
                  outlined
                    value={formik.values.lastName}
                      name="lastName"
                      onChange={formik.handleChange}
                      label="Last Name"
                      placeholder="Enter your last name here"
                      required
                    />
                  </div>

                  <div className="mb-3">
                 <Input
                 outlined
                  value={formik.values.password}
                    error={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ""
                    }
                    name="password"
                    onChange={formik.handleChange}
                    required
                    type="password"
                    label="Password"
                    placeholder="********"
                  />
                  </div>

                  <div className="mb-3">
                  <Input
                  outlined
                    value={formik.values.confirmPassword}
                      error={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? formik.errors.confirmPassword
                          : ""
                      }
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      required
                      type="password"
                      label="Confirm Password"
                      placeholder="********"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox-signin"
                        checked
                        onChange={(e) => {
                          setChecked(e.target.checked);
                        }}
                      />
                      <span className="text-muted" for="checkbox-signin">
                      By clicking on Signup, you agree to our <a>Terms of Service </a>
                 and <a>policy & terms</a>
                      </span>
                    </div>
                  </div>
                  
                  <div className="d-grid mb-0 text-center">
                  <button
                      disabled={!checked}
                      className="btn btn-primary"
                      onClick={formik.handleSubmit}>
                      <i className="ri-login-box-line"></i> Sign Up
                    </button>
                  </div>
                </form>
              </div>

              <footer className="footer footer-alt">
                <p className="text-muted">
                  Already have an account?{" "}
                  <a onClick={() => navigate("/")}  className="text-muted ms-1">
                    <b>Log In</b>
                  </a>
                </p>
              </footer>
            </div>
          </div>
          <div className="auth-fluid-right text-center">
            <div className="auth-user-testimonial">
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <h2 className="mb-3">Global Cleantech Innovation Programme</h2>
                    <p className="lead">
                      <i className="ri-double-quotes-l"></i> GCIP is a program
                      coordinated by the United Nations Industrial Development
                      Organization (UNIDO) and funded by the Global Environment
                      Facility (GEF) to promote cleantech innovation and
                      entrepreneurship in order to address the most critical
                      climate and environmental concerns.
                    </p>
                  </div>
                  <div className="carousel-item">
                    <h2 className="mb-3">Flexibility</h2>
                    <p className="lead">
                      <i className="ri-double-quotes-l"></i> The Objective is to
                      incentivize cleantech SMEs and start-ups which have the
                      potential to lead the transition to low-carbon economies
                      to scale up and become market worthy and investment.
                    </p>
                    <p>- Admin User</p>
                  </div>
                  <div className="carousel-item">
                    <h2 className="mb-3">Feature Availability!</h2>
                    <p className="lead">
                      <i className="ri-double-quotes-l"></i> The program will
                      empower start-ups and SMEs with financing to be able to
                      upscale and compete favourably against traditional
                      un-clean technologies currently flooding the market.
                    </p>
                    <p>- Admin User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}

export default Login;
