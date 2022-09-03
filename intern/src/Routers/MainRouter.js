import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import LoginForm from "../Front/Components/Pages/Login/loginform";
import SignUp from "../Front/Components/Pages/Signin/Signinform";
import Home from "../Front/Components/Pages/Home/Home";
import { Jobs } from "../Front/Components/Pages/Jobs/Jobs";
import AppForm from "../Front/Components/Pages/Jobs/User/UserAppForm/applicationForm";
import AdminJobForm from "../Front/Components/Pages/Jobs/Admin/AdminForm/JobAddForm";
import AdminDataTable from "../Front/Components/Pages/Jobs/Admin/JobList/JobList";
import AdminDashboard from "../Front/Components/Pages/Jobs/Admin/AdminDashboard";
import AdminEditForm from "../Front/Components/Pages/Jobs/Admin/JobList/EditJob";
import AdminUserTable from "../Front/Components/Pages/Jobs/Admin/Userinfos/Userinfos";
import { isAuth } from "../Front/Components/Helpers/auth";
import UserList from "../Front/Components/Pages/Jobs/Admin/Userinfos/UserList";
import { UserDashboard } from "../Front/Components/Pages/Jobs/Admin/Userinfos/UserDashboard";

function MainRouting() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  return (
    <div>
      <Routes>
        {/* these are public routes */}

        <Route element={<LoginForm />} path="/login" />
        <Route path="/" element={<LoginForm />} />
        <Route element={<SignUp />} path="/signup" />

        {/* we want to protect these routes  ONLY AN ADMIN CAN HAVE AN ACCESS*/}

        <Route path="/appform"  element={<AppForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />}  />
        <Route path="/AdminJobForm" element={<AdminJobForm />}  />
        <Route path="/editformadmin/:id" element={<AdminEditForm />}  />
        <Route path="/userinfo" element={ <UserDashboard/> }  />

        <Route path="/home" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </div>
  );
}

export default MainRouting;
