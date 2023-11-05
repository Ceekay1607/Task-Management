const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const makeUserAccountService = require("./services/userAccount.service");
const makeUserService = require("./services/users.service");
const { getUserById } = makeUserService();
const { getUserByEmail, verifyPassword } = makeUserAccountService();

passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: "Incorrect email." });
            }

            const passwordMatch = await verifyPassword(password, user.password);

            if (!passwordMatch) {
                return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
