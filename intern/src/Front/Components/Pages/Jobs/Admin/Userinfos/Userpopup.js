import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";

import axios from "axios";

import "./Userpopup.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "560",
    border: "solid 1px #9fceef",
    
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
  },
  "& .MuiPaper-root ":
    {
      borderRadius: "10px",
      
    },
}));

//MuiDialog-container MuiDialog-scrollPaper css-hz1bth-MuiDialog-container

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 1, p: 3 }}
      {...other}
      style={{ fontFamily: "'Lora', serif", fontSize: "25px" }}
    >
      {children}
      
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Userpopup = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUserInfos = () => {
    axios
      .get("http://localhost:5000/api/userform/getalluserform")
      .then((res) => {
        setData(res.data);
        console.log("tha actual data are :", res.data);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <div>
      <div className="readmorediv">
        <Button
          className="readmore"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Read More
        </Button>
      </div>
      <div>
        {data.map((elt) => (
          <div style={{overFlow:"hidden"}}>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              className="dialog"
            >
              <div>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                  className="popup-dialog"
                >
                  {elt.fullname}
                </BootstrapDialogTitle>
                <div className="content-dialog">
                  <div className="higher-education">
                    <DialogContent className="education">
                      <img
                        style={{ width: "300px", float: "right", paddingRight:"30px" }}
                        src={require("../../../../../../Assets/images/highereducation.png")}
                      ></img>

                      <Typography gutterBottom>
                        <div>
                          <h2 className="headersform"> Higher education</h2>
                          <ul>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                School :{elt.fields[0].school}{" "}
                              </p>{" "}
                            </li>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                Degree : {elt.fields[0].degree}{" "}
                              </p>{" "}
                            </li>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                Major : {elt.fields[0].major}{" "}
                              </p>{" "}
                            </li>
                          </ul>
                        </div>
                      </Typography>
                    </DialogContent>
                    <DialogContent className="education">
                      <img
                        style={{
                          width: "300px",
                          float: "right",
                          height: "300px",
                        }}
                        src={require("../../../../../../Assets/images/workexperience.jpg")}
                      ></img>
                      <Typography gutterBottom>
                        <div>
                          <h2 className="headersform"> Work Experience </h2>
                          <ul>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                Employer : {elt.experience[0].employer}{" "}
                              </p>{" "}
                            </li>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                Job Title: {elt.experience[0].jobtitle}{" "}
                              </p>{" "}
                            </li>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                Start Month : {
                                  elt.experience[0].startmonth
                                }{" "}
                              </p>{" "}
                              <p className="littletitle">
                                {" "}
                                Start Year : {elt.experience[0].startyear}{" "}
                              </p>
                            </li>
                            <li>
                              {" "}
                              <p className="littletitle">
                                {" "}
                                End Month : {elt.experience[0].endmonth}{" "}
                              </p>{" "}
                              <p className="littletitle">
                                {" "}
                                End Year : {elt.experience[0].endyear}{" "}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Typography>
                    </DialogContent>
                    <DialogContent className="education">
                    <img
                        style={{ width: "200px", float: "right", paddingRight:"20px" }}
                        src={require("../../../../../../Assets/images/coverletter.jpg")}
                      ></img>
                      <h2 className="headersform"> Cover Letter </h2>
                      <p className="littletitle"> {elt.coverletter} </p>
                    </DialogContent>
                  </div>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Close
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </BootstrapDialog>
            <div />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userpopup;
