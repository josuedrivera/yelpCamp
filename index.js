//this used to be index.html....need to update git commits to reflect change
//this is called app.js in the course
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
//this is hard-coded in for now, name of database might need to be changed for P2G project
//the useXXX configs have deprecated and so have been commented out
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});
//TODO:       use create index is throwing an error which is not letting me connect to the db. fix asap to get the rest of the app working.g2g to work, actually work out then get ready for work. I need to flirt with Tiffany today ;)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    // res.send('HELLO FROM YELP CAMP')
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping!' });
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})