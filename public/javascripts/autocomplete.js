/**
 * Returns the array of elements value is included in the array
 * @param {String} value - Value to check for
 * @param {Array} array - Array to check if value is included in each array item
 * @returns {Array} - All included values in given array
 */
function getIncludedValues(value, array) {
	const includedValues = [];
	for (const item of array) {
		if (includedValues.length === 20) return includedValues;
		if (item.name.toUpperCase().includes(value.toUpperCase())) {
			includedValues.push(item);
		}
	}
	return includedValues;
}

/**
 * Closes the autocomplete-items div which dynamically generates
 */
function closeList() {
	const itemOuterDiv = document.getElementsByClassName('autocomplete-items')[0];
	if (itemOuterDiv) {
		itemOuterDiv.parentNode.removeChild(itemOuterDiv);
	}
}

/* Adds the autocomplete-active class for a given index of the autocomplete-items list elements */
function addActive(index, itemOuterDiv) {
	for (let i = 0; i < itemOuterDiv.childNodes.length; i++) {
		itemOuterDiv.childNodes[i].classList.remove('autocomplete-active');
	}
	itemOuterDiv.childNodes[index].classList.add('autocomplete-active');
}

function handleScroll(index, itemOuterDiv) {
	const MAX_HEIGHT = itemOuterDiv.offsetHeight;
	const ITEM_HEIGHT = itemOuterDiv.childNodes[0].offsetHeight;
	if (ITEM_HEIGHT * (index + 1) > MAX_HEIGHT + itemOuterDiv.scrollTop) {
		itemOuterDiv.scrollBy(0, ITEM_HEIGHT);
	}
	if (itemOuterDiv.scrollTop > ITEM_HEIGHT * index) {
		itemOuterDiv.scrollBy(0, -ITEM_HEIGHT);
	}
}

const autocomplete = (inputBar, searchableItems) => {
	let currentActiveIndex = -1;
	inputBar.addEventListener('input', () => {
		/* Close any open list and reset actives */
		closeList();
		currentActiveIndex = -1;

		/* Get current input value */
		const currentInput = inputBar.value;

		/* Check which values our input is included in */
		const includedValues = getIncludedValues(currentInput, searchableItems);

		/* Create the div that holds our autocomplete items */
		const outerDiv = document.createElement('div');
		outerDiv.setAttribute('id', 'autocomplete-list');
		outerDiv.setAttribute('class', 'autocomplete-items');

		/* Append our outer div as a child of the container */
		inputBar.parentNode.appendChild(outerDiv);

		/* Go through each included value to generate the autocomplete option */
		for (const itemObject of includedValues) {
			const item = itemObject.name;
			const itemDiv = document.createElement('div');
			const ICON_URL = itemObject.icon;
			itemDiv.setAttribute('class', 'autocomplete-item');
			itemDiv.setAttribute('id', 'autocomplete-item');
			/* Adding text with bolded included values */
			itemDiv.innerHTML = `<img src="${ICON_URL}">&nbsp;${item}<input type="hidden" value="${itemObject.id},${itemObject.name}">`;
			itemDiv.addEventListener('click', () => {
				/* If user clicks this div item then set search bar value to this value */
				inputBar.value = itemDiv.getElementsByTagName('input')[0].value.split(',')[1];
				/* Close any open list */
				closeList();
			});
			outerDiv.appendChild(itemDiv);
		}
		const CHILDREN_COUNT = outerDiv.childElementCount;
		if (inputBar.value.length === 0 || CHILDREN_COUNT === 0) {
			closeList();
		} else {
			if (CHILDREN_COUNT === 1) outerDiv.style.height = 15 + outerDiv.childNodes[0].offsetHeight + 'px';
			else if (CHILDREN_COUNT < 8) outerDiv.style.height = CHILDREN_COUNT * outerDiv.childNodes[0].offsetHeight + 'px';
		}
	});

	inputBar.addEventListener('keydown', e => {
		const itemOuterDiv = document.getElementsByClassName('autocomplete-items')[0];
		if (!itemOuterDiv || itemOuterDiv.childElementCount === 0) return;
		switch (e.keyCode) {
			/* If key pressed is UP (38) */
			case 38:
				if (currentActiveIndex < 1) return;
				addActive(--currentActiveIndex, itemOuterDiv);
				handleScroll(currentActiveIndex, itemOuterDiv);
				break;
			/* If key pressed is DOWN (40) */
			case 40:
				if (currentActiveIndex > itemOuterDiv.childElementCount - 2) return;
				addActive(++currentActiveIndex, itemOuterDiv);
				handleScroll(currentActiveIndex, itemOuterDiv);
				break;
			/* If key pressed is ENTER (13) */
			case 13:
				e.preventDefault();
				if (currentActiveIndex > -1) itemOuterDiv.childNodes[currentActiveIndex].click();
				break;
			/* If any other key is pressed do nothing */
			default:
				return;
		}
	});

	document.addEventListener('click', () => {
		/* Close any open list */
		closeList();
	});
};

export { autocomplete };
