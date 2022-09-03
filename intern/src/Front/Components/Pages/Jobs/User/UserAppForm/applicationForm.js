import React, { useState } from "react";
import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import { Button } from "@mui/material";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import "./applicationForm.css";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import Looks4RoundedIcon from "@mui/icons-material/Looks4Rounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import FileList from "../fileupload/FileList";
import FileUpload from "../fileupload/FileUpload";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Looks5Icon from "@mui/icons-material/Looks5";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import UserNavBar from "../../../../Navbar/UserNavbar";
//import "./ValidationInfo";
import axios from "axios";

const AppForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [letter, setLetter] = useState("");

  const [files, setFiles] = useState([]);

  const [fields, setFields] = useState([
    {
      school: "",
      degree: "",
      major: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      employer: "",
      jobtitle: "",
      startmonth: "",
      startyear: "",
      endmonth: "",
      endyear: "",
    },
  ]);
  const [snackbaropen, setSnackBarOpen] = useState(false);
  const [errors, setErrors] = useState({});

  //infos validation
  function validateInfo() {
    let errors = {};

    if (name.trim() == "") {
      errors.name = "Full name required";
    }

    if (email == "") {
      errors.email = "Email required";
      console.log(errors.email);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (phone == "") {
      errors.phone = "Phone is required";
    }
  
    if (adress == "") {
      errors.adress = "Adress is required";
    }
    if (city == "") {
      errors.city = "City is required";
    }
    if (fields == [""]) {
      errors.fields = "School is required";
    }
    /*if (fields[0].major == "") {
      errors.fields[0].major = "Major is required";
    }
    if (fields[0].degree =="") {
      errors.fields[0].degree = "Degree is required";
    }
    if (experience[0].employer =="") {
      errors.experience[0].employer = "Employer is required";
    }
    if (experience[0].jobtitle == "")  {
      errors.experience[0].jobtitle = "Job Title is required";
    }
    if (experience[0].startmonth =="") {
      errors.experience[0].startmonth = "Start Month is required";
    }
    if (experience[0].startyear  =="") {
      errors.experience[0].startyear = "Start Year is required";
    }
    if (experience[0].endmonth == "") {
      errors.experience[0].endmonth = "End Month is required";
    }
    if (experience[0].endyear == "") {
      errors.experience[0].endyear = "End Year is required";
    } */
    return errors;
  }

  //formchange
  const handleFormChangeFields = (e, index) => {
    const { name, value } = e.target;
    const list = [...fields];
    list[index][name] = value;
    setFields(list);
  };

  const handleFormChangeExperience = (event, index) => {
    const { name, value } = event.target;
    const list = [...experience];
    list[index][name] = value;
    setExperience(list);
  };

  function handleSubmit(event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    setErrors(validateInfo());
    axios
      .post("http://localhost:5000/api/userform/adduserform", {
        fullname: name,
        email: email,
        phone: phone,
        adress: adress,
        state: state,
        city: city,
        fields: fields,
        experience: experience,
        coverletter: letter,
      })
      .then((res) => {
        setSnackBarOpen(true);
        window.localStorage.setItem("userform", JSON.stringify(res.data));
        console.log("you  added successfully your infos", res.data);
      })
      .catch((errors) => {
        console.log("something went wrong", errors);
      });
    setName("");
    setEmail("");
    setAdress("");
    setCity("");
    setState("");
    setFields([
      {
        school: "",
        degree: "",
        major: "",
      },
    ]);
    setExperience([
      {
        employer: "",
        jobtitle: "",
        startmonth: "",
        startyear: "",
        endmonth: "",
        endyear: "",
      },
    ]);
    setLetter("");
    setPhone("");

    console.log(email, phone, adress, state, city, fields, experience);
  }

  //adding another section in the higher education

  const addFields = () => {
    let object = {
      school: "",
      major: "",
      degree: "",
    };

    setFields([...fields, object]);
  };

  const addExperience = () => {
    let object = {
      employer: "",
      jobtitle: "",
      month: "",
      year: "",
    };

    setExperience([...experience, object]);
  };
  // remove the section

  const removeFields = (index) => {
    let data = [...fields];
    data.splice(index, 1);
    setFields(data);
  };

  const removeExperience = (index) => {
    let data = [...experience];
    data.splice(index, 1);
    setExperience(data);
  };

  const handleClick = () => {
    setSnackBarOpen(true);
  };

  const SnackBarClose = () => {
    setSnackBarOpen(false);
  };

  //to remove the file
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  return (
    <div>
      <UserNavBar />
      <form /*onSubmit={handleSubmit}*/>
        <h1 className="appform">Welcome, User</h1>
        <p className="parag">
          {" "}
          <h4 className="titleappform">
            {" "}
            <LooksOneRoundedIcon /> Resume{" "}
          </h4>
          <div>
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </div>
          <FileUpload
            files={files}
            setFiles={setFiles}
            removeFile={removeFile}
          />
          <p style={{ fontSize: "16px" }}> * Only PDF File Is Required *</p>
          <FileList files={files} removeFile={removeFile} />
        </p>
        <div className="second">
          <h4 className="contact">
            {" "}
            <LooksTwoRoundedIcon /> Contact details{" "}
          </h4>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            columnGap={3}
            rowGap={1}
          >
            <Grid xs={12} sm={6} item>
              <TextField
                type="text"
                placeholder="Enter your full name"
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  marginTop: "30px",
                  width: "300px",
                  marginLeft: "20px",
                }}
              />
              {errors.name && <p className="error-style">{errors.name}</p>}
            </Grid>
            <Grid xs={12} sm={5} item>
              <TextField
                type="email"
                placeholder="Enter your email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                style={{
                  marginTop: "30px",
                  marginRight: "40px",
                }}
              />
              {errors.email && <p className="error-style">{errors.email}</p>}
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LocalPhoneRoundedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5, marginBottom:"15px" }}
              />
              <TextField
                type="text"
                placeholder="Enter your phone number"
                label="Phone"
                variant="outlined"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  marginTop: "30px",
                   width: "625px",
                  marginRight: "20px",
                }}
              ></TextField>
            </Box>
            {errors.phone && <p className="error-style">{errors.phone}</p>}

          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeRoundedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5,marginBottom:"15px" }}
              />
              <TextField
                type="text"
                placeholder="Enter your adress"
                label="Adress"
                variant="outlined"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                fullWidth
                required
                style={{
                  marginTop: "30px",
                  marginRight: "40px",
                }}
              />
            </Box>
            {errors.adress && <p className="error-style">{errors.adress}</p>}
          </Grid>
          <Grid xs={12} sm={6} item>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ApartmentRoundedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5, marginBottom:"15px" }}
              />
              <TextField
                type="text"
                placeholder="Enter your state"
                label="State"
                variant="outlined"
                value={state}
                onChange={(e) => setState(e.target.value)}
                fullWidth
                style={{
                  marginTop: "30px",
                  marginRight: "40px",
                }}
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LocationCityRoundedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5, marginBottom:"35px" }}
              />
              <TextField
                type="text"
                placeholder="Enter your city"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                required
                style={{
                  marginTop: "30px",
                  marginRight: "40px",
                  marginBottom:"20px"
                }}
              />
            </Box>
            {errors.city && <p className="error-style">{errors.city}</p>}
          </Grid>
        </div>
        <div className="third">
          <h4 className="contact">
            {" "}
            <Looks3RoundedIcon /> Higher Education{" "}
          </h4>
          <div>
            {fields.map((items, index) => (
              <div key={index}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={2}
                  columnGap={2}
                  rowGap={1}
                >
                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <ImportContactsRoundedIcon
                        sx={{ color: "action.active", mr: 2, my: 2.5 }}
                      />
                      <TextField
                        name="school"
                        type="text"
                        placeholder="Enter your school"
                        label="School"
                        variant="outlined"
                        value={items.school}
                        onChange={(event) =>
                          handleFormChangeFields(event, index)
                        }
                        required
                        fullWidth
                        style={{
                          marginTop: "30px",
                          marginRight: "40px",
                        }}
                      />
                      {errors.fields && (
                      <p className="error-style">{errors.fields}</p>
                      )}
                    </Box>
                  </Grid>

                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <ImportContactsRoundedIcon
                        sx={{ color: "action.active", mr: 2, my: 2.5 }}
                      />
                      <TextField
                        name="degree"
                        type="text"
                        placeholder="Enter your degree"
                        label="Degree"
                        variant="outlined"
                        value={items.degree}
                        onChange={(event) =>
                          handleFormChangeFields(event, index)
                        }
                        required
                        fullWidth
                        style={{
                          marginTop: "30px",
                          marginRight: "40px",
                        }}
                      />
                    </Box>
                    {/*errors.fields[0].degree && (
                      <p className="error-style">{errors.fields[0].degree}</p>
                    )*/}
                  </Grid>

                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <ImportContactsRoundedIcon
                        sx={{ color: "action.active", mr: 2, my: 7.5 }}
                      />
                      <TextField
                        name="major"
                        type="text"
                        placeholder="Enter your area of study"
                        label="Major"
                        variant="outlined"
                        value={items.major}
                        onChange={(event) =>
                          handleFormChangeFields(event, index)
                        }
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginRight: "40px",
                          marginBottom: "50px",
                        }}
                      />
                    </Box>
                    {/*errors.fields[0].major && (
                      <p className="error-style">{errors.fields[0].major}</p>
                    )*/}
                  </Grid>
                  {fields.length - 1 === index && fields.length < 6 && (
                    <Button
                      variant="text"
                      style={{
                        borderColor: "#091e3f",
                        float: "left",
                        paddingBottom: "30px",
                        paddingLeft: "40px",
                        marginLeft: "30px",
                      }}
                      onClick={addFields}
                    >
                      {" "}
                      <AddIcon></AddIcon>
                      Add another degree
                    </Button>
                  )}

                  {fields.length > 1 && fields.length - 1 === index && (
                    <Button
                      variant="text"
                      style={{
                        borderColor: "#091e3f",
                        float: "left",
                        paddingBottom: "30px",
                        marginRight: "20px",
                        paddingLeft: "40px",
                        marginLeft: "30px",
                      }}
                      onClick={() => removeFields(index)}
                    >
                      <RemoveCircleOutlineIcon />
                      Remove new degree
                    </Button>
                  )}
                </Grid>
              </div>
            ))}
          </div>
        </div>

        <div className="fifth">
          <h4 className="contact">
            <Looks4RoundedIcon /> Work Experience{" "}
          </h4>
          <h5
            style={{
              float: "left",
              marginLeft: "20px",
              paddingBottom: "20px",
            }}
          >
            {" "}
            Do you have any work experience
          </h5>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ marginTop: "40px" }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <div>
            {experience.map((item, index) => (
              <div key={index}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={2}
                  columnGap={2}
                  rowGap={1}
                >
                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <TextField
                        name="employer"
                        type="text"
                        placeholder="Enter your Employer Name"
                        label="Employer Name"
                        variant="outlined"
                        required
                        value={item.employer}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        fullWidth
                        style={{
                          marginTop: "30px",
                          marginRight: "40px",
                          marginBottom: "5px",
                          marginLeft: "20px",
                        }}
                      />
                    </Box>
                    {/*errors.experience[0].employer && (
                      <p className="error-style">
                        {errors.experience[0].employer}
                      </p>
                    )*/}
                  </Grid>

                  <Grid xs={12} item>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <TextField
                        name="jobtitle"
                        type="text"
                        placeholder="Enter your job title"
                        label="Job title"
                        variant="outlined"
                        value={item.jobtitle}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        required
                        fullWidth
                        style={{
                          marginTop: "30px",
                          marginRight: "40px",
                          marginBottom: "20px",
                          marginLeft: "20px",
                        }}
                      />
                    </Box>
                    {/*errors.experience[0].jobtitle && (
                      <p className="error-style">
                        {errors.experience[0].jobtitle}
                      </p>
                    )*/}
                  </Grid>

                  <p style={{ textAlign: "left", marginLeft: "20px" }}>
                    {" "}
                    Start Date:
                  </p>

                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    columnGap={2}
                    rowGap={1}
                  >
                    <Grid xs={12} sm={5} item>
                      <TextField
                        name="startmonth"
                        type="date"
                        label="Start Month"
                        variant="outlined"
                        value={item.startmonth}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        required
                        style={{
                          marginTop: "10px",
                          width: "300px",
                          float: "left",
                          marginLeft: "50px",
                          PaddingRight: "50px",
                          color:"transparent",
                          
                        }}
                      />
                      {/*errors.experience[0].startmonth && (
                        <p className="error-style">
                          {errors.experience[0].startmonth}
                        </p>
                      )*/}
                    </Grid>

                    <Grid xs={12} sm={4} item>
                      <TextField
                        name="startyear"
                        type="date"
                        label="Start Year"
                        variant="outlined"
                        value={item.startyear}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        required
                        style={{
                          width: "300px",
                          marginLeft: "50px",

                          marginTop: "10px",
                        }}
                      />
                      {/*errors.experience[0].startyear && (
                        <p className="error-style">
                          {errors.experience[0].startyear}
                        </p>
                      )*/}
                    </Grid>
                  </Grid>

                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: "20px",
                      marginTop: "20px",
                    }}
                  >
                    {" "}
                    End Date:
                  </p>
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    columnGap={2}
                    rowGap={1}
                  >
                    <Grid xs={12} sm={5} item>
                      <TextField
                        name="endmonth"
                        type="date"
                        label="End Month"
                        variant="outlined"
                        value={item.endmonth}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        required
                        style={{
                          marginTop: "10px",
                          width: "300px",
                          marginLeft: "50px",
                          float: "left",
                        }}
                      />
                      {/*errors.experience[0].endmonth && (
                        <p className="error-style">
                          {errors.experience[0].endmonth}
                        </p>
                      )*/}
                    </Grid>

                    <Grid xs={12} sm={5} item>
                      <TextField
                        name="endyear"
                        type="date"
                        label="End Year"
                        variant="outlined"
                        value={item.endyear}
                        onChange={(event) =>
                          handleFormChangeExperience(event, index)
                        }
                        required
                        style={{
                          marginTop: "10px",
                          width: "300px",
                          marginRight: "40px",
                          marginLeft: "50px",
                          marginBottom: "50px",
                        }}
                      />
                      {/*errors.experience[0].endyear && (
                        <p className="error-style">
                          {errors.experience[0].endyear}
                        </p>
                      )*/}
                    </Grid>
                  </Grid>
                  {experience.length - 1 === index && experience.length < 6 && (
                    <Button
                      variant="text"
                      style={{
                        borderColor: "#091e3f",
                        float: "left",
                        paddingBottom: "30px",
                        paddingLeft: "20px",
                        marginLeft: "30px",
                      }}
                      onClick={addExperience}
                    >
                      {" "}
                      <AddIcon></AddIcon>
                      Add another experience
                    </Button>
                  )}

                  {experience.length > 1 && experience.length - 1 === index && (
                    <Button
                      variant="text"
                      style={{
                        borderColor: "#091e3f",
                        float: "left",
                        paddingBottom: "30px",
                        paddingLeft: "20px",
                        marginLeft: "30px",
                      }}
                      disabled={experience.length === 1}
                      onClick={() => removeExperience(index)}
                    >
                      <RemoveCircleOutlineIcon />
                      Remove the new experience
                    </Button>
                  )}
                </Grid>
              </div>
            ))}
          </div>
        </div>

        <div className="forth">
          <h4 className="contact">
            {" "}
            <Looks5Icon /> Cover letter{" "}
          </h4>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            columnGap={3}
            rowGap={1}
          >
            <Grid xs={12} sm={6} item>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Write your cover letter"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                style={{ width: 600, marginLeft: "30px", height: "200px" }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="final">
          <Button
            className="btn-save"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
            {
              <Snackbar
                open={snackbaropen}
                autoHideDuration={2700}
                onClose={SnackBarClose}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  You have successfully filled your personal infos
                </Alert>
              </Snackbar>
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppForm;
