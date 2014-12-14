var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MeetupSchema = new Schema({
    name: String 
});

module.exports = mongoose.model('Meetup', MeetupSchema);