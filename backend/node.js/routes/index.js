exports.attachHandlers = function attachHandlers(app){
    require('./api')(app);
    require('./account')(app);

    app.get('/', function(req, res){
        res.render('index',
            { title : 'Home' }
        )
    })
};
