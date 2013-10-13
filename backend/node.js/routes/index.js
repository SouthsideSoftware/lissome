exports.attachHandlers = function attachHandlers(app, passport){
    require('./api')(app, passport);
    //require('./account')(app, passport);

    app.get('/', function(req, res){
        res.render('index',
            { title : 'Home' }
        )
    })
};
