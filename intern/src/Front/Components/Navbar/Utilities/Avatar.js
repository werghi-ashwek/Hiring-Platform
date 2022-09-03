import React, { useContext, useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import DraftsIcon from "@mui/icons-material/Drafts";
import Fade from "@mui/material/Fade";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userprovider";

import MsgDialog from "./MsgDialog";

const  AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*logout function */
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const navigatetologout = () => {
    window.localStorage.removeItem("user");
    usercontext.setAuth({});
    navigate("/login");
  };

  const navigatetodialog = () => {
    navigate(<MsgDialog/>)
  }

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{marginRight:"100px" , width:"50px"}}
      >
        <Avatar fontSize="small"/>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={<MsgDialog/>}>
          {" "}
          <DraftsIcon fontSize="small" />
          Message
        </MenuItem>
        <MenuItem onClick={navigatetologout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}


export default AvatarMenu;
