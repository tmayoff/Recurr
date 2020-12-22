const passport = require('../services/passport');
const express = require('express');
const User = require('../models/User');

var router = express.Router();

router.get('/register', (req, res, next) => {
    let msgs = req.flash('error');
    let errors = {}
    msgs.forEach(obj => {
        let key = Object.keys(obj)[0];
        errors[key] = obj[key];
    });

    res.render('auth/register', {
        subtitle: "Register",
        user: req.user,
        errors
    });
});

router.post('/register', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (email == "" || password == "" || firstname == "" || lastname == "") {
        if (email == "")
            req.flash('error', { email: "Email cannot be blank" });
        if (password == "")
            req.flash('error', { password: "Password cannot be blank" });
        if (firstname == "")
            req.flash('error', { firstname: "First name cannot be blank" });
        if (lastname == "")
            req.flash('error', { lastname: "Last name cannot be blank" });

        res.redirect('register');
    }

    let pass = User.hashPassword(password);
    User.create({
        firstname: firstname,
        lastname: lastname,
        email,
        hash: pass.hash,
        salt: pass.salt,
        iterations: pass.iterations
    }).then(() => {
        res.redirect('/');
    }).catch(err => {
        return next(err);
    });
});

router.get('/login', (req, res, next) => {
    let errors = req.flash('error');
    res.render('auth/login', {
        subtitle: "Login",
        user: req.user,
        messages: errors
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/authentication/login',
    failureFlash: true,
}), (req, res, next) => {

});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;