const express = require("express");

const router = express.Router();

const googlelogin = require("../../controllers/googleauth");

const {signin, signup, userinfos} = require("../../controllers/userauth");


router.get("/get", (req, res) => res.send("users are working here"));

//signin post request
router.post("/signin", signin);

//signup post request
router.post("/signup", signup);

//handle googlelogin

router.post('/googlelogin', googlelogin);

//users information
 router.get('/userinfo', userinfos);


module.exports = router;
