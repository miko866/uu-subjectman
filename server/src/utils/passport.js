const GoogleStrategy = require('passport-google-oauth2').Strategy;
const env = require('env-var');

const User = require('../models/user-model');

const { NotAuthorizedError } = require('../utils/errors');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.get('GOOGLE_CLIENT_ID').required().asString(),
        clientSecret: env.get('GOOGLE_CLIENT_SECRET').required().asString(),
        callbackURL: '/api/auth/google/callback',
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ email: profile.email });

          if (existingUser) {
            return done(null, existingUser);
          } else throw new NotAuthorizedError();
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    // The USER object is the "authenticated user" from the done() in authUser function.
    // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.

    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
    // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

    done(null, user);
  });
};
