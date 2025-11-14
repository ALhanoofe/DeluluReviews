//dotenv means to hide sensitive info like passwords

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const postControllers = require('./controllers/post.js');
const authRoutes = require('./Routes/auth');
const profileRouter = require ("./Routes/profile.js")



mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once("connected", () => {
  console.log("connected to mongo");
})

//extended mean we receive same data
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use('/auth', authRoutes);
app.use('/profile',profileRouter);



app.get('/', async (req, res) => {
  res.render('auth/sign-in.ejs');
});
app.get('/sign-up.ejs', async (req, res) => {
  res.render('auth/sign-up.ejs');
});


app.listen(3000, () => {
  console.log('listening on port 3000');

})
