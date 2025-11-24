
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const postControllers = require('./controllers/post.js');
const passUserToView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")





mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once("connected", () => {
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/profiles', express.static(__dirname + '/profiles'));

app.use('/style', express.static(__dirname + '/style'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);
app.use(passUserToView)

const authRoutes = require('./Routes/auth');
const postRouter = require("./Routes/post.js")
const profileRouter = require("./Routes/profile")
const commentRouter = require("./Routes/comment")

app.use('/auth', authRoutes);
app.use('/profile', isSignedIn, profileRouter);
app.use('/post', isSignedIn, postRouter)
app.use('/comment', isSignedIn, commentRouter);




app.get('/', async (req, res) => {
  res.render('auth/sign-in.ejs');
});
app.get('/sign-up.ejs', async (req, res) => {
  res.render('auth/sign-up.ejs');
});


app.get('/home', isSignedIn, async (req, res) => {
  const Post = require("./models/post.js");
  const posts = await Post.find().populate("postOwner");
  res.render('index.ejs', { posts });
});


app.listen(3000, () => {

})
