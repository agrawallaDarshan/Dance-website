const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

// getting-started.js
const mongoose = require('mongoose');
const { url } = require("inspector");
mongoose.connect('mongodb://localhost/DanceWebsiteDatabase', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const kittySchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    contactNo: Number,
    emailId: String 
  });

const Kitten = mongoose.model('contactInfo', kittySchema);

// const fluffy = new Kitten({ name: 'fluffy' });

app.post('/',(req,res)=>{
    let Clientname = req.body.name;
    let Clientage = req.body.age;
    let Clientaddress = req.body.address;
    let ClientcontactNo = req.body.contactNo;
    let Clientemail = req.body.email;

    // let outputFile = `Name: ${name}\nAge: ${age}\nAddress: ${address}\nContact No.: ${contactNo}\nEmial Id: ${email}`;

    //const Userinfo = new Kitten({name: Clientname, age: Clientage,address: Clientaddress,contactNo: ClientcontactNo,emailId: Clientemail});

    // Userinfo.save(function (err, Userinfo) {
    //     if (err) return console.error(err);
    //   })

    var myData = new Kitten(req.body);
       myData.save().then(()=>{
       res.send('This item has been saved to the database')
      // alert("This item has been saved");
       }).catch(()=>{
       res.status(400).send('This item was not saved to the databse')
    });

});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});