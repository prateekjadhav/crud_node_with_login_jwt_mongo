var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var auth = require('../bin/auth');
mongo = require('mongodb')
var ObjectId = require('mongodb').ObjectID;




router.get('/list', function (req, res, next) {
  var collection = db.get().collection("products");
  let tokenData = auth.verifyToken(req.get('token'));
  let findObject = {
    user_id: tokenData.data.id
  }
  collection.find(findObject).toArray(function (err, products) {
    res.send(products);
  })
});

router.post('/add', function (req, res, next) {
  var collection = db.get().collection("products");
  let tokenData = auth.verifyToken(req.get('token'));
  let product = {
    name: req.body.name,
    sku: req.body.sku,
    user_id: tokenData.data.id,
    description: req.body.description,
    price: req.body.price
  }

  collection.insertOne(product, { w: 1 }, function (err, response) {
    if (err) {
      console.log(err);
      res.send('An error occured, please try gain later');
    }
    res.send('Product added successfully');
  });
});

router.delete('/delete/:id', function (req, res, next) {
  var collection = db.get().collection("products");
  let id = req.params.id;
  collection.deleteOne({ _id: ObjectId(id) }, function (err, response) {
    if (err) {
      console.log(err);
      res.send('An error occured, please try gain later');
    }
    res.send('Product Deleted Successfull');
  })

});

router.put('/edit/:id', function (req, res, next) {
  var collection = db.get().collection("products");
  let tokenData = auth.verifyToken(req.get('token'));
  let id = req.params.id;
  let object = {
    name: req.body.name,
    sku: req.body.sku,
    user_id: tokenData.data.id,
    description: req.body.description,
    price: req.body.price
  }
  collection.update({ _id: ObjectId(id) }, object, function (err, response) {
    if (err) {
      console.log(err);
      res.send('An error occured, please try gain later');
    }
    res.send('Product Updated Successfull');
  })
});

module.exports = router;