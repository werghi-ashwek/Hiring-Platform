import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import footer from "../../../../Assets/images/footer-logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from '@mui/material/Link';

import InstagramIcon from "@mui/icons-material/Instagram";
import "./Footer.css";

const Footer = () => {
  const [value, setValue] = React.useState("Facebook");
  const ref = React.useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pb: 0 }} ref={ref}>
      <BottomNavigation
        className="bottom-navigation"
        value={value}
        onChange={handleChange}
      >
        <div className="logo-right">
          <img src={footer} className="cog-logo-footer" />
          <h1 className="copyright">
            &copy; {new Date().getFullYear()} Cognira. All Rights Reserved.
          </h1>
        </div>

        <div>
          <h2 className="about-footer">About</h2>
          <p className="parag-footer">
            Founded by experienced data scientists and retail experts, 
            <br/> Cognira is the leading artificial intelligence solutions provider.
          </p>
        </div>

        <div
          style={{
            width: "200px",
            marginTop:"20px",
            marginRight: "10px",
            paddingLeft:"30px",
          }}
        > 
         <h2 className="social-footer"> Social Media</h2>
          <BottomNavigationAction
            value="Facebook"
            label="Facebook"
            icon={<FacebookIcon style={{ color: "white" }}></FacebookIcon>}
          >
            {" "}
          </BottomNavigationAction>
          <BottomNavigationAction
            label="LinkedIn"
            value="LinkedIn"
            icon={<LinkedInIcon style={{ color: "white" }} />}
          />
          <BottomNavigationAction
            label="Youtube"
            value="Youtube"
            icon={<YouTubeIcon style={{ color: "white" }} />}
          />
          <BottomNavigationAction
            label="Instagram"
            value="Instagram"
            icon={<InstagramIcon style={{ color: "white" }} />}
          />
        </div>
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
