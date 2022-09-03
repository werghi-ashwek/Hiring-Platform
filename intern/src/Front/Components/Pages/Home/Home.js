import React, {useState} from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./Home.css" 
import { color } from "@mui/system";
import UserNavBar from "../../Navbar/UserNavbar";
import CustomizedSteppers from "./Stepper";
import  Footer  from "../Footer/Footer";


const Home = () => {

  return (
    <div>
      <UserNavBar/>
    <div className="home">
      <div>
        <h2 className="hometitle"
        >
          {" "}
          Finding, Connecting,   <br/> Building Success
        </h2>

      </div>
      <div>
        <h5 className="homesubtitle"
          
        >
          {" "}
          Are You The One <SearchRoundedIcon />
        </h5>
      </div>
      <div>
        
        <p className="homeparag">
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. 
          Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. <br></br>
          It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div className="btn">
        </div>
      </div>
    </div>
    <div className="homesection2">
      <h1 className="section2title"> Steps To Apply</h1>
      <p className="section2parag"> Follow these steps to get the job that matches your qualifications</p>
      <div className="stepper">
      <CustomizedSteppers/>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
