const express = require('express');
const router = express.Router();
const Song = require('../models/Song.js');
const ensureLoggedIn = require('../middleware/ensureLoggedIn.js');

// Paths start with /songs

// View all requestes functionality.
router.get('/', async (req, res) => {
    try {
        const allSongs = await Song.find({}).populate('user', 'name');
        res.render('songs/index.ejs', { songs: allSongs, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching songs');
    }
});


// Return view (form) to add a new song request.
router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('songs/new.ejs');
});

// CREATE Functionality.
router.post('/', ensureLoggedIn, async (req, res) => {
    try {
        const newSong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            youTubeURL: req.body.youTubeURL,
            user: req.user._id,
        });
        
        await newSong.save();
        
        res.redirect('/songs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Oops, Fumble! We han an error creating your song. Please refresh and try again! 🙏');
    }
});

// DELETE song functinality.
router.delete('/:songId', ensureLoggedIn, async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (song.user.equals(req.user._id)) {  // Verifying if the user owns this song.
            await Song.findByIdAndDelete(req.params.songId);
            res.redirect('/songs');
        } else {
            res.send('You are not authorized to delete this song!');
        }
    } catch (error) {
        console.error(error);
        res.send('Oops! There has been an error deleting song. Please refresh and try again 🙏.');
    }
});


module.exports = router;