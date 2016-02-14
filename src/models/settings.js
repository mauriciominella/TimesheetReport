// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var settingsSchema = new Schema({
  toggl: {
    apiToken: String
  },
  created_at: Date,
  updated_at: Date
});

settingsSchema.pre('save', function(next){
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at){
    this.created_at = currentDate;
  };

  next();
});

// the schema is useless so far
// we need to create a model using it
var Settings = mongoose.model('Settings', userSchema);

// make this available to our users in our Node applications
module.exports = Settings;
