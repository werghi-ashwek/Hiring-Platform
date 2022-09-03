import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../Front/Components/Pages/Login/loginform";
import SignUp from "../Front/Components/Pages/Signin/Signinform";
import Home from "../Front/Components/Pages/Home/Home";
import { Jobs } from "../Front/Components/Pages/Jobs/Jobs";


const user = JSON.parse(window.localStorage.getItem("user"));

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
