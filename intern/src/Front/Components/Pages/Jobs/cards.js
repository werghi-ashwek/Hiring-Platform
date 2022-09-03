import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import card from "../../../../Assets/images/card.jpg";
import CallMadeIcon from "@mui/icons-material/CallMade";
import "./cards.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(index) {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState([]);

  const getJobs = () => {
    axios
      .get("http://localhost:5000/api/jobs/getall")
      .then((res) => {
        setData(res.data);
        console.log("you the actual jobs are :", res.data);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };
  useEffect(() => {
    getJobs();
  }, []);
   
  const ConvertTime = (time) => {
    return new Date(time).toLocaleDateString('en-us', {
      year:"numeric",
      month:"long",
      day:"numeric"
    })
  }

  return (
    <Container>
      <Grid container spacing={3} columnSpacing={3} columnGap={17} rowGap={5} rowSpacing={3}>
        {data?.map((elt) => (
          <Grid item key={elt._id} xs={12} md={6} lg={3} className="grid-style">
            <Card variant="outlined" className="card-style">
              <CardHeader
                className="title-team2"
                avatar={
                  <Avatar sx={{ bgcolor: "#091e3f" }} aria-label="admin">
                    A
                  </Avatar>
                }
                title={elt.publisher}
                subheader={ConvertTime(elt.date)}
                action ={
                  <Button
                  variant="text"
                  href="appform"
                  size="medium"
                  className="apply-card-button"
                >
                  {" "}
                  Apply Now
                </Button>

                }
              />
             
              <CardContent style={{ fontSize: "16px" }}>
                <Typography className="" variant="body2" color="#091e3f">
                  <Typography className="title-job">{elt.title}</Typography>
                </Typography>

                <Typography
                  variant="body2"
                  color="#091e3f"
                  className="title-job"
                >
                  <Typography
                    variant="body2"
                    color="#091e3f"
                    className="title-team"
                  >
                    {elt.team} Team
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions disableSpacing style={{ flexDirection: "column" }}>
                <Accordion className="accordion-card">
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon style={{ color: "#091e3f" }}>
                        {" "}
                      </ExpandMoreIcon>
                    }
                    aria-controls="panel1a-content"
                    id={elt._id}
                  > Learn More </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph className="typography">
                      <p className="title-team2"> Description: </p>{" "}
                      <p className="content"> {elt.description} </p>
                    </Typography>
                    <Typography paragraph className="typography">
                      <p className="title-team2"> Salary: </p>{" "}
                      <p className="content"> {elt.salary} </p>
                    </Typography>
                    <Typography className="typography">
                      <p className="title-team2"> Required skills: </p>{" "}
                      <p className="content"> {elt.skill} </p>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
