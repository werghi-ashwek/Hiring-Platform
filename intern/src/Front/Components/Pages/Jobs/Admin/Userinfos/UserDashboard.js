import React from "react";

import AdminNavBar from "../../../../Navbar/AdminNavbar";
import UserList from "./UserList";

import "./UserDashboard.css";


export const UserDashboard = () => {
  return (
    <div className="dash2">
        <AdminNavBar />
        <UserList/>
    </div>
  )
}
