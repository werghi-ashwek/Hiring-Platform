import axios from "axios";
import React from "react";
import FileItem from "./FileItem";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (name) => {
    axios
      .delete(`http://localhost:5000/upload?name=${name}`)
      .then(() => removeFile(name))
      .catch((err) => console.error(err));
  };
  return (
    <div>
    <ul>
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
    </div>
  );
};

export default FileList;
