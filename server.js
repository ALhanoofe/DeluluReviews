//dotenv means to hide sensitive info like passwords

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const postControllers = require('./controllers/post.js');

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once("connected", () => {
  console.log("connected to mongo");
})

//extended mean we receive same data
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + '/assets'));



app.get('/', async (req, res) => {
  res.render('auth/sign-in.ejs');
});
app.get('/sign-up.ejs', async (req, res) => {
  res.render('auth/sign-up.ejs');
});


app.listen(3000, () => {
  console.log('listening on port 3000');

})