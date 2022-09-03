import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../Login/Errormsg";
import Logingoogle from "../Login/googlelogin";

import { setAuthenticated, isAuth } from "../../Helpers/auth";
import axios from "axios";
import cog from "../../../../Assets/images/Cognira_logo.svg";

import "./Signin.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState(false);

  const [password, setPassword] = useState("");
  const [passworderr, setPassworderr] = useState(false);

  const [fullname, setFullName] = useState("");
  const [nameerr, setNameerr] = useState(false);

  const [erro, setErro] = useState({});

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/signup", {
        fullname: fullname,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          setAuthenticated(res.data.token, res.data.user);
          console.log(" registered succefully", res.data);
          navigate("/login");
          setErro({});
        }
      })

      .catch((err) => {
        if (err.response.data.fullname) {
          setNameerr(true);
          setErro(err.response.data.fullname);
        } else if (err.response.data.email) {
          setEmailerr(true);
          setErro(err.response.data.email);
        } else if (err.response.data.password) {
          setPassworderr(true);
          setErro(err.response.data.password);
        }
      });
  }

  return (
    <div className="root">
      <div>
        <form onSubmit={handleSubmit} className="sub-root">
          <div></div>
          <div>
            <img src={cog} className="cog-logo-2"></img>
            <img
              className="img2"
              src={require("../../../../Assets/images/signup.png")}
            ></img>
          </div>
          <div>
            <div>
              <h2 className="account-crea-title"> Create Your Account</h2>{" "}
            </div>

            <div className="formfields2">
              <div>
                <label className="labelsignup"> Full Name</label>
                <Form.Control
                  required
                  id="fullname"
                  className="inputsigniup"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                ></Form.Control>
                <div style={{ paddingTop: "20px", paddingRight: "10px", color:"red" }}>
                  {nameerr && (
                    <p>{erro} </p> 
                  )}
                </div>
              </div>

              <div className="email">
                <label className="labelsignup1"> Email</label>
                <Form.Control
                  className="inputsigniup"
                  id="email"
                  required
                  type="email"
                  placeholder="Enter a valid email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ paddingTop: "20px", paddingRight: "10px", color:"red" }}>
                  {emailerr && (
                    <p> {erro} </p> 
                  )}
                </div>
              </div>

              <div className="password">
                <label className="labelsignup2"> Password</label>
                <Form.Control
                  id="password"
                  className="inputsigniup"
                  required
                  type="password"
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ paddingTop: "20px", paddingRight: "10px",marginBottom:"-30px", color:"red"}}>
                  {passworderr && (
                    <p> {erro} </p>  
                  )}
                </div>
              </div>

              <button className="signup-button" type="submit">
                Sign Up
              </button>
              <div className="back-to-login">
                <span>Back To Login Page? </span>{" "}
                <Link to="/login" className="link-login">
                  {" "}
                  Login{" "}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
