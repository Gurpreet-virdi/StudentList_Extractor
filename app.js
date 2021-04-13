const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const helmet = require('helmet');
const compression = require('compression');
const errorController = require('./controllers/error');
const studentRoutes = require('./routes/student-list');
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const config = require('config').app;

const PORT = process.env.PORT || config.port;
const MONGODB_URI = process.env.dbURL || 'mongodb+srv://Pragra:Pragra123-$@cluster0.jfhji.mongodb.net/studentpage';
const SECRET = process.env.SECRET || 'secret';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  databaseName: config.mongoConfig.dbName,
  collection: 'sessions',
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store, // store sessions in MongoDB with connect-mongodb-session
  })
);
app.use(flash());
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      // set the user key in the request object to the model user we get from mongoose
      req.user = user;
      console.log(`Current Session User Email is: ${user.email}`);
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use(studentRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error',
    isAuthenticated: (req.session && req.session.isLoggedIn) || false,
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, process.env.IP, () => {
      console.log(`${config.serviceName} is listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));
