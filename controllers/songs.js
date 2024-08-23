const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Song = require('../models/Song.js');
const ensureLoggedIn = require('../middleware/ensureLoggedIn.js');


router.get('/', async (req, res) => {
        const allSongs = await Song.find({});
        res.render('songs/index.ejs', { songs: allSongs })
});

router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('songs/new.ejs');
});

function newSong(req, res) {
    res.render('songs/new.ejs');
}

module.exports = router;