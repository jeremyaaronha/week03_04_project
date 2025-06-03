const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const { initDb } = require('./data/database');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const { swaggerUi, swaggerSpec } = require('./swagger');

const { isAuthenticated } = require('./middleware/authenticate');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware 
app.use(session({
  secret: 'supersecretkey', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL, 
    ttl: 14 * 24 * 60 * 60 // 14 días
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Login with GitHub
app.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful login
    req.session.user = req.user; 
    res.redirect('/api-docs'); 
  }
);

// Logout
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Start server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
});