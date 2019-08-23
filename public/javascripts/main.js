/**
 * @description
 * Handles click methods and calls the AJAX requests
 * TODO: Everything
 */

import { autocomplete } from './autocomplete.js';
import { Slot } from './Slot.js';
import { gearData } from './data.js';

let GEAR_DATA;
const slots = [];

document.addEventListener('DOMContentLoaded', async () => {
	for (const button of document.querySelectorAll('.slot-button')) {
		slots.push(new Slot(button.classList[2].split('-')[0], button));
	}
	for (const slot of slots) {
		slot.getDOM().addEventListener('click', () => {
			slotEvent(slot, slots);
		});
	}

	GEAR_DATA = await gearData(slots.map(slot => slot.getSlotName()));
	document.querySelector('#autocomplete-input').disabled = getSelected() === null ? true : false;
	if (window.location.pathname.length > 1) {
		fetch('/data/gear' + window.location.pathname, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => {
				handleSelect(getItemByID(data.headSlot));
				handleSelect(getItemByID(data.capeSlot));
				handleSelect(getItemByID(data.neckSlot));
				handleSelect(getItemByID(data.ammoSlot));
				handleSelect(getItemByID(data.weaponSlot));
				handleSelect(getItemByID(data.bodySlot));
				handleSelect(getItemByID(data.shieldSlot));
				handleSelect(getItemByID(data.legsSlot));
				handleSelect(getItemByID(data.handsSlot));
				handleSelect(getItemByID(data.feetSlot));
				handleSelect(getItemByID(data.ringSlot));
			});
	}
	document.querySelector('#get-url-button').addEventListener('click', e => {
		e.preventDefault();
		let data = {};
		for (const slot of slots) {
			data[slot.getSlotName() + 'Slot'] = slot.getSlotItem() ? slot.getSlotItem().id : -1;
		}
		fetch('/data/gear/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(data => (document.querySelector('#url-p').innerHTML = document.URL.split('/')[2] + '/' + data));
		document.querySelector('#myModal').style.display = 'block';
	});
});

function handleSelect(itemData) {
	if (!itemData) return;
	const currSlot = getSlotByName(itemData.slot);
	currSlot.setSlotImage(itemData.icon);
	currSlot.setSlotItem({
		id: itemData.id,
		name: itemData.name
	});
}
function slotEvent(slot, slots) {
	const selectedSlot = getSelected(slots);

	if (selectedSlot !== null && !selectedSlot.equals(slot)) {
		selectedSlot.addClass('animate-down');
		selectedSlot.removeClass('selected');
	}

	if (!slot.isSelected()) {
		slot.addClass('selected', 'animate-up');
		slot.removeClass('animate-down');
		document.querySelector('#autocomplete-input').value = '';
	} else {
		slot.removeClass('selected', 'animate-up');
		slot.addClass('animate-down');
	}

	if (getSelected(slots) === null) {
		document.querySelector('#autocomplete-input').disabled = true;
	} else {
		document.querySelector('#autocomplete-input').disabled = false;
		autocomplete(document.getElementById('autocomplete-input'), GEAR_DATA[getSelected().getSlotName()]);
	}
}

function getSlotByName(name) {
	for (const slot of slots) {
		if (name === slot.getSlotName()) {
			return slot;
		}
	}
}

function getSelected() {
	for (const slot of slots) {
		if (slot.isSelected()) {
			return slot;
		}
	}
	return null;
}

function getItemByID(id) {
	for (const geardata in GEAR_DATA) {
		for (const item of GEAR_DATA[geardata]) {
			if (item.id === id) return item;
		}
	}
	return null;
}

document.addEventListener('click', function(e) {
	if (e.target && e.target.id === 'autocomplete-item') {
		handleSelect(getItemByID(e.target.childNodes[2].value.split(',')[0]));
	}
	if (e.target === document.querySelector('#myModal')) {
		document.querySelector('#myModal').style.display = 'none';
	}
});
