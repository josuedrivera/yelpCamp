const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isAuthor, validateCampground } = require('../middleware.js');
const Campground = require('../models/campground');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}));

// router.get('/', catchAsync(async (req, res, next) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', { campgrounds })
// }));

// router.get('/new', (req, res) => {
//     if(!req.isAuthenticated()) {
//         req.flash('error', 'you must be signed in');
//         return res.redirect('/login');
//     }
//     res.render('campgrounds/new');
// })


router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
});

// router.post('/campgrounds', async (req, res, next) => {
//     try {
//         const campground = new Campground(req.body.campground);
//         await campground.save();
//         res.redirect(`/campgrounds/${campground._id}`);
//     } catch (e) {
//         next(e);
//     }
// });

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
    const campground = new Campground(req.body.campground);
    Campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({path: 'reviews', populate: {path:'author'}}).populate('author');
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // const campground = await Campground.findByIdAndUpdate(id);
    // if (!campground.author.equals(req.user._id)) {
    //     req.flash('error', 'you do not have permission to do that!');
    //     return res.redirect(`/campgrounds/${id}`);
    // }
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}));

module.exports = router;