import React from "react";
import RecipeReviewCard from "./cards";
import { Box, Container, Grid } from "@mui/material";
import cog from "../../../../Assets/images/cognira-logo-white.svg";
import UserNavBar from "../../Navbar/UserNavbar";

import "./Jobs.css";

export const Jobs = () => {
  return (
    <div className="jobanim">
      <UserNavBar />
      <h2 className="jobstitle"> Jobs</h2>
      <Container className="card-styling">
        <RecipeReviewCard />
      </Container>
    </div>
  );
};
