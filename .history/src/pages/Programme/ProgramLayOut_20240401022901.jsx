import React, { useEffect, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/gcip_logo_white.png";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, MessageIcon } from "../../assets/Svg/Index";
import { FcHome, FcSettings } from "react-icons/fc";
import {
  FaArrowLeft,
  FaHandHolding,
  FaHome,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import query from "../../helpers/query";
import {
  FaBook,
  FaEnvelope,
  FaFileContract,
  FaHouseChimney,
  FaReply,
  FaPowerOff,
} from "react-icons/fa6";
import { setUnread } from "../../redux/user/userSlice";
function ProgramLayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const data = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/admin/messages/get-unread/${data.program.id}`,
      token: data.user.user.token,
    });
    if (respone.success) {
      dispatch(setUnread(respone.data.data.unRead));
    }
  };
  const logOut = async () => {
    const response = await query({
      method: "POST",
      url: `/api/admin/logout`,
      token: programData.user.user.token,
    });
    console.log(response);
    navigate("/");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    // <div className="layout_container">

    //   <div ref={asideRef} className="layout_aside">
    //     <img className="aside_logo" src={Logo} alt="img" />
    //     <div className="divider" />

    //     <NavLink
    //       onClick={() => {
    //         if (data.program.id == "") {
    //           navigate("/Home");
    //         } else {
    //           dispatch(setProgram({ program: {} }));
    //           dispatch(setId(""));
    //           navigate("/Home");
    //         }
    //       }}
    //       className="no-print"
    //       label="Back to Home"
    //       route="/Home"
    //       Icon={() => (
    //         <FaReply
    //           color={location.pathname == "/Home" ? "#fff" : "var(--primary)"}
    //         />
    //       )}
    //     />

    //     <NavLink
    //       onClick={() => {
    //         if (window.innerWidth <= 767) {
    //           asideRef.current.style.width = "0px";
    //         }
    //       }}
    //       label="Program Home"
    //       route="/Programme"
    //       Icon={() => (
    //         <FaHouseChimney
    //           color={
    //             location.pathname == "/Programme" ? "#fff" : "var(--primary)"
    //           }
    //         />
    //       )}
    //     />
    //     <NavLink
    //       onClick={() => {
    //         if (window.innerWidth <= 767) {
    //           asideRef.current.style.width = "0px";
    //         }
    //       }}
    //       label="Applications"
    //       route="/Programme/Application"
    //       Icon={() => (
    //         <FaBook
    //           color={
    //             location.pathname == "/Programme/Application"
    //               ? "#fff"
    //               : "var(--primary)"
    //           }
    //         />
    //       )}
    //     />
    //     <NavLink
    //       unread={data.user.unread}
    //       onClick={() => {
    //         if (window.innerWidth <= 767) {
    //           asideRef.current.style.width = "0px";
    //         }
    //       }}
    //       label="Messages"
    //       route="/Programme/Message"
    //       Icon={() => (
    //         <FaEnvelope
    //           color={
    //             location.pathname == "/Programme/Message"
    //               ? "#fff"
    //               : "var(--primary)"
    //           }
    //         />
    //       )}
    //     />
    //     <NavLink
    //       onClick={() => {
    //         if (window.innerWidth <= 767) {
    //           asideRef.current.style.width = "0px";
    //         }
    //       }}
    //       label="Documents"
    //       route="/Programme/Document"
    //       Icon={() => (
    //         <FaFileContract
    //           color={
    //             location.pathname == "/Programme/Document"
    //               ? "#fff"
    //               : "var(--primary)"
    //           }
    //         />
    //       )}
    //     />

    //     <div className="other-links">
    //       <div className="divider" />

    //       <NavLink
    //         onClick={logOut}
    //         label="Log out"
    //         route="/"
    //         Icon={() => (
    //           <FaPowerOff active={location.pathname == "/Applicants"} />
    //         )}
    //       />
    //     </div>
    //   </div>

    //   <div className="layout_main">
    //     <Outlet />
    //   </div>
    // </div>
    <div className="layout_container">
      <div ref={asideRef} className="layout_aside">
        <img className="aside_logo" src={Logo} alt="img" />
        <div className="divider" />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Home"
          route="/Home"
          Icon={() => <FaHouseChimney active={location.pathname == "/Home"} />}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Program Management"
          route="/Programme/Application"
          Icon={() => (
            <FaBriefcase
              active={location.pathname == "/Programme/Application"}
            />
          )}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Applications"
          route="/Home/Applicants"
          Icon={() => <FaUser active={location.pathname == "/Applicants"} />}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Messaging"
          route=""
          Icon={() => <FaEnvelope active={location.pathname == ""} />}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Documents & Uploads"
          route=""
          Icon={() => <FaFilePdf active={location.pathname == ""} />}
        />
        <div className="other-links">
          <div className="divider" />
          <NavLink
            onClick={logOut}
            label="Log out"
            route="/"
            Icon={() => (
              <FaPowerOff active={location.pathname == "/Applicants"} />
            )}
          />
        </div>
      </div>

      <div className="layout_main">
        <div
          class="topbar container-fluid"
          style={{ backgroundColor: "#fbfcfc" }}>
          <div
            class="d-flex align-items-center gap-lg-2 gap-1"
            style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div class="app-search dropdown d-none d-lg-block">
              <form>
                <div class="input-group">
                  <input
                    type="search"
                    class="form-control dropdown-toggle"
                    placeholder="Search..."
                    id="top-search"
                  />
                  <span class="ri-search-line search-icon"></span>
                </div>
              </form>
            </div>
            <ul
              class="topbar-menu d-flex align-items-center gap-3"
              style={{ justifyContent: "flex-end", listStyleType: "none" }}>
              <li class="dropdown">
                <a
                  class="nav-link dropdown-toggle arrow-none nav-user px-2"
                  data-bs-toggle="dropdown"
                  href="index.html#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false">
                  <span
                    class="d-lg-flex flex-column gap-1 d-none"
                    style={{ textAlign: "right" }}>
                    <h5 class="my-0">
                      Welcome {programData?.user.user.firstName}!{" "}
                    </h5>
                    <h6 class="my-0 fw-normal">
                      {programData?.user.user.email}
                    </h6>
                  </span>
                  <span class="account-user-avatar">
                    {programData?.user.user.firstName.split("")[0]}
                    {programData?.user.user.firstName.split("")[1]}
                    {/* <img
                      src="../../src/assets/Images/profile.png"
                      alt="user-image"
                      width="32"
                      class="rounded-circle"
                    /> */}
                  </span>
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                  <span class="dropdown-item">
                    <i class="ri-account-circle-line fs-18 align-middle me-1"></i>
                    <span>My Account</span>
                  </span>

                  <span class="dropdown-item">
                    <i class="ri-settings-4-line fs-18 align-middle me-1"></i>
                    <span>Settings</span>
                  </span>

                  <span class="dropdown-item">
                    <i class="ri-customer-service-2-line fs-18 align-middle me-1"></i>
                    <span>Support</span>
                  </span>

                  <span class="dropdown-item" onClick={logOut}>
                    <i class="ri-logout-box-line fs-18 align-middle me-1"></i>
                    <span>Logout</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProgramLayOut;
