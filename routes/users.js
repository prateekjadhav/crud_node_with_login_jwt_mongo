var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var auth = require('../bin/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
    var collection = db.get().collection("users");
    let userObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: auth.hashPassword(req.body.password)
    }

    collection.insertOne(userObject, { w: 1 }, function (err, response) {
        if (err) {
            console.log(err);
            res.send('An error occured, please try gain later');
        }
        res.send('User registerd successfully');
    });
});

router.post('/login', function (req, res, next) {
    var collection = db.get().collection("users");
    let userObject = {
        email: req.body.email,
        password: auth.hashPassword(req.body.password)
    }
    collection.findOne(userObject, function (err, response) {
        if (err) {
            console.log(err);
            res.send('An error occured, please try gain later');
        }
        console.log(response);
        if (response != null) {
            const tokenJsonData = { "email": response.email, 'id': response._id, 'name': response.firstname + ' ' + response.lastname };
            const jwtToken = auth.generateToken(tokenJsonData);
            res.send(jwtToken);
        } else {
            res.send('Invalid email or password');
        }

    });
});

router.get('/dashboard', function(req, res, next){
    res.send('Token is correct');
});

module.exports = router;
