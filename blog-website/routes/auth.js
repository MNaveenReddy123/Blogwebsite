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
router.post('/login', (req, res, next) => {
    // console.log('Login attempt:', req.body); // Debugging log
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error:', err); // Log error
            return next(err);
        }
        if (!user) {
            console.log('User not found or incorrect password'); // Log user not found
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('Login error:', err); // Log login error
                return next(err);
            }
            req.flash('message', 'Login successful!');
            return res.redirect('/blogs'); // Redirect to blogs page after successful login
        });
    })(req, res, next);
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
