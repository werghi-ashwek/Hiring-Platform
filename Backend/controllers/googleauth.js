const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/Userslogin");
const keys = require("../config/keys");

const dotenv = require("dotenv");

const jwt= require("jsonwebtoken");

const client = new OAuth2Client(
  "408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com"
);


const googlelogin = (req, res) => {
  const {tokenId} = req.body;

  //we need to verify the token if it's the same token send from the front side and the one existing in the backend

  client
    .verifyIdToken({
      IdToken: tokenId,
      audience:
        "408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email, email_verified, fullname, _id } = response.payload;
      if (email_verified) {
        User.findOne(email).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "there is a problem here",
            });
          } else {
            if (user) {
              const token = jwt.sign({_id: user._id}, keys.secretOrkey, {
                expiresIn: 5000,
              });
              const{_id,fullname,email} = user;

              res.json({
                token,
                user: {_id, fullname, email}
              })

            } else {
              const newUser = new User({
                //add user to the DB
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
              });
              if (err) {
                return res.status(400).json({
                  error: "there is a problem here",
                });
              } 
                const token = jwt.sign({_id: newUser._id}, keys.secretOrkey, {
                    expiresIn: 5000,
                  });
                  const{_id,fullname,email} = newUser;
    
                  res.json({
                    token,
                    user: {_id, fullname, email}
                  })
            }
          }
        });
      }
    });
};

module.exports = googlelogin;

//implementation of email activation


const forgetpassword = (req,res) =>{

    const {email}  = req.body;

    User.findOne({email}, (err,user) =>{
        if(err || (!user)){
            return res.status(400).json({
                error: "user doesn't exist",
              });
        }

        const token =  jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY,  {
            expiresIn: '30m',
          });
        const data = {
            from: 'ashwek.werghi@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `
            <h2> please click on the link to reset your password </h2>
            <p> ${clien_id= "408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com"}/resetpassword/${token}</p> `
        };

        return user.updateOne({reset_link: token}, (err, success) => {

            if(err){
                return res.status(400).json({
                    error: "An error may seem to happen in the reset link "
                  });
            }



        })





    })
}


const logout = (req,res) => {

    res.cookie('jwt','');//it's going to remove the value of the token
    res.redirect('/home');

}

module.exports = logout