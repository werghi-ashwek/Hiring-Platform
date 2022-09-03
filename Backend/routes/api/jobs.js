
const express = require("express");
const {isadmin}= require("../../controllers/admin");
const router = express.Router();
const {findjob, findsinglejob, addjob, editjob, deletejob} = require('../../controllers/jobs');
const {auth} = require('../../controllers/auth')

//find all the published jobs
router.get("/getall", findjob);

//add a job
router.post("/add",  addjob);
//find a single job

router.get("/getone/:_id", findsinglejob);

//update a job

router.put("/editjob/:_id",  editjob);
//delete a job

router.delete("/deletejob/:id",  deletejob);

module.exports = router;