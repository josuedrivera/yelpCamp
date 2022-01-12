const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//will need to change the name of this for my places to go project
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);