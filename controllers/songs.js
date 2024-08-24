const express = require('express');
const router = express.Router();
const Song = require('../models/Song.js');
const ensureLoggedIn = require('../middleware/ensureLoggedIn.js');

// Paths start with /songs

router.get('/', async (req, res) => {
        const allSongs = await Song.find({}).populate('user', 'name');
        res.render('songs/index.ejs', { songs: allSongs });
});

router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('songs/new.ejs');
});

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
        res.status(500).send('Error creating song. Please refresh and try again!');
    }
});

module.exports = router;