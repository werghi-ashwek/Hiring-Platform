import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";

import "./JobList.css";

const Jobs = ({ data, loading, onDelete }) => {
  const [snackbaropen, setSnackBarOpen] = useState(false);

  const navigate = useNavigate();

  const SnackBarClose = () => {
    setSnackBarOpen(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const ConvertTime = (time) => {
    return new Date(time).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          width: "1100px",
          marginTop: "30px",
          marginLeft: "30px",
          marginRight: "20px",
          marginBottom: "50px",
          boxShadow: "5px 10px #f5f4f5",
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-label="caption table">
          <TableHead className="tablehead">
            <TableRow>
              <TableCell align="center">| Title</TableCell>
              <TableCell align="center">| Team</TableCell>
              <TableCell align="center">| Publisher</TableCell>
              <TableCell align="center">| Description</TableCell>
              <TableCell align="center">| Salary</TableCell>
              <TableCell align="center">| Skill</TableCell>
              <TableCell align="center" width="100px">| Date</TableCell>
              <TableCell align="center">| Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((element) => (
              <TableRow key={element._id}>
                <TableCell align="center">{element.title}</TableCell>
                <TableCell align="center">{element.team}</TableCell>
                <TableCell align="center">{element.publisher}</TableCell>
                <TableCell align="center">{element.description}</TableCell>
                <TableCell align="center">{element.salary}</TableCell>
                <TableCell align="center">{element.skill}</TableCell>
                <TableCell align="center">
                  {ConvertTime(element.date)}
                </TableCell>
                <TableCell align="center" style={{ display: "flex", paddingLeft:"30px" }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    style={{
                      color: "red",
                    }}
                    onClick={() => onDelete(element._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Snackbar
                    open={snackbaropen}
                    autoHideDuration={2100}
                    onClose={SnackBarClose}
                  >
                    <Alert severity="success" sx={{ width: "100%" }}>
                      You have successfully deleted {element.title}
                    </Alert>
                  </Snackbar>

                  <IconButton
                    aria-label="edit"
                    size="large"
                    style={{
                      color: "#fda500",
                    }}
                    onClick={() => {
                      navigate(`/editformadmin/${element._id}`);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Jobs;
