const Song = require('../models/Song.js');

module.exports = {
    new: newSong,
    create,
    index,
    show,
    delete: deleteSong,
    edit,
    update
};

function newSong(req, res) {
    res.render('songs/new.ejs');
}

async function create(req, res) {
    await Song.create(req.body);
    res.redirect('/songs');
}

async function index(req, res) {
    // res.send('Songs Page')
    
    const songs = await Song.find();
    res.render('songs/index.ejs', {
        songs
    });
}

async function show(req, res) {
    const song = await Song.findById(req.params.id);
    res.render('songs/show.ejs', {
        song
    });
}

async function deleteSong(req, res) {
    await Song.findByIdAndDelete(req.params.id);
    res.redirect('/songs');
}

async function edit(req, res) {
    const song = await Song.findById(req.params.id);
    res.render('songs/edit.ejs', {
        song
    });
}

async function update(req, res) {
    await Song.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/songs/${req.params.id}`);
}