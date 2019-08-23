let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gearSchema = new Schema({
	id: String,
	headSlot: String,
	capeSlot: String,
	neckSlot: String,
	ammoSlot: String,
	weaponSlot: String,
	bodySlot: String,
	shieldSlot: String,
	legsSlot: String,
	handsSlot: String,
	feetSlot: String,
	ringSlot: String
});

let Gear = mongoose.model('Gear', gearSchema, 'gear');

module.exports = { Gear };
