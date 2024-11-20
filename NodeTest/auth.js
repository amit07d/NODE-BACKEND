const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        //console.log("Received credentials:", username, "[password omitted]");
      const user = await Person.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });
      const isPasswordMatched = user.comparePassword(password)
      if (!isPasswordMatched) {
        return done(null, false, { message: "Incorrect password." });
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
