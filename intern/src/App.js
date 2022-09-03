import "./App.css";
import React from "react";
import AdminRouter from "./Routers/AdminRouter";
import UserRouter from "./Routers/UserRouter";
import AdminNavBar from "./Front/Components/Navbar/AdminNavbar";
import { isAuth } from "./Front/Components/Helpers/auth";
import MainRouting from "./Routers/MainRouter";

function App() {
  //const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <div>
        <MainRouting />
    </div>
  );
}

export default App;
