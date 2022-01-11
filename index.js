//this used to be index.html....need to update git commits to reflect change
//this is called app.js in the course
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    // res.send('HELLO FROM YELP CAMP')
    res.render('home');
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

app.get('/campgrounds/"id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect('/campgrounds/${campground._id}')
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping!' });
//     await camp.save();
//     res.send(camp)
// })

app.listen(3000, () => {
    console.log('Serving on port 3000')
})