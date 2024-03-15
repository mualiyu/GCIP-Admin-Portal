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
                    
                    </div>

                    <ul class="topbar-menu d-flex align-items-center gap-3">
                        <li class="dropdown d-lg-none">
                            <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="index.html#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i class="ri-search-line fs-22"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                <form class="p-3">
                                    <input type="search" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
                                </form>
                              </div>
                        </li>

                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="index.html#" role="button" aria-haspopup="false" aria-expanded="false">
                                <img src="assets/images/flags/us.jpg" alt="user-image" class="me-0 me-sm-1" height="12"/>
                                <span class="align-middle d-none d-lg-inline-block">English</span> <i class="ri-arrow-down-s-line d-none d-sm-inline-block align-middle"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated" style="">

                               
                                <a href="javascript:void(0);" class="dropdown-item">
                                    <img src="assets/images/flags/germany.jpg" alt="user-image" class="me-1" height="12"/> <span class="align-middle">German</span>
                                </a>

                            </div>
                        </li>

                        <li class="dropdown notification-list">
                            <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="index.html#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i class="ri-notification-3-line fs-22"></i>
                                <span class="noti-icon-badge"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0" style="">
                                <div class="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h6 class="m-0 fs-16 fw-semibold"> Notification</h6>
                                        </div>
                                        <div class="col-auto">
                                            <a href="javascript: void(0);" class="text-dark text-decoration-underline">
                                                <small>Clear All</small>
                                            </a>
                                          </div>
                                    </div>
                                </div>

                                <div style="max-height: 300px;" data-simplebar="init"><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: auto; overflow: hidden;"><div class="simplebar-content" style="padding: 0px;">

                                    <h5 class="text-muted fs-12 fw-bold p-2 text-uppercase mb-0">Today</h5>
                                   

                                    <a href="javascript:void(0);" class="dropdown-item p-0 notify-item unread-noti card m-0 shadow-none">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="notify-icon bg-primary">
                                                        <i class="ri-message-3-line fs-18"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 text-truncate ms-2">
                                                    <h5 class="noti-item-title fw-semibold fs-14">Datacorp <small class="fw-normal text-muted float-end ms-1">1 min ago</small></h5>
                                                    <small class="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                   
                                    <a href="javascript:void(0);" class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="notify-icon bg-info">
                                                        <i class="ri-user-add-line fs-18"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 text-truncate ms-2">
                                                    <h5 class="noti-item-title fw-semibold fs-14">Admin <small class="fw-normal text-muted float-end ms-1">1 hr ago</small></h5>
                                                    <small class="noti-item-subtitle text-muted">New user registered</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <h5 class="text-muted fs-12 fw-bold p-2 mb-0 text-uppercase">Yesterday</h5>

                                   
                                    <a href="javascript:void(0);" class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="notify-icon">
                                                        <img src="assets/images/users/avatar-2.jpg" class="img-fluid rounded-circle" alt=""/>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 text-truncate ms-2">
                                                    <h5 class="noti-item-title fw-semibold fs-14">Cristina Pride <small class="fw-normal text-muted float-end ms-1">1 day ago</small></h5>
                                                    <small class="noti-item-subtitle text-muted">Hi, How are you? What about our next meeting</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <h5 class="text-muted fs-12 fw-bold p-2 mb-0 text-uppercase">31 Jan 2023</h5>

                                   
                                    <a href="javascript:void(0);" class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="notify-icon bg-primary">
                                                        <i class="ri-discuss-line fs-18"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 text-truncate ms-2">
                                                    <h5 class="noti-item-title fw-semibold fs-14">Datacorp</h5>
                                                    <small class="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                   
                                    <a href="javascript:void(0);" class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="notify-icon">
                                                        <img src="assets/images/users/avatar-4.jpg" class="img-fluid rounded-circle" alt=""/>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 text-truncate ms-2">
                                                    <h5 class="noti-item-title fw-semibold fs-14">Karen Robinson</h5>
                                                    <small class="noti-item-subtitle text-muted">Wow ! this admin looks good and awesome design</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div></div></div></div><div class="simplebar-placeholder" style="width: 0px; height: 0px;"></div></div><div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: hidden;"><div class="simplebar-scrollbar" style="height: 0px; display: none; transform: translate3d(0px, 0px, 0px);"></div></div></div>

                               
                                <a href="javascript:void(0);" class="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2">
                                    View All
                                </a>

                            </div>
                        </li>

                        <li class="dropdown d-none d-sm-inline-block">
                            <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="index.html#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i class="ri-apps-2-line fs-22"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0" style="">

                                <div class="p-2">
                                    <div class="row g-0">
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="index.html#">
                                                <img src="assets/images/brands/github.png" alt="Github"/>
                                                <span>GitHub</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="index.html#">
                                                <img src="assets/images/brands/bitbucket.png" alt="bitbucket"/>
                                                <span>Bitbucket</span>
                                            </a>
                                        </div>
                                       
                                    </div>

                                    
                                </div>

                            </div>
                        </li>

                        <li class="d-none d-sm-inline-block">
                            <a class="nav-link" data-bs-toggle="offcanvas" href="index.html#theme-settings-offcanvas">
                                <i class="ri-settings-3-line fs-22"></i>
                            </a>
                        </li>

                        <li class="d-none d-sm-inline-block">
                            <div class="nav-link" id="light-dark-mode" data-bs-toggle="tooltip" data-bs-placement="left" aria-label="Theme Mode" data-bs-original-title="Theme Mode">
                                <i class="ri-moon-line fs-22"></i>
                            </div>
                        </li>


                        <li class="d-none d-md-inline-block">
                            <a class="nav-link" href="" data-toggle="fullscreen">
                                <i class="ri-fullscreen-line fs-22"></i>
                            </a>
                        </li>

                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="index.html#" role="button" aria-haspopup="false" aria-expanded="false">
                                <span class="account-user-avatar">
                                    <img src="assets/images/users/avatar-1.jpg" alt="user-image" width="32" class="rounded-circle">
                                </span>
                                <span class="d-lg-flex flex-column gap-1 d-none">
                                    <h5 class="my-0">Tosha Minner</h5>
                                    <h6 class="my-0 fw-normal">Founder</h6>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                                
                                <div class=" dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">Welcome !</h6>
                                </div>

                                
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

                                
                                <a href="auth-lock-screen.html" class="dropdown-item">
                                    <i class="ri-lock-password-line fs-18 align-middle me-1"></i>
                                    <span>Lock Screen</span>
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
