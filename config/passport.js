const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      callbackURL: "/api/googleauthCallback"
    },
    async (accessToken, refreshToken, profile, done) => {
          try {
              let user = await User.findOne({ email: profile.emails[0].value });

              if (!user) {
                user = await User.create({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  provider:"google",
                  role: "client"
                });
              }
                const data = {
                  userInfo:user
                }

              // ✅ Generate JWT
              const token = jwt.sign(
                 data,
                 JWT_SECRET,
                { expiresIn: "24h" }
              );

              // pass token instead of session user
              return done(null, {user,token});

          }catch (error) {
              return done(error, null);
          }
    }
  )
);


module.exports = passport;