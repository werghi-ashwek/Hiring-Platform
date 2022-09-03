import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/userprovider";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { setAuthenticated, isAuth } from "../../Helpers/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Logingoogle from "./googlelogin";
import ErrorMessage from "./Errormsg";
import axios from "axios";
import cog from "../../../../Assets/images/Cognira_logo.svg";

import "./loginform.css";



function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erro, setErro] = useState({});
  const [passworderr, setPassworderr] = useState(false);
  const [emailerr, setEmailerr] = useState(false);

  const usercontext = useContext(UserContext);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/signin", {
        email: email,
        password: password,
      })
      .then((res, err) => {
        const token = res?.data?.token;
        const user = res?.data;
        if (res.data) {
          usercontext.setAuth({ token, user });
          setAuthenticated(res.data.token, res.data.user);
          if (isAuth() && isAuth().isAdmin === true) {
            navigate("/admindashboard");
            console.log("logged in successfully as an admin", res.data);
          } else {
            navigate("/home");
            console.log("logged in successfully as a user", res.data);
          }

          setErro({});
        }
      })
      .catch((errors) => {
        if (errors.response.data.password) {
          setPassworderr(true);
          setEmailerr(false);
          setErro(errors.response.data.password);
        } else if (errors.response.data.email) {
          setPassworderr(false);
          setEmailerr(true);
          setErro(errors.response.data.email);
        }
        console.log("something went wrong", errors.response.data);
      });
  }

  return (
    <div className="loginform">
      <Form  className="sub-main">
        <div>
        <img src={cog} className="cog-logo-3"></img>
          <img
            className="img1"
            src={require("../../../../Assets/images/background.jpg")}
          ></img>
        </div>
        <div>
          <h2 className="welcomeback"> Welcome back! </h2>
          <h6 className="continue"> Login to continue</h6>
          <div className="formfields">
            <div style={{ paddingBottom: "20px" }}>
              <label className="labelloginemail"> Email</label>
              <div className="inpemail">
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div style={{ paddingTop: "20px", paddingRight: "10px" }}>
              {emailerr && (
                <ErrorMessage variant="danger"> {erro} </ErrorMessage>
              )}
            </div>

            <label className="labellogin"> Password</label>
            <div className="inp">
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!erro.password}
              />
            </div>
            <div style={{ paddingTop: "20px", paddingRight: "10px" }}>
              {passworderr && (
                <ErrorMessage variant="danger"> {erro} </ErrorMessage>
              )}
            </div>
            <div>
              <button className="submit" type="submit" onClick={handleSubmit}>
                Login
              </button>
              <div className="new">
                <span>New here ? </span>{" "}
                <Link to="/signup" className="linksignup">
                  {" "}
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
