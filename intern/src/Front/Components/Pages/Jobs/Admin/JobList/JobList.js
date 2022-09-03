import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminUserTable from "../Userinfos/Userinfos";
import axios from "axios";
import Pagination from "./Pagination";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Jobs from "./Jobs";

import "./JobList.css";

export default function AdminTable() {
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [filterval, setFilterVal] = useState("");
  const [snackbaropen, setSnackBarOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPerPage] = useState(4);

  const navigate = useNavigate();

  //Get the jobs

  const fetchJobs = async () => {
    setLoading(true);
    const res = await axios
    .get(`http://localhost:5000/api/jobs/getall`);
    setData(res.data);
    setFilterData(res.data);
    setLoading(false);
    console.log("you the actual jobs are :", res.data);
  };

   useEffect(() => {
    fetchJobs();
  }, []);

   //delete the job 
   const onDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/api/jobs/deletejob/${_id}`)
      .then((res) => {
        setSnackBarOpen(true);
        console.log("the deleted job is ", res.data);
        fetchJobs();
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };
  
  // Get current jobs
  const indexOfLastJob = currentPage * jobPerPage;
  const indexOfFirstJob = indexOfLastJob - jobPerPage;
  const currentjobs = data.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //filtring the data with this function
  const handleTextSearch = (e) => {
    if (e.target.value === "") {
      setData(filterdata);
    } else {
      const filterresult = filterdata.filter(
        (jobs) =>
          jobs.title.toLowerCase().includes(e.target.value) ||
          jobs.team.toLowerCase().includes(e.target.value)
      );
      setData(filterresult);
    }

    setFilterVal(e.target.value);
  };

 

  return (
    <>
      <Container className="dashboard">
        <TextField
          className="search"
          id="standard-search"
          label="Search field"
          type="search"
          value={filterval}
          variant="standard"
          onChange={handleTextSearch}
        />
        <Button
          className="addjobbut"
          size="large"
          onClick={() => {
            console.log("im working");
            navigate("/adminjobform");
          }}
        >
          <AddCircleOutlineIcon
            style={{ color: "#3e9ede", paddingRight: "5px" }}
          />
          Add A Job
        </Button>
        <Button
          className="addjobbut"
          size="large"
          onClick={() => {
            navigate("/userinfo");
          }}
        >
          <ContactPageIcon style={{ color: "#3e9ede", paddingRight: "5px" }} />
          Consult The Applications
        </Button>
        <Jobs data={ currentjobs } loading={ loading } onDelete={ onDelete } />
        <Pagination
          jobPerPage={jobPerPage}
          totalJobs={data.length}
          paginate={paginate}
        />
      </Container>
    </>
  );
}
