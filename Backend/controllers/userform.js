const Job = require("../models/Jobs");
const UserForm = require("../models/Userform");
validateuserformfield = require("../validation/userform");

//adding a user form
const saveform = async (req, res) => {
  const { errors, isValid } = validateuserformfield(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userform = req.body;

  const newUserForm = new UserForm(userform);
  try {
    await newUserForm.save();
    res.status(201).json(newUserForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all the  users forms

const finduserform = (req, res) => {
  UserForm.find({}, function (err, userform) {
    if (err) {
      res.status(400).json({ message: "we can not have the users ' infos" });
      next();
    }
    res.json(userform);
  });
};

// get a single job by id
const findsingleuserform = (req, res, next) => {
  UserForm.findById(req.params._id, function (err, userform) {
    if (err) {
      res.status(400).send("we can't find the user demanded");
      next();
    }
    res.json(userform);
  });
};

module.exports = { finduserform, findsingleuserform, saveform };
