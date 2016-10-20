const mongoose = require('mongoose');

var growlSchema = {
  growl: String,
  user: String
}

var Growl = mongoose.model('Growl', growlSchema);

module.exports = Growl;
