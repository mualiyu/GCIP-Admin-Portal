import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon } from "../../assets/Svg/Index";
import { FcHome } from "react-icons/fc";
import { FaHandHolding, FaHome, FaWhatsapp } from "react-icons/fa";
function ProgramLayOut() {
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
        <img className="aside_logo" src="svg.svg" alt="img" />
        <div className="divider" />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Program Home"
          route="/Programme"
          Icon={() => (
            <FaHome
              color={
                location.pathname == "/Programme" ? "var(--primary)" : "#000"
              }
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
          route="/Programme/Application"
          Icon={() => (
            <FaHandHolding
              color={
                location.pathname == "/Programme/Application" ? "var(--primary)" : "#000"
              }
            />
          )}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Messages"
          route="/Programme/Message"
          Icon={() => (
            <FaWhatsapp
              color={
                location.pathname == "/Programme/Message" ? "var(--primary)" : "#000"
              }
            />
          )}
        />
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Documents"
          route="/Programme/Document"
          Icon={() => <FolderIcon active={location.pathname == "/Programme/Document"} />}
        />

        {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
        <div className="other-links">
          <div className="divider" />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="File Manager"
            route="/"
            Icon={() => <FolderIcon active={location.pathname == "/"} />}
          />
        </div>
      </div>

      <div className="layout_main">
        <Outlet />
      </div>
    </div>
  );
}

export default ProgramLayOut;
