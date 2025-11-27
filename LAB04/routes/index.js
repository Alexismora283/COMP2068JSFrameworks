var express = require('express');
var router = express.Router();

/* HOME */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* PERSON PAGES */
router.get('/person1', function(req, res, next) {
  res.render('person1', { title: 'Person 1' });
});

router.get('/person2', function(req, res, next) {
  res.render('person2', { title: 'Person 2' });
});

router.get('/person3', function(req, res, next) {
  res.render('person3', { title: 'Person 3' });
});

router.get('/person4', function(req, res, next) {
  res.render('person4', { title: 'Person 4' });
});

module.exports = router;
