/**
 *  @description
 * Router which handles AJAX requests for the index page.
 * Contains the GET to load URLs from database and render ejs page
 * Contains the POST to send data to database and return the URL
 */

let express = require('express');
let Gear = require('../models/Gear').Gear;
let router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
	res.render('index', {});
});

module.exports = router;
