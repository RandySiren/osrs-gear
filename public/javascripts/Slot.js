/**
 * @description
 * Object class for Slots
 * TODO: Everything
 */
export class Slot {
	constructor(slotName, dom) {
		const _slotName = slotName;
		const _dom = dom;
		let _item = null;

		this.getSlotName = () => {
			return _slotName;
		};
		this.getDOM = () => {
			return _dom;
		};
		this.getSlotItem = () => {
			return _item;
		};

		this.setSlotItem = item => {
			_item = item;
		};
	}

	getClasses = () => {
		return this.getDOM().classList;
	};

	hasClass = (...className) => {
		return Array.from(this.getClasses()).includes(...className);
	};

	addClass = (...className) => {
		return this.getDOM().classList.add(...className);
	};

	removeClass = (...className) => {
		return this.getDOM().classList.remove(...className);
	};

	isSelected = () => {
		return this.hasClass('selected');
	};

	equals = slot => {
		return this.getDOM() === slot.getDOM();
	};

	setSlotImage = slotURL => {
		this.getDOM().style.background = `url('${slotURL}'), 
        url('./images/Blank_slot.png')`;
		this.getDOM().style.backgroundRepeat = `no-repeat, no-repeat`;
		this.getDOM().style.backgroundSize = `65px 65px, 72px 72px`;
		this.getDOM().style.backgroundPosition = `4px 4px, 0px 0px`;
	};
}
