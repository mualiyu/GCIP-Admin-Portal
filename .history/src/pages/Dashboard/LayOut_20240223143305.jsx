import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon } from "../../assets/Svg/Index";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaUser, FaUserTie, FaWrench } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";

function LayOut() {
  const location = useLocation();
  const asideRef = useRef();
  return (
    <div className="layout_container">
      {/* <div className="layout_nav">
        
        <img className="layout_user" src={User} alt="img" />
        <img
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "100vw";
            }
          }}
          className="drawer_bar"
          src={Drawer}
          alt="img"
        />
      </div> */}

      <div ref={asideRef} className="layout_aside">
        <img
          className="aside_logo"
          src="../../src/assets/images/gcip_logo_white.png"
          alt="img"
        />
        <div className="divider" />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Home"
          route="/Home"
          Icon={() => <FolderIcon active={location.pathname == "/Home"} />}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Applicants"
          route="/Home/Applicants"
          Icon={() => <FaUserTie active={location.pathname == "/Applicants"} />}
        />
        {/* <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Projects"
          route="/Home/Projects"
          Icon={() => <FaUserTie active={location.pathname == "/Projects"} />}
        /> */}

        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Settings"
          route="/Home/Settings"
          Icon={() => <FaWrench />}
        />

        {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
        <div className="other-links">
          <div className="divider" />
          {/* <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="ADMIN"
          route="/"
          Icon={() => <FaUser color="#000"/>}
        /> */}
        </div>
      </div>

      <div className="layout_main">
        <div class="topbar container-fluid">
          <ul
            class="topbar-menu d-flex align-items-center gap-3"
            style={{ justifyContent: "flex-end" }}>
            <li class="dropdown">
              <a
                class="nav-link dropdown-toggle arrow-none nav-user px-2"
                data-bs-toggle="dropdown"
                href="index.html#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false">
                <span class="account-user-avatar">
                  <img
                    src="../../src/assets/Images/profile.png"
                    alt="user-image"
                    width="32"
                    class="rounded-circle"
                  />
                </span>
                <span class="d-lg-flex flex-column gap-1 d-none">
                  <h5 class="my-0">Ahmed Peter</h5>
                  <h6 class="my-0 fw-normal">Admin</h6>
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                <a href="pages-profile.html" class="dropdown-item">
                  <i class="ri-account-circle-line fs-18 align-middle me-1"></i>
                  <span>My Account</span>
                </a>

                <a href="pages-profile.html" class="dropdown-item">
                  <i class="ri-settings-4-line fs-18 align-middle me-1"></i>
                  <span>Settings</span>
                </a>

                <a href="pages-faq.html" class="dropdown-item">
                  <i class="ri-customer-service-2-line fs-18 align-middle me-1"></i>
                  <span>Support</span>
                </a>

                <a href="auth-logout-2.html" class="dropdown-item">
                  <i class="ri-logout-box-line fs-18 align-middle me-1"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;
