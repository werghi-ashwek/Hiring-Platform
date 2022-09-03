import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 16, width:"300px",marginLeft:"140px",marginBottom:"-30px",marginTop:"-50px"}}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
