import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import  Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

const MsgDialog = () => {
  const [open, setOpen] = useState(false);
  const [snackbaropen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const handleSend = () => {
    axios
      .post("http://localhost:5000/api/message/addmsg", {
        content: content,
      })
      .then((res) => {
        setSnackBarOpen(true);
        window.localStorage.setItem("message", JSON.stringify(res.data));
        setMessage("");
        console.log("you  added successfully sent your message", res.data);
      })
      .catch((errors) => {
        console.log("something went wrong", errors);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to contact us, do not hesitate to send us a message.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Your Message"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>
            <Snackbar
              open={snackbaropen}
              autoHideDuration={2000}
              onClose={SnackBarClose}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                You have successfully sent your message
              </Alert>
            </Snackbar>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MsgDialog;
