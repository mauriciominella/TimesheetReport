var settingsRepository = function(options){

  var saveSettings = function(settingsToSave, callback){

   if(!options.settingsModel){
        throw new Error('options.settingsModel mandatory');
    };

    var model = options.settingsModel;

    //always deleting the record and recreating instead of managing the updating. That's is not the ideal but keep things simpler
    model.findOneAndRemove({}, function(err){
      if(err) throw err;

      var newSetting = new model(settingsToSave);
      newSetting.save(function(err){
        if(err) throw err;

        console.log('New setting created');
      });

    });

  };

  var loadSettings = function (err, callback) {

    if(!options.settingsModel){
        throw new Error('options.settingsModel mandatory');
    };

    var model = options.settingsModel;

    model.findOne({}, function(err, existingRecord){
      callback(err, existingRecord);
    });

  };

  return {
    saveSettings: saveSettings,
    loadSettings: loadSettings
  };
};

module.exports = settingsRepository;
