const express = require('express');
const Author = require('../models/Author');
const router = express.Router();

// All Authors
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name) searchOptions.name = new RegExp(req.query.name, 'i');
    try {
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { authors, searchOptions: req.query });
    } catch (error) {
        res.redirect('/');
    }
})

// New Author
router.get('/new', (req, res) => {
    res.render("authors/new", { author: new Author() });
})

// Create Author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save();
        res.redirect('/authors')
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error in creating the author"
        })
    }
})
module.exports = router;