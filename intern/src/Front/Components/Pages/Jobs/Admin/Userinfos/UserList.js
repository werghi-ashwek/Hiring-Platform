import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Pagination from "./UserPagination";
import UserAdminInfos from "./Userinfos";
import axios from "axios";
import "./Userinfos.css";

export default function UserList() {
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [filterval, setFilterVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [UserPerPage] = useState(5);

  //Get User Infos
  const getUserInfos = async () => {
    setLoading(true);
    const res = await axios.get(
      "http://localhost:5000/api/userform/getalluserform"
    );
    setData(res.data);
    setLoading(false);
    console.log("tha actual data are :", res.data);
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  // Get current jobs
  const indexOfLastUser = currentPage * UserPerPage;
  const indexOfFirstUser = indexOfLastUser - UserPerPage;
  const currentjobs = data.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   //filtring the data with this function
   const handleTextSearch = (e) => {
    if (e.target.value === "") {
      setData(filterdata);
    } else {
      const filterresult = filterdata.filter(
        (jobs) =>
          jobs.title.toLowerCase().includes(e.target.value) ||
          jobs.team.toLowerCase().includes(e.target.value)
      );
      setData(filterresult);
    }

    setFilterVal(e.target.value);
  };

  return (
  
    <div className="dashboard2" >
        {/*<TextField
          className="search"
          id="standard-search"
          label="Search field"
          type="search"
          value={filterval}
          variant="standard"
          onChange={handleTextSearch}
  />*/}
        <UserAdminInfos data={currentjobs} loading={loading} />
        <Pagination
          UserPerPage={UserPerPage}
          totalUsers={data.length}
          paginate={paginate}
        />
    </div>
  );
}
