const express = require("express");
const {auth} = require('../../controllers/auth');
const {isadmin}= require("../../controllers/admin");
const router = express.Router();

const {finduserform, findsingleuserform, saveform} = require('../../controllers/userform');

//find all the users forms
router.get("/getalluserform", finduserform);

//add a userform
router.post("/adduserform", saveform);

//find a single userform
router.get("/getoneuserform/:_id", findsingleuserform);

module.exports=router;