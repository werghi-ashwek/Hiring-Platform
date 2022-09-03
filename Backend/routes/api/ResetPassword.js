const express = require("express");

const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

//forget the password ( the server receives the request)

router.get("/forget-password", (req, res) => {});

router.post("/forget-password", (req, res) => {

    if (req.body.email === ""){
        res.status(400).send("email is required");
    }


    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            return res.status(403).send({message:"user with given email doesn't exist"}) //email is not in the DB
        }
    

    })
  

})


module.exports = router;
