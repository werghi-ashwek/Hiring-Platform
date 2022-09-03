import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ files, setFiles, removeFile }) => {
  const [selectedfiles, setSelectedFiles] = useState(false);

  const uploadHandler = (event) => {
    document.getElementById("selectfile");
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);

    // upload file
    const formData = new FormData();
    formData.append("newFile", file, file.name);
    axios
      .post("http://localhost:5000/upload", {
        formData,
      })
      .then((result) => {
        file.isUploading = false;
        setFiles([...files, file]);
        console.log(result);
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        removeFile(file.name);
      });
  };

  return (
    <>
      <div className="file-inputs">
          
        <Button variant="contained" component="label" onClick={uploadHandler} >
          <FileUploadIcon/>Upload File
          <input type="file" onChange={uploadHandler} hidden />
        </Button>
      </div>
    </>
  );
};

export default FileUpload;
