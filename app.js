const express = require("express");
const fs = require("fs");
const bodyparser = require('body-parser');
const path = require("path");
const app = express();

//for importing body-parser
// const bodyparser = require('body-parser');

//importing mongoosez
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


const port = 80;

// defining mongoose schema  (instead of kittern we are replacing with contact)
const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  phoneNumber: String,
  address: String,
  concern: String,
});

// const Contact = mongoose.model('Contact', contactSchema);
const Contact = mongoose.model('Kitten', contactSchema);


app.use("/static", express.static("static"));
app.use(express.urlencoded()); //for getting data(form)

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//this is for getting index page
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

//this is for getting contact page
app.get('/contact', (req, res)=>{
  res.status(200).render("contact.pug");
})

//POST DATA for CONTACT PAGE
// app.post('/contact', (req, res)=>{
//   var mydata = new Contact(req.body);

//   mydata.save().then(()=>{
//     res.send('This item has BEEN SAVED in the database');
//   }).catch(()=>{
//     res.status(400).send('This item has NOT BEEN SAVED in the database')
//   });

//   // res.status(200).render('contact.pug');
// })

const serverSelectionError = new ServerSelectionError();

app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send('This item has been saved to the database')
  }).catch(()=>{
  res.status(400).send('item was not saved to the databse')
  })
})

app.listen(port, () => {
  console.log(`Server is running at port 80`);
});


//for using POST REQUEST using EXPRESS download/install "npm install body-parser"
