var packageInfo = require('../../package.json');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function attachHandlers(app, passport) {
    app.post('/login', passport.authenticate('local'), loggedIn);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                findByUsername(username, function (err, user) {
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
            });
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


var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    ,
    { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}