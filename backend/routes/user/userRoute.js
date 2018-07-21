
/**
 * Pre- Defined Modules also called Installed Modules
 */
let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let flash = require('connect-flash');

/**
 * My defined Modules also called user defined module
 */
let UserController = require('../../controller/user/userController');

/**
 * calling the Pre-Defined router function of express module
 */
let router = express.Router();


router.get('/profile', (req, res, next) => {
    messages = res.locals.messages.info;
    res.send({ msg: 'correctly render' })
})


router.post('/signUp', function (req, res, next) {
    var message = [];
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Not a valid email or valid length').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password length must be more than 3').isLength({ min: 3 });
    var error = req.validationErrors();
    if (error) {
        error.forEach(function (err) {
            message.push(err.msg);
        })
        res.status(206).send({ success: false, MSG: message });
    } else {
        passport.authenticate('local.signUp', function (err, user, info) {
            if (err) { res.status(500).send({ success: false, MSG: info.message, error: err }); }
            if (!user) {
                if (info.saveUser) {
                    let userName = req.body.userName;
                    let userAdress = {
                        line1: req.body.userAdress.line1,
                        line2: req.body.userAdress.line2,
                        city: req.body.userAdress.city,
                        state: req.body.userAdress.state,
                        country: req.body.userAdress.country,
                        pincode: req.body.userAdress.pincode,
                    }
                    let email = req.body.email;
                    let password = req.body.password;
                    let isTrue = true;
                    let parameter = {
                        _id: new mongoose.Types.ObjectId(),
                        user_name: userName,
                        user_adress: userAdress,
                        email: email,
                        password: password,
                        isTrue: isTrue
                    }
                    UserController.saveNewUser(parameter).then((user) => {
                        if (user) {
                            res.status(200).send({ success: true, MSG: 'User Saved successfully', user: user });
                        } else {
                            next('No User Saved');
                        }
                    });
                } else {
                    res.status(404).send({ success: false, MSG: info.message });
                }
            } else {
                res.status(200).send({ success: true, MSG: info.message });
            }
        })(req, res, next);
    }
});


router.post('/login', function (req, res, next) {
    var message = [];
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Not a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password length must be more than 3').isLength({ min: 3 });
    var error = req.validationErrors();
    if (error) {
        error.forEach(function (err) {
            message.push(err.msg);
        })
        res.status(404).send({ success: false, MSG: message });
    } else {
        passport.authenticate('local.signIn', function (err, user, info) {
            if (err) {
                res.redirect('/user/signup')
            }
            if (!user) {
                res.redirect('/user/signup')
            } else {
                if (info.userFound) {
                    req.flash('info', info.message)
                    res.redirect('/user/profile')
                } else {
                    res.redirect('/user/signup')
                }
            }
        }
        )(req, res, next);
    }
});



router.get('/signup', (req, res, next) => {
    res.send({ msg: 'error render' })
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/user/signup');
});


/**
 * This is the route for getting the selected user
 * 
 * In this we have to pass the particular id of the user whom we want to find
 */
router.get('/getSelectedUser', (req, res, next) => {
    let userId = req.query.userId ? mongoose.Types.ObjectId(req.query.userId) : undefined;
    if (userId) {
        UserController.getSelectedUser(userId).then((user) => {
            if (user) {
                res.status(200).send({ success: true, MSG: 'User Found successfully', user: user });
            } else {
                next('No User Found');
            }
        });
    } else {
        next('Invalid User Id');
    }
});


/**
 * This is the route for getting all the users
 * 
 * In this route we are not passing anything and it is called at the start of the page.
 */
router.get('/getAllUsers', (req, res, next) => {
    UserController.getAllUserDetails().then((user) => {
        if (user) {
            res.status(200).send({ success: true, MSG: 'User Found successfully', user: user });
        } else {
            next('No User Found');
        }
    });
});


/**
 * This is the route for update the user.
 * 
 * Here we need to pass the parameter in which we need the fields which we want to update
 *  as well as we need to send the ObjectId of the user
 */
router.post('/updateUsers', (req, res, next) => {
    let parameter = {};
    let id = req.body._id ? mongoose.Types.ObjectId(req.body._id) : undefined;
    let userName = req.body.userName;
    let userAdress = req.body.userAdress;
    let email = req.body.email;
    parameter = {
        user_name: userName,
        user_adress: userAdress,
        email: email
    }

    if (id && req.body) {
        UserController.updateUserDetails(id, parameter).then((user) => {
            if (user) {
                res.status(200).send({ success: true, MSG: 'User Updated successfully', user: user });
            } else {
                next('No User Found');
            }
        })
    }
})


/**
 * This is the route to delete any user.
 * Actually i am not deleting any user i just make a flag isTrue as a false.
 * It is also called as soft delete.
 * 
 * Here I am soft deleting the user according to ObjectId of the user.
 */
router.post('/deleteUser', (req, res, next) => {
    let id = req.body._id ? mongoose.Types.ObjectId(req.body._id) : undefined;
    if (id) {
        let parameter = {
            isTrue: false
        }
        UserController.deleteUserDetails(id, parameter).then((user) => {
            if (user) {
                res.status(200).send({ success: true, MSG: 'User Deleted successfully', user: user });
            } else {
                next('No User Found');
            }
        })
    }
})


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user/signup');
    }

}