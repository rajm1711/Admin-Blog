const models = require('../models/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Home page controller
const getHomePage = async (req, res) => {
  // if (req.isAuthenticated()) {
  //   const { username, email } = req.user;
  //   res.render('index', {
  //     user: req.user, 
  //     name: username,
  //     email: email
  //   });
  // } else {
  //   res.render('login');
  // }
  res.render('index');
};

// Render signup page
const getSignupPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('signup');
};

// User signup controller
const signup = async (req, res) => {
  console.log("Signup process initiated");
  
  const { username, email, contact, password, confpassword } = req.body;

  if (password === confpassword) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Password hashed successfully ",hashedPassword);

      // Create and save new user
      const newUser = new User({
        username ,
        email ,
        contact,
        password: hashedPassword
      });

      await newUser.save();
      console.log("New user registered:", newUser);

      res.redirect('/login');
    } catch (err) {
      console.error("Signup error:", err);

      if (err.code === 11000) { // Duplicate key error (likely email already registered)
        res.send("This email is already registered.");
      } else {
        res.status(500).send("An error occurred during registration.");
      }
    }
  } else {
    console.log("Passwords do not match");
    res.send("Passwords do not match. Please try again.");
  }
};

// Render login page
const getLoginPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('login');
};

// User login controller
const login = async  (req, res) => {

  console.log("Login success");
  
  res.redirect('/');
};

// User logout controller
const logout = (req, res) => {
  console.log("Logout process initiated");

  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("An error occurred during logout.");
    }
    res.redirect('/login');
  });
};

// Profile page controller
const profile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { username, email, contact } = req.user;
  res.render('profile', {
    name: username,
    email: email,
    contact: contact
  });
};

// Add topic page controller
 const addtopic = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  res.render('addtopic');
};


module.exports= {addtopic,profile,logout,login, getLoginPage, signup, getSignupPage,getHomePage };