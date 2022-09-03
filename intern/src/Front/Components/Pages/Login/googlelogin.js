import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

import {Navigate, useHistory, useNavigate} from "react-router-dom";


function Logingoogle() {

  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log("signing up with success! Cuurent user : ", response?.profileObj);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/users/googlelogin",
      data: {tokenId: response.tokenId}
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  };

  const onFailure = (error) => {
    console.log("login failed! res: ", error);

  };

  return (
    <GoogleLogin
            clientId="408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com"
            buttonText="Sign in with google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
  );
}

export default Logingoogle;
