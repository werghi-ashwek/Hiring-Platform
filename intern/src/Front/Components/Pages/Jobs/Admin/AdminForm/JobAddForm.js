import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FeedIcon from "@mui/icons-material/Feed";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import "./JobAddForm.css";

const AdminJobForm = () => {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [publisher, setPublisher] = useState("");
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [snackbaropen, setSnackBarOpen] = useState(false);

  const SnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setTeam("");
    setPublisher("");
    setSkill("");
    setDescription("");
    setSalary("");

    axios
      .post("http://localhost:5000/api/jobs/add", {
        title: title,
        team: team,
        publisher: publisher,
        skill: skill,
        description: description,
        salary: salary,
      })
      .then((res) => {
        setSnackBarOpen(true);
        window.localStorage.setItem("job", JSON.stringify(res.data));
        navigate("/admindashboard");
        console.log("you  added succefully a new job", res.data);
      })
      .catch((errors) => {
        console.log("something went wrong", errors);
      });
  };

  return (
    <div className="job-add-root">
        <h1 className="add-form-title">  Add A New Job</h1>
        <form onSubmit={handleSubmit} className="form-add-job">
          <div className="second-job">
            <h4 className="information">
              {" "}
              <FeedIcon style={{marginLeft:"10px", marginRight:"10px"}}/>
              Publish A New Job{" "}
            </h4>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              columnGap={3}
              rowGap={1}
            >
              <Grid xs={12} sm={6} item>
                <TextField
                  type="text"
                  placeholder="Enter the job's name"
                  label="Job's name"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    marginTop: "30px",
                    width: "300px",
                    marginLeft: "20px",
                  }}
                />
              </Grid>
              <Grid xs={12} sm={5} item>
                <TextField
                  type="text"
                  placeholder="Enter the publisher name"
                  label="Publisher"
                  variant="outlined"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
                  fullWidth
                  style={{
                    marginTop: "30px",
                    marginRight: "40px",
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  type="text"
                  placeholder="Enter the team's name"
                  label="team"
                  variant="outlined"
                  fullWidth
                  required
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  style={{
                    marginTop: "30px",
                    // width: "300px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                ></TextField>
              </Box>
            </Grid>
            <Grid xs={12} item>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  type="text"
                  placeholder="Enter the required skills"
                  label="Skills"
                  variant="outlined"
                  fullWidth
                  required
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  style={{
                    marginTop: "30px",
                    // width: "300px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                ></TextField>
              </Box>
            </Grid>
            <Grid xs={12} item>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  type="text"
                  placeholder="Enter the job's description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    marginTop: "30px",
                    // width: "300px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                ></TextField>
              </Box>
            </Grid>
            <Grid xs={12} item>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  type="text"
                  placeholder="Enter the job's salary"
                  label="Salary"
                  variant="outlined"
                  fullWidth
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  style={{
                    marginTop: "30px",
                    // width: "300px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                ></TextField>
              </Box>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              startIcon={<PostAddIcon />}
              className="add-button-job"
            >
              Add A New Job
              <Snackbar
                open={snackbaropen}
                autoHideDuration={2000}
                onClose={SnackBarClose}
              >
                <Alert
                  /*onClose={SnackBarClose}*/ severity="success"
                  sx={{ width: "100%" }}
                >
                  You have successfully submitted your informations
                </Alert>
              </Snackbar>
            </Button>{" "}
            
          </div>
        </form>
    </div>
  );
};

export default AdminJobForm;
