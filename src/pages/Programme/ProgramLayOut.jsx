import React, {useEffect, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, MessageIcon } from "../../assets/Svg/Index";
import { FcHome, FcSettings } from "react-icons/fc";
import { FaArrowLeft, FaHandHolding, FaHome, FaUser, FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setId, setProgram } from "../../redux/program/programSlice";
import query from '../../helpers/query'
import {
  FaBook,
  FaEnvelope,
  FaFileContract,
  FaHouseChimney,
  FaReply,
} from "react-icons/fa6";
import { setUnread} from "../../redux/user/userSlice";
function ProgramLayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const data=useSelector(state=>state)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const getData = async () => {
    // setLoading2(true);
    // nProgress.start();
    const respone = await query({
      method: "GET",
      url: `/api/admin/messages/get-unread/${data.program.id}`,
      token: data.user.user.token,
    });
    if (respone.success) {
      dispatch(setUnread(respone.data.data.unRead));
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
        <img className="aside_logo" src="/logo.jpg" alt="img" />
        <div className="divider" />

        <NavLink
            onClick={() => {
              if (data.program.id=='') {
                navigate('/Home')
              }else{
                dispatch(setProgram({program:{}}))
                dispatch(setId(''))
                navigate('/Home')
              }
            }}
            className="no-print"
            label="Back to Home"
            route="/Home"
            Icon={() => <FaReply  color={
              location.pathname == "/Home"  ? "#fff" : "var(--primary)"
            } />}
          />

        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Program Home"
          route="/Programme"
          Icon={() => (
            <FaHouseChimney
              color={
                location.pathname == "/Programme"  ? "#fff" : "var(--primary)"
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
            <FaBook
              color={
                location.pathname == "/Programme/Application" ?  "#fff" : "var(--primary)"
              }
            />
          )}
        />
        <NavLink
        unread={data.user.unread}
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Messages"
          route="/Programme/Message"
          Icon={() => (
           <FaEnvelope  color={
            location.pathname == "/Programme/Message" ? "#fff" : "var(--primary)"
          }/>
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
          Icon={() => <FaFileContract   color={
            location.pathname == "/Programme/Document"  ? "#fff" : "var(--primary)"
          } />}
        />

        <div className="other-links">
          <div className="divider" />
         
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Admin"
            route="/"
            Icon={() => <FaUser />}
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
