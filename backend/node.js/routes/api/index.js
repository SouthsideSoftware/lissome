var packageInfo = require('../../package.json');

module.exports = function attachHandlers(app){
    app.get('/api', about);
    require('./stories.js')(app);
};

function about (req, res){
    res.format({
        html: function(){
            res.send('<strong>Lissome API version:</strong> ' + packageInfo.version)
        },
        text: function(){
            res.send("Lissome API version " + packageInfo.version);
        },
        json: function(){
            res.json({description: 'Lissome -- A Basic Agile Board', version: packageInfo.version});
        }
    });
    return
}