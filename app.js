//jshint esversion: 6
const path = require('path')
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const http = require('http');
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const db = require("./public/js/db")
const bcrypt = require("bcrypt");
const { dirname, resolve } = require("path");
const googleEmail = require('./apis/gmail')
const twilio = require('./apis/twilio');
const { admin } = require('googleapis/build/src/apis/admin');
const adminPage = require('./public/js/generator')
const flash = require('connect-flash');
const router = require("./public/js/router");
const date = require('./public/js/date')
const moment = require('moment');
const saltRounds = 10;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

// add listeners to basic CRUD requests
const Storage = require("./public/js/storage");
const storage = new Storage(db)
router.setRoutes(app, "/events", storage);


// Set up the flash middleware
app.use(flash());

app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"))

// scope variable 
var userdatas = []

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));
app.use(cookieParser());


app.get('/', function(req, res){
    res.render("sign_up")
});


app.post("/", async function(req, res){

    var email = req.body.email;
    var fullname = req.body.fullname;
    var phone = req.body.phone;
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    db.query(`SELECT * FROM users WHERE username = '${username}' AND password  = '${password}'`, async function(err, result){
        if(Object.keys(result).length > 0){
            res.render("failRegPage");
        }else{
        function userPage(){
            req.session.user = {
                email: email,
                fullName: fullname,
                phoneNumber: phone,
                userName: username,
                password: password
            };

            res.render("homepage")
        }
            var sql = `INSERT INTO users (email, fullname, phone, username, password, role) VALUES ('${email}', '${fullname}', '${phone}', '${username}', '${encryptedPassword}', '${role}')`;
            db.query(sql, async function (err, result) {
                if (err){
                    console.log(err);
                }else{
                res.redirect("login");   
                };
            });
        }
    });
})



// Set up a route to display the flash message
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    next();
  });

app.post("/add-member", async function(req, res) {
    const email = req.body.email;
    var fullname = req.body.fullname;
    var phone = req.body.phone;
    var username = "User" + adminPage.autoGenerate(6);
    var password = adminPage.autoGenerate(12);
    var role = "user";

    let textMessage =  `\r\n\r\n Hello  This is just a kind reminder that tomorrow is your clean-up day.\n Thank you for helping keep the house tidy.\n\n For more information, please visit https://fierce-reaches-38495.herokuapp.com.\n\n Have a great evening!`
    const link = `<a href="http://localhost:3000">TaskMaster.com</a>`;
    let content = `You have been invited to join TaskMaster go to this link to join your team ${link} with your username as: ${username} and password: ${password}. Kindly select role as: user`;
  
    // send email invite to user
    googleEmail.sendEmail(email, content);
    // send text message
    // twilio.sendSMS();
  // construct the SQL query dynamically
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
    var sql = `INSERT INTO users (email, fullname, phone, username, password, role) VALUES ('${email}', '${fullname}', '${phone}', '${username}', '${encryptedPassword}', '${role}')`;

  // execute the query
    db.query(sql, function(error, result){
    if (error) {
      console.error(error);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully'); 
    }
  // Redirect the user back to the original page
  res.redirect('back');

  }); 
  });


app.post("/calender", function(req,res){
    res.redirect('calender')

})

app.get("/calender", function(req,res){
    res.render('calender')
})

app.post("/admin", function(req,res){
    res.redirect('/admin')
})

app.get("/admin", function(req, res){
    
    let sql = `SELECT * FROM users`;
    db.query(sql, function (err, results) {
    if (err) throw err;  
    userdatas = results;   
    res.render('admin', {userData: userdatas});
})
   
})


app.post("/homepage", function(req, res){
    res.redirect("homepage")
})

app.get("/homepage", function(req, res){
    res.render('homepage');
})

app.post("/login", async (req, res)=>{
        var username = req.body.username;
        var password = req.body.password;
        
        db.query(`SELECT * FROM users WHERE username = '${username}'`, async function (err, result) {
        
            const user = result[0];
            if(Object.keys(result).length > 0 ){
            var password_hash = result[0].password;
            const comparison = await bcrypt.compareSync(password, password_hash);
            
            if(comparison){

                req.session.user = {
                    id: user.id,
                    fullname: user.fullname,
                    username: user.username,
                    role: user.role,
                  };
                const [firstname, lastname] = user.fullname.split(" ")
                if(user.role === 'user'){
                    res.redirect('homepage')
                }else if(user.role ==='admin'){
                    res.redirect('admin');
                }   
            }
            else{
                res.redirect("login")  
            }
        }
        else{
            res.render('login',{message: 'Invalid Username Or Password'});        }

     });
});





app.get('/login', (req, res) => {
    res.render('login')
  });


app.get('/user-delete/:id', function(req, res){
    var id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;
        res.redirect('/admin');
      });
})


app.post("/add-task", function(req, res){
      const {userID, end_date, text } = req.body;
      var now = new Date();
      const start_date = moment(now).format('YYYY-MM-DD, h:mm:ss');
      const end_datefull = end_date + " " + moment().format('LTS').replace(/ AM| PM/g, '');;

      console.log(end_datefull);
      
        let sql = `INSERT into events (userID, start_date, end_date, text) VALUES('${userID}', '${start_date}', '${end_datefull}', '${text}')`;
        db.query(sql, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error inserting data');
          } else {
            console.log('Data inserted successfully'); 
          }

        //   res.redirect('/admin')
      });
})

app.get("/logout", function(req, res) {
  
    if (req.session.loggedin) {
        req.session.loggedin = false;
        res.redirect('/');
  }else{
      // Not logged in
      res.redirect('/login');
  }
   });


   app.get("/contact-admin", function(req, res){
    res.render("contact-admin")
   
   })


app.listen(process.env.DEV_PORT || 8080, function(){
    console.log("Listening on port: " + process.env.DEV_PORT)
})