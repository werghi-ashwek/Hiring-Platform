import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../Front/Components/Pages/Login/loginform";
import SignUp from "../Front/Components/Pages/Signin/Signinform";
import Home from "../Front/Components/Pages/Home/Home";
import { Jobs } from "../Front/Components/Pages/Jobs/Jobs";
import AppForm from "../Front/Components/Pages/Jobs/User/UserAppForm/applicationForm";
import AdminJobForm from "../Front/Components/Pages/Jobs/Admin/AdminForm/JobAddForm";
import AdminDataTable from "../Front/Components/Pages/Jobs/Admin/JobList/JobList";
import AdminDashboard from "../Front/Components/Pages/Jobs/Admin/AdminDashboard";
import AdminEditForm from "../Front/Components/Pages/Jobs/Admin/JobList/EditJob";
import AdminNavBar from "../Front/Components/Navbar/AdminNavbar";
import UserList from "../Front/Components/Pages/Jobs/Admin/Userinfos/UserList";
import UserRouter from "./UserRouter";
import {isAuth} from "../Front/Components/Helpers/auth";

const AdminRouter = () => {

  const user = JSON.parse(window.localStorage.getItem("user"));
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/appform" element={<AppForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/AdminJobForm" element={ <AdminJobForm/> } />
        <Route path ="/editformadmin/${id}" element={<AdminEditForm />} />
        <Route path="/userinfo" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
