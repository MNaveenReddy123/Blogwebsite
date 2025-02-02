const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// GET Register Page
router.get('/register', (req, res) => {
    res.render('register', { message: req.flash('message'), error: req.flash('error') });
});

// POST Register
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    User.register(new User({ username, email }), password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('message', 'Registration successful!');
            res.redirect('/blogs'); // Redirect to blogs after registration
        });
    });
});

// Middleware to check if user is logged in
router.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/blogs/new'); // Redirect if already logged in
    }
    next(); // Proceed to login if not authenticated
}, (req, res) => {
    res.render('login', { message: req.flash('message'), error: req.flash('error') });
});

// POST Login
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true // Flash error message for login failure
}), (req, res) => {
    req.flash('message', 'Login successful!');
    res.redirect('/blogs/new'); // Redirect to blog creation page
});

// GET Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Logout failed.');
            return res.redirect('/blogs');
        }
        req.flash('message', 'You have logged out successfully.');
        res.redirect('/blogs');
    });
});

module.exports = router;
