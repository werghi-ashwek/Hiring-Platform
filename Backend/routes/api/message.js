const express = require("express");
const router = express.Router();
const {getmsg, msgposting, deletemsg} = require('../../controllers/message');

//find all the published messages
router.get("/getallmsg", getmsg);

//add a message
router.post("/addmsg",  msgposting);

//delete a message

router.delete("/deletejob/:id",  deletemsg);

module.exports = router;