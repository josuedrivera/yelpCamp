const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
//this is hard-coded in for now, name of database might need to be changed for P2G project
//the useXXX configs have deprecated and so have been commented out
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({title: 'purple field'});
    await c.save();

    //above is test to make sure db is connected
    //below is the code to loop and seed the db
    // for(let i = 0; i < 50; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const camp = new Campground({
    //         location: `${cities[random1000].city}, ${cities[random1000].state}`
    //     })
    //     await camp.save();
    // }
}

seedDB();