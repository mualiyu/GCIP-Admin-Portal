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
    username: Yup.string().min(5, "Must have at least 5 chars").required(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      values.device_name = "192.168.43.1";
      // navigate("/Home");
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/admin/login",
        bodyData: values,
      });
      setLoading(false);

      if (response.success) {
        setAlert(response.data.message);
        dispatch(
          setUser({
            user: {
              email: response.data.data.user.email,
              firstName: response.data.data.user.name,
              isLoggedIn: true,
              token: response.data.data.token,
            },
          })
        );
        navigate("/Home");
      } else {
        setAlert("Oops! Something went wrong with your login");
      }

      setTimeout(() => {
        setAlert("");
      }, 5000);
    },
    validationSchema,
  });
  return (
    <Fade>
      <section className="authentication-bg pb-0">
        <Loading loading={loading} />
        <Alert text={alertText} />
        <div className="auth-fluid">
          <div className="auth-fluid-form-box">
            <div className="card-body d-flex flex-column h-100 gap-3">
              <div className="auth-brand text-center text-lg-start">
                <a href="index.html" className="logo-dark">
                  <span>
                    <img
                      src="../../src/assets/images/gcip_logo.png"
                      alt="GCIP Logo"
                      height="50"
                      width="150"
                    />
                  </span>
                </a>
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
                <h4 className="mt-0">Admin Log In</h4>
                <p className="text-muted mb-4">
                  Welcome back! You've been missed
                </p>

                <form action="#">
                  <div className="mb-3">
                    <Input
                      outlined
                      error={
                        formik.touched.username && formik.errors.username
                          ? formik.errors.username
                          : ""
                      }
                      id="username"
                      onChange={formik.handleChange}
                      placeholder="youremail@domain.com"
                      label="Username/Email"
                    />
                  </div>
                  <div className="mb-3">
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
                      placeholder="*******"
                    />
                  </div>
                  <a
                    onClick={() => {
                      navigate("forgot");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-muted float-end">
                    <small>Forgot your password?</small>
                  </a>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox-signin"
                      />
                      <label className="form-check-label" for="checkbox-signin">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="d-grid mb-0 text-center">
                    <button
                      className="btn btn-primary"
                      onClick={formik.handleSubmit}>
                      <i className="ri-login-box-line"></i> Log In{" "}
                    </button>
                  </div>
                </form>
              </div>

              <footer className="footer footer-alt">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <a
                    onClick={() => navigate("/signup")}
                    className="text-muted ms-1">
                    <b>Sign Up</b>
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
                    <h2 className="mb-3">
                      Global Cleantech Innovation Programme
                    </h2>
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
                  </div>
                  <div className="carousel-item">
                    <h2 className="mb-3">Feature Availability</h2>
                    <p className="lead">
                      <i className="ri-double-quotes-l"></i> The program will
                      empower start-ups and SMEs with financing to be able to
                      upscale and compete favourably against traditional
                      un-clean technologies currently flooding the market.
                    </p>
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
