import React, { useContext, useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import  Button  from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../Context/userprovider";
import cog from "../../../Assets/images/Cognira_logo.svg";
import { useScrollPosition } from "../Hooks/Hooks";
import "./UserNavbar.css";
import AvatarMenu from "./Utilities/Avatar";

const UserNavBar = () => {
  /** navbar scrolling */
  const scrollPosition = useScrollPosition();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  /***************Navigation to Signup / Signin**********************/

  /*Navigation to login and signup */
  const navigate = useNavigate();
  const navigatetologin = () => {
    navigate("/login");
  };

  const navigatetosignup = () => {
    navigate("/signup");
  };

  /*logout function */
  const usercontext = useContext(UserContext);
  const navigatetologout = () => {
    window.localStorage.removeItem("user");
    usercontext.setAuth({});
    navigate("/login");
  };

  const navRef = useRef();

  const user = JSON.parse(window.localStorage.getItem("user"));

  //{`navbar-bar ${nav && 'active'}`}

  return (
    <div
      className={classNames(scrollPosition >= 80 ? " active" : "navbar-bar")}
    >
      <Navbar ref={navRef}>
        <Container>
          <ul className="items">
            <img src={cog} className="cog-logo"></img>
            <Nav>
              <li className="item">
                {" "}
                <Link to="/home">Home</Link>{" "}
              </li>
              <li className="item">
                {" "}
                <Link to="/jobs">Jobs</Link>{" "}
              </li>
            </Nav>
          </ul>
          {user ? (
            <>
            <div>
              <Button
                variant="text"
                onClick={navigatetologout}
                startIcon={<LogoutIcon />}
                className="logoutbutton"
              >
                LogOut
              </Button>
              <AccountCircleIcon style={{ marginTop: "5px" }} />
              </div>
            </>
          ) : (
            <>{navigatetologin}</>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavBar;
