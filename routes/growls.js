var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Growl = require('../models/growl');

router.use(function (res, req, next) {
    req.body = _.pick(req.body, ['growl'])
    next()
});

router.get('/', function (req, res) {
  Growl.find({}, function (err, growls) {
      if (err) {
          res.status(500).send()
      } else {
        res.json(growls)
      }
  })
})
