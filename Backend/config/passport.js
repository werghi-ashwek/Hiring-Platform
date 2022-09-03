const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");

const User = mongoose.model('users');

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require('../config/keys');

require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrkey
}


module.exports = passport => {

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
      .then( user => {
        if(user){
            return done(null, user);
        }

        return done(null,false); //if the user is not there

      })
      .catch(err => console.log(err)); //to see if there is any error
    })
  );
}
  

/*module.exports = passport => {
  passport.use(
	new GoogleStrategy( (		{
    clientID: "408180538772-ue5fhb1vehmtbrnredhkr3iesd8k1eu0.apps.googleusercontent.com",
  
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  }),
		(accessToken, refreshToken, profile, callback) => {
			callback(null, profile);
		}
  ))
}
*/