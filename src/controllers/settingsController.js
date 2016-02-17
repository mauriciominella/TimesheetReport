var VIEW_NAME = 'SettingsView';
var PAGE_TITLE = 'Settings';

var settingsController = function(options){

    if(!options.settingsRepository){
      new Error('options.settingsRepository mandatory');
    }

    var settingsRepository = options.settingsRepository;

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

        settingsRepository.loadSettings(function(err, settings){

          if(err){
              res.send(err);
          }else{
            var apiToken = !settings ? '' : settings.toggl.apiToken;
            renderView(req, res, apiToken);
          }

        });

    };

    var postSaveSettings = function(req, res){

        //Validate
        var settingsToSave = {
            toggl: {
                apiToken: req.body.togglApiToken
              }
            };

        //Save to database
        settingsRepository.saveSettings(
          settingsToSave, function(err, savedSettings){

              if(!err){
                renderView(req, res, savedSettings.toggl.apiToken);
              }else{
                res.send(err);
              }
          });
    };

    return {
      middleware: middleware,
      getIndex: getIndex,
      postSaveSettings: postSaveSettings
    };

};

module.exports = settingsController;
