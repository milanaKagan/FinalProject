// controller actions
const User = require("../models/User");
const jwt = require('jsonwebtoken');
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userId, userName, userRole) => {
    return jwt.sign({ id: userId, username: userName, role: userRole }, 'secret key', {
        expiresIn: maxAge
    });
};

// handle errors
const handleErrors = (err) => {
    let errors = {};
    // incorrect username
    if (err.message === 'incorrect username') {
        errors ={ username : 'That username is not registered'}    }
    // incorrect password
    if (err.message === 'incorrect password') {
        errors ={ password : 'That password is incorrect'}
    }
    // incorrect password
    if (err.message === 'password less than 6 chars') {
        errors ={ password : 'Password less than 6 chars'}
    }
     // incorrect password
     if (err.message === 'incorrect email format') {
        errors ={ email : 'That email has incorrect format'}
    }
    if
    (err.code === '42601' && err.message.includes('unique_email')) {
        errors ={ email : 'that email is already registered'}
    }
    if
        (err.code === '42601' && err.message.includes('unique_username')) {
            errors ={ username : 'that username is already registered'}
    }
    // validation errors
    if
        (err.message.includes('user validation failed')) {
        Object.values(err
            .errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message;
            });
    }

    return errors;
}

//render pages
module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
//sign up add user to db
module.exports.signup_post = async (req, res) => {
    try { 
        const user = await User.save_new_user(req.body);
        const token = createToken(user.id, user.username ,user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ id: user.id, user: user.username, role: user.role });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}
//login with existant user
module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const user = await User.login(username, password);
        const token = createToken(user.id, user.username ,user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.username, role: user.role });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

