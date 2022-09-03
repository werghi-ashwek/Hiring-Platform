const bcrypt = require("bcryptjs");
const express = require("express");

const keys = require("../config/keys");

const passport = require("passport");

const jwt = require("jsonwebtoken");

const User = require("../models/Userslogin");

const validateRegisterInput = require("../validation/register");

const validateLoginInput = require("../validation/login");

//under construction

const userinfos = (req, res) => {
  const user = User.findOne({ email: req.body.email })
    .then((res) => {
      if (user) {
        res.json(user);
      }
    })
    .catch((err) => console.log(err));
};

//signin

const signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //add a validation (done)

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }) //if the email exists
    .then((user) => {
      if (!user) {
        return res.status(404).send({ email: "Email Not Found" });
      }
      bcrypt
        .compare(password, user.password) //check password comparing the hashed one in DB and the typed
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user._id,
              email: user.email,
              isAdmin: user.isAdmin,
            };
            //once the login went with success we have to generate the token with the payload and the secret key 
            jwt.sign(
              payload,
              keys.secretOrkey,
              { expiresIn: 5000 },
              (err, token) => {
                return res.json({
                  success: true,
                  token: /*"Bearer " +*/ token,     
                  user: user, 
                });
              }
            );
          } else {
            return res.status(400).send({ password: "password incorrect" });
          }
        })
        .catch((err) => console.log(err));
    });
};

//signup

const signup = (req, res) => {
  /*we should check if the email adress is already in our DB
        if true so we send a message the user exists else we're going 
        to add that user*/
  const email = req.body.email;

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).send("email already exists try to login"); //user exists already
      } else {
        const newUser = new User({
          //add user to the DB
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password,
        });

        //we need to hash the password now so we're going to use
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            if (newUser) {
              const payload = {
                id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                isAdmin: newUser.isAdmin,
              };
              //once the sign up went with success
              jwt.sign(
                payload,
                keys.secretOrkey,
                { expiresIn: 5000 },
                (err, token) => {
                  return res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
};

//permission to access to the admin routes
//the admin should be loggedin at first place and second should have the isadmin property

/*const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("access denied. You're not authenticated");
  }
  try{
    const secretOrkey = keys.secretOrkey ;
    const user = jwt.verify(token, secretOrkey)
    req.user = user
    next()
  }catch(err){
      return res.status(400).send("Access denied. invalid auth token")
  }
}

const isadmin = (req,res,next) => {
   auth(req,res, () => {
    if(req.user.isAdmin){
      next()
    }
    else{
      return res.status(403).send("Access denied. not authorized")

    }
   })
}*/

module.exports = { signin, signup, userinfos };
