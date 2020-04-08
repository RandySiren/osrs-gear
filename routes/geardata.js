/**
 *  @description
 * Router which handles AJAX requests for the index page.
 * Contains the GET to load URLs from database and render ejs page
 * Contains the POST to send data to database and return the URL
 */

let express = require('express');
let Gear = require('../models/Gear').Gear;
let router = express.Router();
let shortid = require('shortid');

router.get('/:id', async (req, res) => {
	let id = req.params.id;
	await Gear.find({ id: id }, (err, docs) => {
		if (docs.length) {
			console.log(docs);
			res.send(docs[0]);
		}
	});
});

/* POST home page. */
router.post('/', async (req, res, next) => {
	let reqBody = req.body;
	let newGear = new Gear({
		id: shortid.generate(),
		headSlot: reqBody.headSlot,
		capeSlot: reqBody.capeSlot,
		neckSlot: reqBody.neckSlot,
		ammoSlot: reqBody.ammoSlot,
		weaponSlot: reqBody.weaponSlot,
		bodySlot: reqBody.bodySlot,
		shieldSlot: reqBody.shieldSlot,
		legsSlot: reqBody.legsSlot,
		handsSlot: reqBody.handsSlot,
		feetSlot: reqBody.feetSlot,
		ringSlot: reqBody.ringSlot,
	});
	await newGear.save();
	res.send(newGear.id);
});

module.exports = router;
