const Message = require("../models/Message");
const createError = require("http-errors");
const mongoose = require("mongoose");


//posting a message
const msgposting =  async (req, res) => {
    
    const msg = req.body;
  
    const newMsg = new Message(msg);
    try {
      await newMsg.save();
      res.status(201).json(newMsg);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  //get all the messages
  
  const getmsg =  (req, res, next) => {
    Message.find({}, function (err, msg) {
  
      if (err) {
        res.status(400).json({ message: "we can not have the message list" });
        next();
      }
      
      res.json(msg);
    });
  };


  //delete a job

const deletemsg = async (req, res, next) => {
    const _id = req.params.id;
    try {
      const result = await Message.findByIdAndDelete(_id);
      if (!result) {
        throw createError(404, "Message does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Message id"));
        return;
      }
      next(error);
    }
  };
  
  module.exports = {getmsg, msgposting, deletemsg };
  