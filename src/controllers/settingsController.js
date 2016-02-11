var VIEW_NAME = 'SettingsView';
var PAGE_TITLE = 'Settings';

var settingsController = function(options){

    var middleware = function(req, res, next){
      next();
    };


    var renderView = function(req, res, togglApiToken){

            res.render(VIEW_NAME,
                                  {
                                   title: PAGE_TITLE,
                                   nav: options.navigation,
                                   togglApiToken: togglApiToken
                                 });
    };

    var getIndex = function(req, res){
        renderView(req, res, '132132134874654sdfa');
    };

    var postSaveSettings = function(req, res){

        //Validate

        //Save to database

        renderView(req, res, 'Post1231321321');
    };

    return {
      middleware: middleware,
      getIndex: getIndex,
      postSaveSettings: postSaveSettings
    };

};

module.exports = settingsController;
