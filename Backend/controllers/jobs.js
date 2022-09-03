const Job = require("../models/Jobs");
const createError = require("http-errors");
const mongoose = require("mongoose");
validatejobfield = require("../validation/jobs");

//adding a job
const addjob =  async (req, res) => {
  const { errors, isValid } = validatejobfield(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const job = req.body;

  const newJob = new Job(job);
  try {
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//get all the jobs

const findjob =  (req, res) => {
  Job.find({}, function (err, jobs) {

    if (err) {
      res.status(400).json({ message: "we can not have the jobs list" });
      next();
    }
    
    res.json(jobs);
  });
};

/*const getAllJobs = async (req, res) => {
  try {
    let query = Job.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};*/

// get a single job by id
const findsinglejob = (req, res, next) => {
  Job.findById(req.params._id, function (err, job) {
    if (err) {
      res.status(400).send("we can't the job demanded");
      next();
    }
    res.json(job);
  });
};

//updating a job

const editjob = async (req, res,next) => {
  try {
    const id = req.params._id;
    const updates = req.body;
    const options = { new: true };

    const result = await Job.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, "Job does not exist");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Job Id"));
    }

    next(error);
  }
};

//delete a job

const deletejob = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const result = await Job.findByIdAndDelete(_id);
    if (!result) {
      throw createError(404, "Job does not exist.");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Job id"));
      return;
    }
    next(error);
  }
};

module.exports = {findjob,findsinglejob, addjob, editjob, deletejob };
