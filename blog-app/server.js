require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');  // Import User model
const flash = require('connect-flash'); // Import flash

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session Setup (must be before flash)
app.use(session({
    secret: 'mysecret', 
    resave: false, 
    saveUninitialized: false // Changed to false
}));

app.use(flash()); // Use flash messages

// Passport Setup
passport.use(new LocalStrategy(User.authenticate()));  
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());  

app.use(passport.initialize());
app.use(passport.session());

// Middleware to pass flash messages to all views
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    res.locals.error = req.flash('error'); // Pass error messages
    next();
});

// Routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
app.use('/blogs', blogRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
