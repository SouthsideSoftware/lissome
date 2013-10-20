var packageInfo = require('../package.json');

var UserRepository = function(){
    this.users = [
        { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
        ,
        { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
    ];
}

UserRepository.prototype.lggedIn = function(req, res) {
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

UserRepository.prototype.findById = function(id, fn) {
    var idx = id - 1;
    if (this.users[idx]) {
        fn(null, this.users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

UserRepository.prototype.findByUsername = function(username, fn) {
    for (var i = 0, len = this.users.length; i < len; i++) {
        var user = this.users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

module.exports = UserRepository;