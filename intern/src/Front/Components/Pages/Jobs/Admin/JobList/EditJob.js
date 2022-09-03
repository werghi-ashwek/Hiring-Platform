import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FeedIcon from "@mui/icons-material/Feed";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import "../AdminForm/JobAddForm.css";
import "./EditJob.css";

const AdminEditForm = () => {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [publisher, setPublisher] = useState("");
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [data, setData] = useState([]);
  const [snackbaropen, setSnackBarOpen] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const SnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const getJobbyid = (id) => {
    axios
      .get(`http://localhost:5000/api/jobs/getone/${id}`)
      .then((res) => {
        if (res.data) {
          setTitle(res.data.title);
          setTeam(res.data.team);
          setPublisher(res.data.publisher);
          setSkill(res.data.skill);
          setDescription(res.data.description);
          setSalary(res.data.salary);
        }
        console.log(" the edited jobs are :", res.data);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };
  useEffect(() => {
    getJobbyid(id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setTeam("");
    setPublisher("");
    setSkill("");
    setDescription("");
    setSalary("");
    axios
      .put(`http://localhost:5000/api/jobs/editjob/${id}`, {
        title: title,
        team: team,
        publisher: publisher,
        skill: skill,
        description: description,
        salary: salary,
      })
      .then((res, err) => {
        setSnackBarOpen(true);
        getJobbyid(id);
        window.localStorage.setItem("job", JSON.stringify(res.data));
        console.log("you  added succefully a new job", res.data);
      })
      .catch((errors) => {
        console.log("something went wrong", errors);
      });
  };

  return (
    <div className="edit-root">
      <h1 className="edit-form-title">  Edit The Selected Job</h1>
      <div className="edit-job">
        <form onSubmit={handleSubmit}>
          <h4 className="title-information">
            {" "}
            <FeedIcon style={{marginLeft:"20px", marginRight:"10px"}} />
            Jobs Information{" "}
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
                  width: "260px",
                  marginLeft: "-30px",
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
                  marginLeft: "-30px",
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                type="text"
                placeholder="Enter the team's name"
                label="Team"
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
           className="save-edit-job"
            variant="contained"
            type="submit"
            endIcon={<SaveAsIcon />}
            
          >
            Save
            <Snackbar
              open={snackbaropen}
              autoHideDuration={2000}
              onClose={SnackBarClose}
            >
              <Alert
                severity="success"
                sx={{ width: "100%" }}
              >
                You have successfully edited your information
              </Alert>
            </Snackbar>
          </Button>{" "}
          <Button
            onClick={() => {
              navigate("/admindashboard");
            }}
            className="back-to-dash"
            variant="contained"
           
          >
            <ArrowBackIcon style={{ marginRight: "10px" }} />
             Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditForm;
