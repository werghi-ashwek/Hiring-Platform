import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";


function Logoutgoogle() {
  const onSuccess = (response) => {
    console.log("logout with success!");
  };



  return (
    <GoogleLogout
            clientId="408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com"
            buttonText="Sign out with google"
            onLogoutSuccess={onSuccess}
            
           
          />
  );
}

export default Logoutgoogle;