import React, { useContext, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../Context/userprovider";
import { useScrollPosition } from "../Hooks/Hooks";
import cog from "../../../Assets/images/Cognira_logo.svg";

const AdminNavBar = () => {

  /** navbar scrolling */
 const scrollPosition = useScrollPosition();

 function classNames(...classes) {
   return classes.filter(Boolean).join(" ");
 }
 

  const navigate = useNavigate();
  const navigatetologin = () => {
    navigate("/login");
  };

  const navigatetosignup = () => {
    navigate("/signup");
  };

  const usercontext = useContext(UserContext);
  
  const navigatetologout = () => {
    window.localStorage.removeItem("user");
    usercontext.setAuth({});
    navigate("/login");
  };

  const navRef = useRef();


  const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <div className={classNames(
      scrollPosition >= 80 ? ' active' : 'navbar-bar'
    )}>
      <Navbar className="Bar" ref={navRef}>
        <Container>
          <ul className="items">
            <img src={cog} className="cog-logo"></img>
            <Nav>
              <li className="item">
                {" "}
                <Link to="/admindashboard"> Jobs </Link>{" "}
              </li>
              <li className="item">
                {" "}
                <Link to="/userinfo"> Applicants </Link>{" "}
              </li>
            </Nav>
          </ul>
              {user ? (
                <>
                <div>
                  <Button
                    className="logoutbutton"
                    variant="text"
                    onClick={navigatetologout}
                    startIcon={<LogoutIcon />}
                    style={{color:"black"}}
                    
                  >
                    LogOut
                  </Button>
                  <AccountCircleIcon style={{ marginTop:"5px"}}/>
                  </div>
                </>
              ) : (
                <>
                  {navigatetologin}
                </>
              )}
            
      
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavBar;
