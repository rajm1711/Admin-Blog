const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const cookiesParser = require('cookie-parser');
const passport = require('./config/passportConfig');

const authRoutes = require('./routes/index');
const blogRoutes = require('./routes/blogroutes');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"/views"));



app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookiesParser());
app.use(express.static(path.join(__dirname,"/views")));


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.use('/',authRoutes);
app.use('/',blogRoutes);

const port = 3020;

app.listen(port, (err)=>{
    if(!err){
        console.log(`Server is running on http://localhost:${port}`);
        
    }
    else{
        console.error('Error starting server', err);
        
    }
});