import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "./JobList/JobList";
import "./AdminDashboard.css";
import AdminNavBar from "../../../Navbar/AdminNavbar";

const AdminDashboard = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <div className="dash">
      <AdminNavBar />
      <h1 className="adminform">Welcome, {user.fullname} </h1>
      <AdminTable></AdminTable>
    </div>
  );
};

export default AdminDashboard;
