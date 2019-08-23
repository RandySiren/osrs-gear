let gearData = slotNames => loadJSONArrays(slotNames);

async function loadJSONArrays(slotNames) {
	let gearData = {};
	slotNames.push('2h');
	for (let slotName of slotNames) {
		const requestData = await fetch(`https://www.osrsbox.com/osrsbox-db/items-json-slot/items-${slotName}.json`).then(res => {
			if (res.status !== 200) return;
			return res.json();
		});
		if (slotName === '2h') {
			slotName = 'weapon';
			gearData[slotName] = gearData[slotName];
		} else {
			gearData[slotName] = [];
		}

		for (const item in requestData) {
			gearData[slotName].push({
				id: item,
				name: requestData[item].name,
				icon: `https://www.osrsbox.com/osrsbox-db/items-icons/${item}.png`,
				slot: requestData[item].equipment.slot
			});
		}
	}
	return gearData;
}

export { gearData };
