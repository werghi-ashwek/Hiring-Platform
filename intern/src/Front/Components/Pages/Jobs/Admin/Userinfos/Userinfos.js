import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Userpopup from "./Userpopup";
import Container from "@mui/material/Container";

import "./Userinfos.css";

const UserAdminInfos = ({ data, loading }) => {


  if (loading) {
    return <h2>Loading...</h2>;
  }

 

  return (
    <div>
      <Container>
        <TableContainer component={Paper} className="user-table-container">
          <Table sx={{ minWidth: 750 }} aria-label="caption table">
            <TableHead className="tablehead">
              <TableRow>
                <TableCell align="center">| Fullname </TableCell>
                <TableCell align="center">| Email </TableCell>
                <TableCell align="center">| Phone </TableCell>
                <TableCell align="center">| Adress </TableCell>
                <TableCell align="center">| Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((element) => (
                <TableRow key={element._id}>
                  <TableCell align="center">{element.fullname}</TableCell>
                  <TableCell align="center">{element.email}</TableCell>
                  <TableCell align="center">{element.phone}</TableCell>
                  <TableCell align="center">{element.adress}</TableCell>{" "}
                  <TableCell align="center"> {<Userpopup />} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default UserAdminInfos;
