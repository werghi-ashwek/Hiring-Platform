import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadingIcon from '@mui/icons-material/Downloading';
import  './FileItem.css'


const FileItem = ({ file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p className="file-name">{file.name}</p>
                <div className="actions">
                    <div className="loading"></div>
                    {file.isUploading && <DownloadingIcon
                        onClick={() => deleteFile(file.name)} />
                    }
                    {!file.isUploading &&
                        <DeleteForeverIcon
                            onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>
        </>
    )
}

export default FileItem
