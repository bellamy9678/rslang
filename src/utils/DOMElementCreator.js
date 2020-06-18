export default class DOMElementCreator {
	static addAttributes(element, attributesArray) {
		attributesArray.forEach((attributeObject) => {
			const attribute = Object.entries(attributeObject);
			attribute.forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
		});
	}

	static addClasses(element, classesArray) {
		classesArray.forEach((classUnit) => {
			element.classList.add(classUnit);
		});
	}

	createElement(settingsObj) {
		const element = document.createElement(settingsObj.elem);

		if (settingsObj.id) {
			element.id = settingsObj.id;
		}

		if (settingsObj.classes) {
			const params = Array.isArray(settingsObj.classes)
				? settingsObj.classes
				: [settingsObj.classes];
			DOMElementCreator.addClasses(element, params);
		}

		if (settingsObj.attr) {
			const params = Array.isArray(settingsObj.attr)
				? settingsObj.attr
				: [settingsObj.attr];
			DOMElementCreator.addAttributes(element, params);
		}

		if (settingsObj.child) {
			element.append(settingsObj.child);
		}

		this.elem = element;
		return this.elem;
	}

	getLast() {
		return this.elem;
	}
}
