var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Growl = require('../models/growl');

router.use(function (res, req, next) {
    req.body = _.pick(req.body, ['growl'])
    next()
});

router.use('/:id', function (req, res, next) {
  Growl.findOne({ '_id': req.params.id }, function (err, todo) {
    if (err) {
      res.status(500).send()
    } else if (!growl) {
      res.status(404).send()
    } else {
      res.growl = growl;
      next()
    }
  })
})

router.get('/', function (req, res) {
  Growl.find({}, function (err, growls) {
      if (err) {
          res.status(500).send()
      } else {
        res.json(growls)
      }
  })
})

router.post('/', function (req, res){
  var growl = new Growl(req.body)
  growl.save(function (err) {
    if (err) {
        res.status(500).send()
    } else {
      res.json(growl)
    }

  })
})

router.delete('/:id', )

module.exports = router;
