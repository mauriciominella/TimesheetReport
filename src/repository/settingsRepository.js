var settingsRepository = function(options){

  if(!options.settingsModel){
    throw new Error('options.settingsModel mandatory');
  }

  var model = options.settingsModel;

  var saveSettings = function(settingsToSave, callback){

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
