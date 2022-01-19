const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Campground = require('../models/campground');

// router.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', { campgrounds })
// }));
// router.get('/', catchAsync(campgrounds.index));
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

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


// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('campgrounds/new')
// });
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.post('/campgrounds', async (req, res, next) => {
//     try {
//         const campground = new Campground(req.body.campground);
//         await campground.save();
//         res.redirect(`/campgrounds/${campground._id}`);
//     } catch (e) {
//         next(e);
//     }
// });

// router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
//     // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
//     const campground = new Campground(req.body.campground);
//     Campground.author = req.user._id;
//     await campground.save();
//     req.flash('success', 'Successfully made a new campground!');
//     res.redirect(`/campgrounds/${campground._id}`);
// }));
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createdCampground));

// router.get('/:id', catchAsync(async (req, res, next) => {
//     const campground = await Campground.findById(req.params.id).populate({path: 'reviews', populate: {path:'author'}}).populate('author');
//     if(!campground){
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', { campground });
// }));
// router.get('/:id', catchAsync(campgrounds.showCampground));
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     if(!campground){
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/edit', { campground });
// }));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     // const campground = await Campground.findByIdAndUpdate(id);
//     // if (!campground.author.equals(req.user._id)) {
//     //     req.flash('error', 'you do not have permission to do that!');
//     //     return res.redirect(`/campgrounds/${id}`);
//     // }
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     req.flash('success', 'Successfully updated campground');
//     res.redirect(`/campgrounds/${campground._id}`);
// }));
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;