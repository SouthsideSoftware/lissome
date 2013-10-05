var packageInfo = require('../../package.json');
var storyRepository = require('../../data/stories');

module.exports = function attachHandlers(app){
    app.get('/api/stories', storyRepository.getAll)
};
