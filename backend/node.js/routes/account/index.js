var packageInfo = require('../../package.json');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var UserRepository = require('../../data/userRepository');

module.exports = function attachHandlers(app) {
    var userRepository = new UserRepository();
    app.post('/login', passport.authenticate('local', {successRedirect: '/api'}));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userRepository.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            userRepository.findByUsername(username, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (user.password != password) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            })
        }
    ));
};

function loggedIn(req, res) {
    res.format({
        html: function () {
            res.send('<strong>Lissome API version:</strong> ' + packageInfo.version)
        },
        text: function () {
            res.send("Lissome API version " + packageInfo.version);
        },
        json: function () {
            res.json({description: 'Lissome -- A Basic Agile Board', version: packageInfo.version});
        }
    });
    return
}