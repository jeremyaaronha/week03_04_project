const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate'); 

// Swagger
router.use('/', require('./swagger'));

// Rutas protegidas:
router.use('/books', isAuthenticated, require('./books'));
router.use('/authors', isAuthenticated, require('./authors'));

// Login
router.get('/login', passport.authenticate('github'));

// Callback de GitHub
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        req.session.user = req.user; 
        res.redirect('/api-docs'); 
    }
);

// Logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;