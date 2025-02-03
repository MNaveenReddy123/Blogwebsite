const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Ensure the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// GET all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: 'desc' });
    res.render('index', { blogs });
});

// GET form to create a new blog
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new');
});

// CREATE new blog
router.post('/', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    await Blog.create({ title, content });
    res.redirect('/blogs');
});

// SHOW single blog
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('show', { blog });
});

// GET edit form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog });
});

// UPDATE blog
router.put('/:id', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect(`/blogs/${req.params.id}`);
});

// DELETE blog
router.delete('/:id', isAuthenticated, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
});

module.exports = router;
