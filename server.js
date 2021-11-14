// import dependencies
const express = require('express');

//import database
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const Room = require('./models/Rooms');
const Message = require('./models/Messages');
const Profile = require('./models/UserProfile')

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const profileHandler = require('./controllers/profile.js')

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.post("/create",function(req,res){
    const newRoom = new Room({
        name: req.body.roomName
    })
    newRoom.save().then(console.log("room added"))
    .catch(e => console.log(e))
})

app.get("/getRoom", function(req, res){
    Room.find().lean().then(items =>{
        res.json(items)
    })
})
app.get("/getMessages", function(req, res){
    Message.find().lean().then(items =>{
        res.json(items)
    })
})

app.post("/createMessage",function (req, res){
    const newMessage = new Message({
        roomName: req.body.roomName,
        username: req.body.userName,
        message: req.body.message,
    })
    newMessage.save().then(console.log("new Message added"))
    .catch(e => console.log(e))
})


app.get("/getProfile", function(req, res){
    Profile.find().lean().then(items =>{
        res.json(items)
    })
})


app.get("/Createprofile", function(req, res){
    res.render("createProfile")
})


app.post("/createProfile",function (req, res){
    const newProfile = new Profile({
        profileName: req.body.profileName,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        picture: req.body.picture
    })
    newProfile.save().then(console.log("new profile added"))
    .catch(e => console.log(e))
})



app.get('/', homeHandler.getHome);
app.get("/Profile", profileHandler.getProfile);
app.get('/:roomName', roomHandler.getRoom);
app.get("/getMessages", roomHandler.getMessages);



// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));